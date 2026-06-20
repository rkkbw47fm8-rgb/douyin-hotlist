-- 抖音热榜分析 · 数据库 Schema
-- PostgreSQL

-- 话题表
CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(64) UNIQUE NOT NULL,      -- 抖音原始 ID
    title VARCHAR(256) NOT NULL,                -- 话题标题
    category VARCHAR(32),                       -- 分类：娱乐/社会/科技/生活/美食/财经
    tags TEXT[],                                 -- 标签数组
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 热榜快照表（每次采集生成）
CREATE TABLE IF NOT EXISTS hotlist_snapshots (
    id SERIAL PRIMARY KEY,
    snapshot_at TIMESTAMP DEFAULT NOW(),         -- 采集时间
    topics JSONB NOT NULL,                       -- 快照数据（完整榜单）
    topic_count INT DEFAULT 50
);

-- 热度记录表
CREATE TABLE IF NOT EXISTS heat_records (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(64) REFERENCES topics(topic_id),
    heat BIGINT NOT NULL,                        -- 热度值
    rank INT,                                    -- 排名
    record_at TIMESTAMP DEFAULT NOW()            -- 记录时间
);

-- 分类表
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) UNIQUE NOT NULL,
    color VARCHAR(7),                            -- 展示色值
    sort_order INT DEFAULT 0
);

-- 用户关注话题表
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    topic_keyword VARCHAR(128) NOT NULL,         -- 关注的关键词
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, topic_keyword)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_heat_records_topic_id ON heat_records(topic_id);
CREATE INDEX IF NOT EXISTS idx_heat_records_record_at ON heat_records(record_at);
CREATE INDEX IF NOT EXISTS idx_hotlist_snapshots_time ON hotlist_snapshots(snapshot_at DESC);
