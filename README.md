# 環境安裝
1. 將你電腦原本的 duckside 改名成 duckside_backup 做為備份
2. 從 github 將專案再次 git clone 下來
`git clone https://github.com/wavefunc/duckside.git`
3. 用 VS Code 開啟終端機，執行 `npm install` 
4. 用 VS Code 開啟終端機，執行 `npm start`
5. 資料庫已改用直接連線雲端的資料庫，所以不需再另外設定

# 使用套件

React 路由管理，使用套件 `react-router-dom@6`，注意是第6版，不是第5版

參考教學： [https://reactrouter.com/docs/en/v6/getting-started/tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

# 伺服器

利用 concurrently 套件，一次執行2個 server

1. 後端 backend 的 server，用來處理資料庫相關 routes。預設 port 為 5000
2. 前端 react 的 server，預設 port 為 3000

# 檔案結構

## 後端

### `/backend/app.js`

處理連接資料庫相關程式

### `/backend/router...`

處理各資料表的增刪查改

## 前端

### `/public/`

靜態檔案

### `/src/App.jsx`

管理主要頁面路由

### `/src/components/`

放置 React 元件

### `/src/pages/`

放置 React 頁面，利用元件組成頁面

### `/src/routes/`

管理各分類下的頁面路由
