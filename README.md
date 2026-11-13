# LearnGreat — 個人學習日記

> 把每一天的學習，寫成自己的故事。

LearnGreat 是一個 Notion 風格的靜態學習日記網站，協助自己記錄 **今天學到什麼 → 遇到的困難 → 下一步行動**，並透過每週回顧與學習反思觀察進步。網站提供全文搜尋、三類紀錄篩選、文章內頁，以及深淺色切換。

**本專案已附六篇明確標示的示範文章，並不聲稱它們是使用者真實經歷。** 此版本沒有使用者帳號和資料庫；內容直接由 Markdown 產生，適合展示 AI 可重複執行的開發規則。

## 網站功能

- 首頁：**學習進度優先**，包含累積日記、最近 7 天篇數、每日紀錄篇數、七天活動圖、精選與最近紀錄。示範資料會納入統計，不能視為真實學習時數。
- 全部日記：搜尋標題、摘要、分類、標籤和全文；三類篩選。
- 日記內頁：日期、閱讀時間、分類、文章內容、H2 目錄與標籤。
- 響應式設計與可保留偏好的深色／淺色模式。
- 新增 Markdown 日記後，透過建立腳本自動更新分類、搜尋與文章路由。

## 立即執行（Node.js 20+）

```bash
npm run dev
```

開啟 <http://localhost:4173>。目前沒有 npm dependencies，不需要先執行 `npm install`。**修改 Markdown 文章後，重新啟動 dev 服務或執行 build，才會重新生成索引；本版沒有熱更新。**

```bash
npm run check    # 驗證文章格式、類型及必填段落
npm run build    # 生成部署輸出 dist/
npm run preview  # 預覽 dist/
```

## AI 新增日記（第五輪最終選擇）

使用者不需要透過網站表單新增日記。先在本機把今天學習的事實告訴能夠存取此專案檔案的 AI，使用 [`AI_PROMPT.md`](./AI_PROMPT.md) 的指令模板要求 AI 閱讀 `AGENTS.md`，產生符合規範的 Markdown 日記，並執行 `npm run check && npm run build`。經確認適合公開後，再提交至 GitHub 觸發部署。**這是檔案更新流程，不代表網站具備即時 AI 寫入功能。**

## 新增／修改日記

1. 讀取 [`AGENTS.md`](./AGENTS.md)（AI 工作規範）與 [`NOTE_TEMPLATE.md`](./NOTE_TEMPLATE.md)（模板）。
2. 選擇 `每日紀錄`、`每週回顧` 或 `學習反思`，建立 `content/notes/english-kebab-case.md`。
3. 填寫八個 metadata 欄位及相應類型的三個固定 H2 段落。正文中文字數（排除標題）需為 **100～200 字**。
4. 執行 `npm run check && npm run build`，成功後新文章會自動顯示在首頁／日記列表和文章路由，無需手動修改 HTML。
5. **切勿上傳不能公開的私人日記**：GitHub Pages 網站和公開 repo 中的資料，其他人都可以閱讀。

## 結構

```text
content/notes/                  Markdown 日記來源
src/app.js                      搜尋、分類、文章渲染、主題與導覽
src/style.css                   Notion 風格的版面、樣式 tokens
src/generated-data.js           自動生成，請勿手動修改
scripts/build-content.mjs       日記格式檢查＋內容索引
scripts/build-site.mjs          建立 dist/
scripts/dev-server.mjs          本機靜態伺服器
AGENTS.md                       AI 工作規範
NOTE_TEMPLATE.md                三種日記模板
.github/workflows/deploy.yml    GitHub Pages 自動部署
```

## GitHub Pages（最後再部署）

1. 建立 GitHub 公開 Repository，將專案來源推送至 `main`，**不要只上傳 dist 資料夾**。
2. 在 Repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
3. `.github/workflows/deploy.yml` 會在推送到 `main` 後驗證並建置 `dist/`，再部署網站。
4. 確認 Actions 成功後，才將真實 Repository 與 GitHub Pages 網址填到 `SUBMISSION_TEMPLATE.md`。

## 技術限制

原生 HTML/CSS/JavaScript + Node.js 20+，無 npm 外部套件。使用自製的受限 Markdown renderer，支援項目以 `AGENTS.md` 為準。網站使用 hash routing 避免 GitHub Pages 子路徑問題。搜尋與深色模式是瀏覽器端功能，網站內容本身則在建置時生成，無需遠端 API。
