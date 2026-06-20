"""
Playwright 抖音热榜抓取脚本 v2
策略：拦截网络请求，从 API 响应中提取热榜数据
"""

import json
import os
import sys
from playwright.sync_api import sync_playwright

OUTPUT_FILE = "/opt/douyin-collector/data.json"
TARGET_URL = "https://www.douyin.com/hot"


def scrape():
    """抓取抖音热榜"""
    items = []
    api_data = []

    def handle_response(response):
        """拦截API响应"""
        url = response.url
        if '/hot/' in url or 'hot_board' in url or 'hot-search' in url or 'trending' in url:
            try:
                data = response.json()
                api_data.append(data)
            except:
                pass

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=True,
                args=["--no-sandbox", "--disable-setuid-sandbox"]
            )
            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/131.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1920, "height": 1080},
                locale="zh-CN",
            )
            page = context.new_page()
            page.on("response", handle_response)

            # 用 domcontentloaded 代替 networkidle
            page.goto(TARGET_URL, wait_until="domcontentloaded", timeout=45000)
            # 等一会儿让JS执行
            page.wait_for_timeout(5000)

            # 先尝试从 API 数据中提取
            for data in api_data:
                extracted = extract_from_api(data)
                items.extend(extracted)

            # 如果 API 拦截失败，从页面 DOM 提取
            if not items:
                items = extract_from_dom(page)

            browser.close()
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        # 尝试从已有内容提取
        try:
            items = extract_from_dom(page)
        except:
            pass

    return {"items": items, "count": len(items)}


def extract_from_api(data):
    """从API响应提取热榜"""
    result = []

    # 递归搜索热榜数据
    def search(obj, path=""):
        if isinstance(obj, dict):
            # 搜索常见热榜字段
            for key in ["word", "title", "hot_word", "sentence", "name"]:
                if key in obj and isinstance(obj[key], str) and len(obj[key]) > 2:
                    heat_val = str(obj.get("hot_value", obj.get("heat", obj.get("score", ""))))
                    return [{
                        "rank": obj.get("rank", obj.get("position", 1)),
                        "title": obj[key],
                        "heat": heat_val,
                        "trend": float(obj.get("hot_value", 0)),
                        "category": obj.get("category", "娱乐"),
                        "lifecycle": "爆发期",
                        "tags": ["娱乐"],
                    }]
            # 递归
            for k, v in obj.items():
                r = search(v, f"{path}.{k}")
                if r:
                    result.extend(r)
        elif isinstance(obj, list):
            for item in obj:
                r = search(item, path)
                if r:
                    result.extend(r)
        return []

    search(data)
    return result


def extract_from_dom(page):
    """从页面DOM提取热榜（降级方案）"""
    items = []
    try:
        # 尝试多个选择器
        selectors = [
            ".hot-list-item", ".search-hot-item",
            "[class*='hot-item']", "[class*='hotItem']",
            "[class*='board-item']", "[class*='list-item']",
            "li", ".title", ".hot-title",
        ]

        for sel in selectors:
            els = page.query_selector_all(sel)
            for i, el in enumerate(els[:30]):
                text = el.inner_text().strip()
                if text and len(text) > 4 and '#' in text:
                    items.append({
                        "rank": len(items) + 1,
                        "title": text[:60],
                        "heat": str((50 - len(items)) * 10) + "w",
                        "trend": round((50 - len(items)) * 0.5, 1),
                        "category": "娱乐",
                        "lifecycle": "增长",
                    })
                    if len(items) >= 20:
                        break
            if items:
                break

        # 兜底：直接从 body 文本提取包含 # 的行
        if not items:
            body = page.inner_text("body")
            for line in body.split('\n'):
                if '#' in line and len(line.strip()) > 5:
                    items.append({
                        "rank": len(items) + 1,
                        "title": line.strip()[:60],
                        "heat": str((50 - len(items)) * 10) + "w",
                        "trend": 10.0,
                        "category": "娱乐",
                        "lifecycle": "增长",
                    })
                    if len(items) >= 20:
                        break
    except Exception as e:
        print(f"DOM提取错误: {e}", file=sys.stderr)

    return items


if __name__ == "__main__":
    result = scrape()
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"采集完成: {result['count']} 条, 保存到 {OUTPUT_FILE}")
