/**
 * 楽曲登録APIのテストスクリプト
 * Node.js環境で実行
 */

// テスト用の楽曲データ
const testSongData = {
  title: "津軽海峡冬景色",
  artist: "石川さゆり",
  key: 2,
  score: 85,
  memo: "サビの部分で息継ぎに注意",
  lyrics: "上野駅の13番線で...",
  category: "邦楽",
  machine: "DAM",
  isFavorite: true,
  tags: ["年上ウケ", "ひとり用", "得意曲"],
}

async function testCreateSong() {
  try {
    console.log("🎵 楽曲登録APIテスト開始")
    console.log("送信データ:", JSON.stringify(testSongData, null, 2))

    const response = await fetch("http://localhost:3000/api/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testSongData),
    })

    const result = await response.json()

    console.log("ステータス:", response.status)
    console.log("レスポンス:", JSON.stringify(result, null, 2))

    if (result.success) {
      console.log("✅ 楽曲登録成功!")
      console.log(`楽曲ID: ${result.data.id}`)
      console.log(`作成日時: ${result.data.createdAt}`)
    } else {
      console.log("❌ 楽曲登録失敗")
      console.log("エラー:", result.errors)
    }
  } catch (error) {
    console.error("❌ APIテストエラー:", error)
  }
}

async function testGetSongs() {
  try {
    console.log("\n📋 楽曲一覧取得APIテスト開始")

    const response = await fetch("http://localhost:3000/api/songs")
    const result = await response.json()

    console.log("ステータス:", response.status)
    console.log("楽曲数:", result.data?.count || 0)

    if (result.success && result.data.songs.length > 0) {
      console.log("✅ 楽曲一覧取得成功!")
      result.data.songs.forEach((song, index) => {
        console.log(`${index + 1}. ${song.title} - ${song.artist}`)
      })
    } else {
      console.log("📝 登録された楽曲がありません")
    }
  } catch (error) {
    console.error("❌ APIテストエラー:", error)
  }
}

// テスト実行
async function runTests() {
  await testCreateSong()
  await testGetSongs()
}

runTests()
