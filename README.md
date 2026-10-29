# LocalRAG

本地知识库 · 私有 AI 问答 —— 上传你的文档，让本地模型基于资料回答，数据不出设备，全程离线运行。

深色科技风格的前端界面（暗色 + 玻璃拟态 / 液态高光设计），围绕「本地模型 + 文档问答」场景构建的完整 Web UI。

## ✨ 核心特性

- 🔒 **本地模型**：Qwen2.5 7B 运行在本机，推理不出设备
- 📄 **文档问答**：上传 PDF / Word / Markdown，基于资料回答
- 🔖 **引用溯源**：每个回答附带编号引用，可定位原文
- 📡 **完全离线**：无网络依赖，数据永不上传
- 🎨 **液态玻璃 UI**：暗色科技风 + 玻璃拟态组件（Liquid Glass 风格高光）
- ⌨️ **快捷键支持**：内置快捷键面板，高效操作

## 🗂 页面结构

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | Home | 产品首页，功能总览 |
| `/chat` | Chat | 问答工作台（流式回复 + 引用卡片） |
| `/knowledge` | Knowledge | 知识库管理 |
| `/documents/:id` | DocumentDetail | 文档详情 |
| `/settings` | Settings | 设置 |
| `/profile` | Profile | 个人资料 |
| `/shortcuts` | Shortcuts | 快捷键一览 |

## 🛠 技术栈

- **框架**：React 18 + TypeScript + Vite
- **路由**：React Router v6
- **状态管理**：Zustand + TanStack Query
- **样式**：Tailwind CSS + PostCSS
- **图标**：lucide-react

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

> 当前版本使用 `src/mock/` 下的模拟数据演示界面与交互，可对接本地 Ollama 等后端接入真实推理（参见姊妹项目 `qwen3.5-0.8b_local`）。

## 📄 许可证

仅供学习交流使用。
