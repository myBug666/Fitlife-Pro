<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Sv4w4JqaJgMuOgprEh-YIOZAzNFm2PvK

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## 项目结构
fitlife-pro/
├── frontend/          # 小程序代码
│   ├── components/    # 组件
│   ├── images/        # 图片资源
│   ├── pages/         # 页面
│   ├── services/      # API服务
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 入口组件
│   ├── App.js         # 入口组件
│   ├── app.json       # 全局配置
│   ├── app.wxss       # 全局样式
│   ├── index.html     # HTML入口
│   ├── index.tsx      # React入口
│   ├── package.json   # 依赖配置
│   ├── project.config.json  # 项目配置
│   ├── tsconfig.json  # TypeScript配置
│   └── vite.config.ts # Vite配置
├── backend/           # Java API代码
│   ├── src/           # 源代码
│   │   ├── main/
│   │   │   ├── java/  # Java代码
│   │   │   └── resources/ # 配置文件
│   ├── pom.xml        # Maven配置
│   ├── sql/           # 数据库脚本
│   └── target/        # 构建输出
├── README.md          # 项目说明
└── 健身会员管理小程序后端设计方案.md  # 设计文档