"""
抖音热榜采集器 MVP
基于 Playwright 模拟浏览器抓取抖音热搜榜
"""

import json
import time
import logging
import schedule
from playwright.sync_api import sync_playwright

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

# 配置
TARGET_URL = "https://www.douyin.com/hot"
BACKEND_API = "http://localhost:3000/api/hotlist/sync"
CHECK_INTERVAL_MINUTES = 5


def fetch_hotlist():
    """使用 Playwright 模拟浏览器访问抖音热榜"""
    hot_items = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1920, "height": 1080},
            )
            page = context.new_page()
            page.goto(TARGET_URL, wait_until="networkidle", timeout=30000)
            time.sleep(3)  # 等待动态渲染

            # 尝试提取榜单数据
            # 注意：抖音页面结构可能随时变化，需根据实际情况调整选择器
            items = page.query_selector_all(".hot-list-item, .search-hot-item")
            for i, item in enumerate(items[:50]):
                title_el = item.query_selector(".title, .hot-title")
                heat_el = item.query_selector(".heat, .hot-value")
                title = title_el.inner_text().strip() if title_el else f"话题{i+1}"
                heat_str = heat_el.inner_text().strip() if heat_el else "0"
                hot_items.append({
                    "rank": i + 1,
                    "title": title,
                    "heat": heat_str,
                })

            browser.close()
            logger.info(f"采集完成：共 {len(hot_items)} 条")
    except Exception as e:
        logger.error(f"采集失败: {e}")

    return hot_items


def sync_to_backend(items):
    """将采集数据同步到后端"""
    if not items:
        logger.warning("无数据可同步")
        return
    try:
        import httpx
        payload = {"items": items, "snapshot_at": time.time()}
        resp = httpx.post(BACKEND_API, json=payload, timeout=10)
        if resp.status_code == 200:
            logger.info(f"同步成功：{len(items)} 条")
        else:
            logger.error(f"同步失败：HTTP {resp.status_code}")
    except Exception as e:
        logger.error(f"同步异常: {e}")


def job():
    """定时任务"""
    logger.info("开始采集抖音热榜...")
    items = fetch_hotlist()
    if items:
        sync_to_backend(items)
    logger.info(f"本次采集完成")


if __name__ == "__main__":
    logger.info(f"抖音热榜采集器启动，每 {CHECK_INTERVAL_MINUTES} 分钟采集一次")

    # 先执行一次
    job()

    # 定时执行
    schedule.every(CHECK_INTERVAL_MINUTES).minutes.do(job)

    try:
        while True:
            schedule.run_pending()
            time.sleep(30)
    except KeyboardInterrupt:
        logger.info("采集器已停止")
