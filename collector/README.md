# 抖音热榜采集器
# 基于 Playwright 的定时采集脚本

## 安装

```bash
pip install playwright httpx schedule
playwright install chromium
```

## 使用

```bash
python collector.py
```

## 说明

- 默认每5分钟采集一次抖音热榜
- 数据通过 HTTP POST 发送到后端 API
- 支持 IP 代理池（可选，反爬需要时开启）
