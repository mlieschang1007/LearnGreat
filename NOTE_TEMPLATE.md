# LearnGreat — 學習日記模板

**每篇正文 100～200 個中文字（不包含標題），由 `npm run check` 自動檢查。** 建議每個固定段落寫 1～2 句，並明確指出下一步。

請先閱讀 `AGENTS.md`。以下是三種可重複使用的日記正文模板。複製到 `content/notes/<slug>.md`，將尖括號中的佔位說明**全部替換成真實內容**；沒有真實內容時，必須寫明「示範日記」，不能假裝已完成。

## A. 每日紀錄

```md
---
title: <具體學習任務>
slug: daily-example-task
category: 每日紀錄
date: 2026-11-13
summary: <20–70 字摘要>
tags: [學習, 練習]
readingMinutes: 1
featured: false
---
# <與 title 完全一致>

<今天的學習背景；示範時明確標示>

## 今天學到什麼

<今天完成了什麼、理解了哪些概念>

## 遇到的困難

<具體卡住的地方、目前還有哪些問題>

## 下一步行動

<下次開始時可以立刻進行的一件事>
```

## B. 每週回顧

正文的三個固定 H2：`## 本週完成`、`## 遇到的困難`、`## 下週計畫`。metadata 的 `category` 使用 `每週回顧`。優先列出本週的具體成果，而非含糊形容詞。

## C. 學習反思

正文的三個固定 H2：`## 這次的問題`、`## 我的觀察`、`## 下一次調整`。metadata 的 `category` 使用 `學習反思`。將觀察與未經驗證的推測分開，不要將 AI 推測寫成親身經驗。

## 固定規則

每篇都有八個 metadata 欄位：`title`, `slug`, `category`, `date`, `summary`, `tags`, `readingMinutes`, `featured`。檔名與 slug 相同（小寫 kebab-case）。最多一篇 `featured: true`。用 `npm run check && npm run build` 確認新文章能被網站自動索引。
