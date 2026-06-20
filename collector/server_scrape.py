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

    # 提取热榜列表（优先 word_list 完整榜单，降级 trending_list）
    word_list = data.get("data", {}).get("word_list", [])
    trending = data.get("data", {}).get("trending_list", [])
    source = word_list if len(word_list) >= 10 else trending
    items = []

    # 关键词→分类映射（因为API不返回分类）
    def guess_category(title):
        kw = {
            "娱乐": ["明星","电影","综艺","歌手","唱","歌","音乐","舞台","演出","娱乐","八卦","偶像","粉丝"],
            "社会": ["警方","提醒","官方","发布","政策","紧急","事故","台风","地震","灾害","暴雨","预警","疫情","通报","调查"],
            "生活": ["健康","运动","健身","美食","探店","旅游","穿搭","护肤","减肥","保养","家居","宠物","日常"],
            "科技": ["AI","人工智能","芯片","手机","华为","苹果","小米","特斯拉","科技","数字化","智能","机器人","数据"],
            "美食": ["吃","餐厅","菜","美食","烹饪","下厨","小吃","网红店"],
            "财经": ["股票","基金","房价","消费","价格","降价","涨价","市场","经济","投资","理财"],
            "体育": ["球","奥运","比赛","冠军","运动员","金牌","赛事","NBA","足球","篮球"],
            "教育": ["高考","考试","成绩","大学","学校","考生","查分","分数线","中考","毕业"],
        }
        for cat, keywords in kw.items():
            if any(k in title for k in keywords):
                return cat
        return "娱乐"

    for i, item in enumerate(source[:50]):
        word = item.get("word", "")
        hot_value = item.get("hot_value", 0)
        label = item.get("label", 0)
        is_n1 = item.get("is_n1", False)

        # 热度值转成可读格式
        if hot_value >= 100000000:
            heat_str = f"{hot_value / 100000000:.1f}亿"
        elif hot_value >= 10000:
            heat_str = f"{hot_value / 10000:.1f}w"
        else:
            heat_str = str(hot_value)

        # 推断分类
        category = guess_category(word)

        # 热度阶段
        lifecycle = "增长"
        if is_n1:
            lifecycle = "爆发期"
        elif hot_value > 10000000:
            lifecycle = "峰值"
        elif hot_value > 5000000:
            lifecycle = "快速增长"
        elif label == 5:
            lifecycle = "复燃"

        # 趋势方向：用item在数组中的位置和label综合判断
        trend_dir = "up"
        trend_val = round((50 - i) * 0.3, 1)
        if label >= 4:
            trend_dir = "down"
            trend_val = -trend_val

        items.append({
            "rank": i + 1,
            "title": f"#{word}",
            "heat": heat_str,
            "heatNum": int(hot_value),
            "trend": trend_val,
            "trendDir": trend_dir,
            "category": category,
            "lifecycle": lifecycle,
            "tags": [category],
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
