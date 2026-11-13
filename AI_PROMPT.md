# LearnGreat — AI 新增學習日記指令

請先閱讀本專案根目錄的 `AGENTS.md` 與 `NOTE_TEMPLATE.md`，再進行任何操作。

## 可直接複製給 AI 的指令

```text
請根據 LearnGreat/AGENTS.md 替我新增一篇「每日紀錄」學習日記。
日期：YYYY-MM-DD
今天學的內容：（請填入真實學習內容）
完成了什麼：（請填入真實成果）
遇到的困難：（請填入）
下一步行動：（請填入）

請遵守繁體中文、正文 100～200 個中文字、固定的三個 H2 章節、八個 metadata 欄位、英文 kebab-case slug。只在 content/notes/ 新增一份 Markdown，不要手動修改 index.html 或 generated-data.js。完成後執行 npm run check && npm run build，回報新增檔案與驗證結果。不要補寫我沒有提供的個人經驗；若資料不足，請用明確標示的示範內容，或指出需要我補充的資訊。
```

## AI 擴充測試（評分展示）

```text
請閱讀 AGENTS.md，新增一篇「今天練習離散餘弦轉換」的示範每日紀錄，明確標示為示範，執行 check 與 build，確認首頁、分類與搜尋可以找到它。
```

> 注意：AI 必須能存取本機專案（例如開啟專案資料夾的程式編輯 AI）。單純把日記貼進聊天，不會自動更新 GitHub 或網站。
