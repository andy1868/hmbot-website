# HMbot · 后马时代 — 官网源码

北京后马时代科技有限责任公司（hmbot.net）官方网站。

## 技术栈

- **框架**: Next.js 16 (App Router) + TypeScript 5
- **样式**: Tailwind CSS 4 + shadcn/ui (New York)
- **数据库**: Prisma ORM + SQLite
- **状态**: Zustand (语言切换 / 产品选择)
- **表单**: react-hook-form + zod
- **图标**: lucide-react
- **动画**: framer-motion + tw-animate-css

## 本地运行

```bash
# 1. 安装依赖（推荐用 bun，也可用 npm/pnpm）
bun install
# 或: npm install

# 2. 初始化数据库（首次运行）
bun run db:push
# 或: npx prisma db push
#
# ⚠️ 注意：db:push 命令带了 --accept-data-loss 标志，方便开发阶段
#    快速迭代 schema。生产环境请改用：
#    npx prisma migrate deploy
#    不会丢数据，且有迁移历史可追溯。

# 3. 启动开发服务器
bun run dev
# 或: npm run dev

# 4. 打开浏览器访问
#    http://localhost:3000
```

## 项目结构

```
.
├── prisma/
│   └── schema.prisma           # 数据库 Schema（Order 表）
├── public/
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/orders/route.ts # 订单/定制需求提交 API
│   │   ├── globals.css         # 全局样式 + 品牌色 + 动画
│   │   ├── layout.tsx          # 根布局 + SEO 元数据
│   │   └── page.tsx            # 主页（组装所有板块）
│   ├── components/
│   │   ├── site/               # 业务组件
│   │   │   ├── header.tsx      # 顶部导航 + 语言切换
│   │   │   ├── hero.tsx        # 主视觉区
│   │   │   ├── trust-bar.tsx   # 合作伙伴跑马灯
│   │   │   ├── about.tsx       # 关于我们 / 务实理念
│   │   │   ├── products.tsx    # 四大产品矩阵
│   │   │   ├── achievements.tsx# 成就与里程碑
│   │   │   ├── investor.tsx    # 加入我们
│   │   │   ├── order-form.tsx  # 在线下单 / 定制咨询表单
│   │   │   ├── footer.tsx      # 页脚
│   │   │   ├── logo.tsx        # 品牌 Logo
│   │   │   └── hydration-gate.tsx
│   │   └── ui/                 # shadcn/ui 组件库
│   └── lib/
│       ├── i18n.ts             # 中英双语文案字典
│       ├── use-lang.ts         # 语言状态（Zustand + 持久化）
│       ├── use-product-selection.ts
│       ├── db.ts               # Prisma 客户端
│       └── utils.ts
├── .env                        # DATABASE_URL 等环境变量
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json             # shadcn/ui 配置
├── eslint.config.mjs
└── Caddyfile                   # 反向代理配置（生产部署用）
```

## 核心功能

1. **中英双语一键切换** — 语言偏好持久化到 localStorage
2. **四大产品矩阵** — 工程车辆防撞 / 安全监测 / 视觉机械臂 / 仓储机器人
3. **在线下单 / 定制咨询** — 双 Tab 表单，提交后写入 SQLite 数据库
4. **响应式设计** — 移动端汉堡菜单 + 桌面端导航
5. **SEO 完整** — OpenGraph / Twitter Card / 中英 canonical
6. **数字模糊化** — "千余 / 数百 / 数十" 等表述，业务增长后无需频繁改文案

## 部署到生产

推荐部署到 Vercel：

```bash
# 1. 推送到 GitHub
git init && git add . && git commit -m "init"
# 然后在 GitHub 创建仓库并 push

# 2. 在 vercel.com 导入仓库
# 3. 设置环境变量 DATABASE_URL（Vercel Postgres 或外部数据库）
# 4. 绑定 hmbot.net 域名
```

或自托管（Docker / VPS）：

```bash
bun run build
bun run start
# 通过 Caddyfile 配置反向代理到 3000 端口
```

## 修改指南

- **改文案**: `src/lib/i18n.ts` — 所有中英文文案集中在此
- **改品牌色**: `src/app/globals.css` 中的 `--brand` 变量
- **改 Logo**: `src/components/site/logo.tsx`
- **加新产品**: 在 `i18n.ts` 加 `product5*` 字段，在 `products.tsx` 数组里加一项
- **查订单**: 用 SQLite 客户端打开 `db/custom.db`，或写脚本查 `Order` 表

## 设计决策

### 为什么用 Zustand + persist 而不是 next-intl 做国际化？

项目原本预装了 `next-intl`（Next.js 生态最主流的 i18n 方案），但实际改用了一个轻量的自定义方案：**Zustand + localStorage 持久化**，无路由分段（`/zh` vs `/en`）。

**取舍**：

| 维度 | next-intl (路由分段) | 自定义 Zustand (单 URL) |
|---|---|---|
| SEO | ✅ 搜索引擎区分语言版本 | ⚠️ 同一 URL，搜索引擎只索引默认语言 |
| 部署 | 需要 i18n 路由配置 | ✅ 单域名，部署更简单 |
| 切换体验 | 需要页面跳转 | ✅ 即时切换，无刷新 |
| 复杂度 | 路由 + 中间件 + 翻译文件 | ✅ 一个 i18n.ts 文件搞定 |

**为什么这样选**：
- 公司官网内容相对静态，SEO 需求可通过 sitemap + hreflang 补救
- 即时切换体验更适合"展示型"网站（不像电商/文档站需要分语言版本）
- 简化部署：一个域名一份代码，无需配置复杂的 i18n 路由
- 后续如果 SEO 成为瓶颈，可以平滑迁移到 next-intl，文案字典结构已经类型安全

### 安全设计

订单 API（`src/app/api/orders/route.ts`）做了三层防护：

1. **Origin 头校验** — 防止跨站请求伪造（CSRF）。仅允许 `hmbot.net` 和 `localhost` 提交。
2. **内存级速率限制** — 单 IP 每 60 秒最多 5 次提交，超过返回 429 + `Retry-After`。
3. **共享 Zod Schema** — 前后端用同一份校验规则（`src/lib/validation.ts`），避免校验逻辑漂移。

Prisma 客户端的日志级别也是环境感知的：
- 开发：`query` + `warn` + `error`（方便调试）
- 生产：仅 `error`（不打印 SQL，避免泄露客户隐私数据如姓名/邮箱/电话）

速率限制是单实例内存方案（`src/lib/rate-limit.ts`）。如果未来扩展到多实例部署（Vercel 多副本），需要换成 `@upstash/ratelimit + Redis`，文件末尾有详细的迁移注释。

## 上线前 Checklist

- [ ] **ICP 备案号**：`src/lib/i18n.ts` 中 `footerIcp: "京ICP备XXXXXXXX号"` 替换为真实备案号
- [ ] **公司地址**：`footerAddress: "北京市"` 改为完整办公地址
- [ ] **联系电话**：补充真实的客服电话
- [ ] **Origin 白名单**：`src/app/api/orders/route.ts` 中 `ALLOWED_ORIGINS` 确认包含正式域名
- [ ] **数据库迁移**：生产环境用 `prisma migrate deploy`，不要用 `db:push`
- [ ] **环境变量**：`.env` 中的 `DATABASE_URL` 指向生产数据库
- [ ] **域名解析**：hmbot.net A 记录指向服务器 IP，并配置 HTTPS 证书
- [ ] **Open Graph 图**：准备一张 1200×630 的 OG 图片放到 `public/og.png`，并在 `layout.tsx` 中引用
- [ ] **Analytics**（可选）：接入百度统计 / Google Analytics

## 联系方式

- 邮箱: contact@hmbot.net
- 域名: hmbot.net
- 公司: 北京后马时代科技有限责任公司
