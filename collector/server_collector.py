"""
抖音热榜采集器（服务器版）
使用 Playwright 模拟浏览器抓取抖音热搜榜
运行方式：python3 /opt/douyin-collector/collect.py
定时任务：crontab 每5分钟执行一次
"""

import json
import os
import sys
import time
import logging
import urllib.request
import urllib.error

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

BACKEND_URL = "http://localhost:3000/api/hotlist/sync"
PLAYWRIGHT_VENV = "/opt/playwright-env/bin/python3"
COLLECTOR_SCRIPT = "/opt/douyin-collector/scrape.py"


def run_scraper():
    """调用 Playwright 爬虫脚本"""
    cmd = f"{PLAYWRIGHT_VENV} {COLLECTOR_SCRIPT}"
    logger.info(f"执行采集: {cmd}")
    result = os.system(cmd)
    if result != 0:
        logger.error(f"采集失败，退出码: {result}")
        return []
    return True


def sync_to_backend(data_file):
    """将采集数据同步到后端"""
    if not os.path.exists(data_file):
        logger.warning("无数据文件: %s", data_file)
        return

    with open(data_file, 'r') as f:
        data = json.load(f)

    items = data.get("items", [])
    if not items:
        logger.warning("数据为空")
        return

    payload = json.dumps({"items": items}).encode('utf-8')
    req = urllib.request.Request(
        BACKEND_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        resp = urllib.request.urlopen(req, timeout=10)
        result = json.loads(resp.read().decode('utf-8'))
        logger.info(f"同步成功: {result.get('message', '')}")
    except Exception as e:
        logger.error(f"同步失败: {e}")


def main():
    logger.info("=== 抖音热榜采集器 ===")

    # 1. 先确保脚本存在
    if not os.path.exists(COLLECTOR_SCRIPT):
        logger.error(f"采集脚本不存在: {COLLECTOR_SCRIPT}")
        return

    # 2. 运行采集
    run_scraper()

    # 3. 同步数据
    data_file = "/opt/douyin-collector/data.json"
    sync_to_backend(data_file)

    logger.info("=== 采集完成 ===")


if __name__ == "__main__":
    main()
