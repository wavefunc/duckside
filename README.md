# 環境安裝

1. 從 github 將專案 git clone 下來
`git clone https://github.com/wavefunc/duckside_react.git`
2. 用 VS Code 開啟終端機，執行 `npm install`
3. 開啟資料庫伺服器，將專案目錄下 `dbSetup.sql` 的檔案內容貼至資料庫執行
4. 在專案根目錄建立一檔案，檔名為 `.env`。將下列內容貼至 `.env` 檔案內容
    
    ```html
    BACKEND_PORT = 5000
    DATABASE_NAME = duckside_react
    DATABASE_USER = root
    DATABASE_PASSWORD = root
    ```
    
5. 用 VS Code 開啟終端機，執行 `npm start`

# 使用套件

React 路由管理，使用套件 `react-router-dom@6`，注意是第6版，不是第5版

參考教學： [https://reactrouter.com/docs/en/v6/getting-started/tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

# 伺服器

利用 concurrently 套件，一次執行2個 server

1. 後端 backend 的 server，用來處理資料庫相關 routes。預設 port 為 5000，可在 `.env` 檔案修改
2. 前端 react 的 server，預設 port 為 3000

# 檔案結構

## 後端

### `/backend/app.js`

處理連接資料庫相關程式

### `/.env`

環境設定變數檔案，可自訂連至資料庫的相關設定

### `/dbSetup.sql`

建立測試用的會員資料庫

## 前端

### `/public/`

靜態檔案

### `/src/index.jsx`

管理各頁面路由及 React 頁面來源

### `/src/components/`

放置 React 元件

### `/src/pages/`

放置 React 頁面，利用元件組成頁面