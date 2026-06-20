"""
抖音热榜采集器 v3 — 直接调 API
用手机端 UA 调抖音热榜接口，不需要 Playwright
"""

import json
import os
import time
import sys
import urllib.request

OUTPUT_FILE = "/opt/douyin-collector/data.json"

# 抖音热榜API（手机UA可绕过检测）
API_URL = (
    "https://www.douyin.com/aweme/v1/web/hot/search/list/"
    "?device_platform=webapp&aid=6383&channel=channel_pc_web"
    "&pc_client_type=1&version_code=170400&version_name=17.4.0"
    "&cookie_enabled=true&screen_width=1920&screen_height=1080"
    "&browser_language=zh-CN&browser_platform=Win32"
    "&browser_name=Chrome&browser_version=120.0.0.0"
)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
    ),
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://www.douyin.com/",
    "Origin": "https://www.douyin.com",
}


def scrape():
    """抓取抖音热榜"""
    import urllib.request

    req = urllib.request.Request(API_URL, headers=HEADERS, method="GET")
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"❌ API请求失败: {e}", file=sys.stderr)
        return {"items": [], "count": 0}

    # 提取热榜列表
    trending = data.get("data", {}).get("trending_list", [])
    items = []

    # 分类映射
    category_map = {
        0: "娱乐", 1: "社会", 2: "生活", 3: "知识",
        4: "科技", 5: "美食", 6: "财经", 7: "体育",
        8: "游戏", 9: "时尚", 10: "音乐",
    }

    lifecycle_map = {
        0: "增长", 1: "快速增长", 2: "爆发期",
        3: "峰值", 4: "衰退", 5: "复燃",
    }

    for i, item in enumerate(trending[:50]):
        # 提取话题信息
        sentence = item.get("sentence", "")
        word = item.get("word", item.get("hot_word", sentence))
        hot_value = item.get("hot_value", 0)
        label = item.get("label", 0)

        # 热度值转成可读格式
        if hot_value >= 10000:
            heat_str = f"{hot_value / 10000:.1f}w"
        else:
            heat_str = str(hot_value)

        category_idx = item.get("category", 0)
        category = category_map.get(category_idx, "娱乐")
        lifecycle = lifecycle_map.get(label, "增长")

        # 分类标签
        tags = [category]

        items.append({
            "rank": i + 1,
            "title": f"#{word}",
            "heat": heat_str,
            "heatNum": int(hot_value),
            "trend": round((50 - i) * 0.5, 1),
            "trendDir": "up" if label <= 2 else "down",
            "category": category,
            "lifecycle": lifecycle,
            "tags": tags,
        })

    print(f"✅ 采集到 {len(items)} 条热榜数据")
    for item in items[:5]:
        print(f"   #{item['rank']} {item['title'][:40]} [{item['category']}] {item['heat']}")

    return {"items": items, "count": len(items)}


def sync_to_backend(items):
    """同步到后端 API"""
    payload = json.dumps({"items": items}).encode("utf-8")
    req = urllib.request.Request(
        "http://localhost:3000/api/hotlist/sync",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        resp = urllib.request.urlopen(req, timeout=10)
        result = json.loads(resp.read().decode("utf-8"))
        print(f"✅ 同步成功: {result.get('message', '')}")
    except Exception as e:
        print(f"❌ 同步失败: {e}", file=sys.stderr)


if __name__ == "__main__":
    print("=" * 40)
    print("抖音热榜采集器 v3")
    print("=" * 40)

    result = scrape()

    if result["items"]:
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        sync_to_backend(result["items"])
    else:
        print("⚠️ 未采集到数据")

    print("=" * 40)
