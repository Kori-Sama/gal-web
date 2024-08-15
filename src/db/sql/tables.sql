-- WARN: 这些SQL语句仅仅作为参考, 建立表请用drizzle的migrate功能

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
        CREATE TYPE role AS ENUM ('normal', 'admin', 'root');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role role DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invite_keys (
    id SERIAL PRIMARY KEY,
    key UUID NOT NULL, -- 邀请码将对应一个用户的id
    generated_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP, -- 过期时间, 为空表示永不过期
    is_generated_by_root BOOLEAN DEFAULT FALSE -- 如果为真, 则被邀请的用户将拥有 admin 权限
);

-- 从bangumi爬取的galgames
CREATE TABLE IF NOT EXISTS works (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    cover_image VARCHAR(255)
);

-- 投票的类别, 比如最佳画面, 最佳剧本等
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    work_id INT NOT NULL REFERENCES works(id),
    category_id INT NOT NULL REFERENCES categories(id),
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, work_id, category_id, year) -- 确保一个用户每年在一个类别中只能投一票
);