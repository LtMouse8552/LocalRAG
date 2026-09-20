# LocalRAG — 本地知识库 · 私有 AI 问答

暗色科技风 + 克制液态玻璃效果的「本地知识库 RAG 问答系统」前端。基于 Mock 数据全流程演示：文档上传 → 索引解析 → 问答 → 引用溯源。

![stack](https://img.shields.io/badge/React_18-TypeScript-22D3EE) ![vite](https://img.shields.io/badge/Vite_5-Tailwind_3-7C3AED)

## 运行

```bash
npm install
npm run dev        # http://127.0.0.1:5173 （仅本地，不暴露公网）
npm run build      # 产物输出至 dist/
npm run preview
```

## 目录结构

```
src/
├── main.tsx / App.tsx        # 入口与路由（8 个页面 + /m/chat 移动端）
├── index.css                 # 设计系统：色彩令牌、6 个玻璃类、动态高光、降级与响应式
├── types.ts                  # KnowledgeBase/KbDoc/Conversation/Citation/RagSettings 类型
├── mock/
│   ├── data.ts               # 知识库/文档/会话/引用/回答语料 Mock
│   └── stream.ts             # 模拟 RAG 流式输出（检索 900ms → 逐字输出，可 stop）
├── store/useStore.ts         # Zustand + persist（会话持久化到 localStorage）
├── components/
│   ├── glass/                # GlassPanel/Card/Toolbar/Modal/Input/Button + LiquidHighlight
│   ├── TopBar.tsx            # 全局顶栏（glass-toolbar）
│   ├── MessageItem.tsx       # 消息渲染：轻量 Markdown + 引用角标 + 悬停操作
│   ├── Composer.tsx          # 输入区：附件/知识库开关/发送↔停止/上下文超限提示
│   ├── SourceCard.tsx        # 引用卡片：相似度进度条 + 关键词高亮 + 展开
│   ├── ShortcutsModal.tsx    # 快捷键弹窗（Ctrl+/ 全局唤起）
│   └── Kbd.tsx / VersionBadge.tsx
└── pages/                    # Home / Knowledge / Chat / DocumentDetail / Profile / Settings / About / Shortcuts
```

## 依赖裁剪说明（相对原始需求清单）

为保持零依赖可用、`npm install && npm run dev` 直接跑通，做了如下替换——接口一致，后续可平滑升级：

| 需求原案 | 实际实现 | 说明 |
|---|---|---|
| shadcn/ui + radix 体系 | 自研玻璃组件库 `components/glass/` | 视觉即设计系统本身，避免 30+ 间接依赖 |
| Dexie / IndexedDB | Zustand `persist` → localStorage | 数据量小时等价；换 Dexie 只需改 store 持久化层 |
| react-markdown + remark-gfm + Shiki | `MessageItem.renderMarkdown` 轻量渲染器 | 支持标题/列表/表格/代码块/引用/角标；Shiki 待接入 |
| PDF.js | 文档详情页静态预览 | 接入时替换 `DocumentDetail` 左栏 |
| framer-motion | CSS 动画（fadeUp/dotJump/pulseGlow） | 全部动效 ≤200ms，无运行时开销 |
| TanStack Query | 直连 store（纯前端 mock） | 接真实后端时再加 |

## 核心交互

- **流式输出**：逐字出现 + 青色光标 1s 闪烁；生成中发送按钮变红色停止（Esc 亦可）
- **引用联动**：点击 AI 消息中的 `[1]` 角标 → 右栏对应卡片 active 高亮并滚动定位；点击卡片 → 文档详情页
- **上传模拟**：拖拽/点击上传 → 解析进度条 → 已索引；失败状态可重试
- **快捷键**：`Ctrl+K` 搜索会话、`Ctrl+N` 新建、`Ctrl+/` 快捷键帮助、`Ctrl+B/J` 折叠左右栏

## 玻璃效果与降级

- 玻璃仅用于容器/悬浮层/工具栏/输入区；AI 正文、代码块为实色，保证可读性
- 同屏 `backdrop-filter` ≤ 6 个；不支持的浏览器经 `@supports` 回退为 `#111820` 实色
- 响应式降 blur：≤1024px→14px、≤767px→12px；`prefers-reduced-motion` 关闭动态高光与动画

## 响应式断点

| 宽度 | 布局 |
|---|---|
| ≥1280px | 三栏完整（260 / 自适应 / 320） |
| 1024–1280px | 右栏折叠（`max-xl:hidden`，Ctrl+J 呼出） |
| 768–1024px | 左栏变抽屉浮层 |
| <768px | 单栏聊天 |

> 本项目为纯前端 Mock 演示，接入真实 RAG 后端时替换 `mock/stream.ts` 为 fetch + ReadableStream 即可。
