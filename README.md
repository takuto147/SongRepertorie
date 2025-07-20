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

<h2>🖼️ スクリーンショット</h2>

<div align="center">
  <table>
    <tr>
      <td width="50%" align="center">
        <h4>サインイン画面</h4>
        <img src="frontend/my-next-app/public/screenshots/signin.png" width="300" /><br>
        <p style="font-size: 14px;">
          "USER ID"：メールアドレス<br>
          "ACCESS CODE"：パスワード<br>
          ("CREATE NEW ACCOUNT"以下は特に機能なし)<br>
          <br> <!-- 高さ調整 -->
        </p>
      </td>
      <td width="50%" align="center">
        <h4>ホーム画面</h4>
        <img src="frontend/my-next-app/public/screenshots/home.png" width="300" /><br>
        <p style="font-size: 14px;">
          登録済みの曲の一覧・サマリを表示<br>
          フィルター/ソート/検索機能有り<br>
        </p>
      </td>
    </tr>
    <tr>
      <td width="50%" align="center">
        <h4>検索画面</h4>
        <img src="frontend/my-next-app/public/screenshots/search.png" width="300" /><br>
        <p style="font-size: 14px;">
          曲名やアーティスト名で検索が可能<br>
          ("TRENDING SONGS"は固定の曲名)<br>
          <br> <!-- 高さ調整 -->
        </p>
      </td>
      <td width="50%" align="center">
        <h4>検索結果画面</h4>
        <img src="frontend/my-next-app/public/screenshots/search_result.png" width="300" /><br>
        <br><br> <!-- 高さ調整 -->
        <p style="font-size: 14px;">
          曲を選択するとその曲をもとにした登録画面が表示<br>
        <br><br> <!-- 高さ調整 -->
        </p>
      </td>
    </tr>
  </table>
</div>



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
