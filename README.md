# 🎵 SongRepertorie

カラオケのレパートリーを管理できるアプリです。  
キー調整・スコア・タグ・メモなどを登録し、スマホUIで快適に操作できます。

---

## 📌 プロジェクト概要

- 自分のカラオケ曲を登録・管理できるWebアプリ
- 曲情報（タイトル・アーティスト・キー・得点・メモ・タグなど）を保存
- お気に入り機能やタグ管理で分類しやすい
- モバイルUI対応（スマホ画面を想定）

---

## 🎯 作成目的・背景

- 自分自身のカラオケのレパートリーを把握するため
- キーや得点、メモを記録して自己管理できるようにしたかった
- ポートフォリオとして、フロントエンド（Next.js）とバックエンド（Spring Boot）の連携を学ぶために作成

---

## ✨ 主な機能

- 曲の登録・編集・削除
- 曲ごとのタグ管理（多対多）
- キー・スコア・メモの入力
- お気に入り機能（☆）
- モバイル対応のUI（ナビゲーションバー）
- 統計画面（カテゴリ別・アーティスト別・平均スコア）

---

## 🖼️ スクリーンショット

<!-- ### ホーム画面
![home](frontend/my-next-app/public/screenshots/home.png)

### 登録フォーム
![form](frontend/my-next-app/public/screenshots/signin.png) -->



| ホーム画面 | 曲登録フォーム |
|------------|----------------|
| <img src="frontend/my-next-app/public/screenshots/home.png" width="300"/> | <img src="frontend/my-next-app/public/screenshots/signin.png" width="300"/> |
| 登録済みの曲の一覧を表示し、タグ・キー・スコアなどを確認できます。 | 新しい曲の情報を入力して登録できます。カテゴリ・タグも設定可能です。 |
---

## 🏗️ 使用技術

### フロントエンド
- React / Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios

### バックエンド
- Java / Spring Boot
- Spring Data JPA
- REST API設計
- MySQL

### その他
- Git / GitHub
- Render（バックエンド）
- Vercel（フロントエンド）

---

## 📁 ディレクトリ構成

```bash
SongRepertorie/
├── backend/           # Spring Boot (APIサーバー)
└── frontend/          
    └── my-next-app/   # Next.js + Tailwind CSS (UI)
