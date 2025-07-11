"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { SongForm } from "@/components/SongForm"
import type { Song } from "@/types"
import { keyToString } from "@/utils/keyUtils"

interface SongDetailPageProps {
  song: Song | null
  isEditMode: boolean
  editingSong: Song | null
  onEdit: (song: Song) => void
  onSave: (song: Song) => void
  onSaveNew: (song: Omit<Song, "id">) => void
  onDelete: (songId: number) => void
  onCancel: () => void
}

export function SongDetailPage({
  song,
  isEditMode,
  editingSong,
  onEdit,
  onSave,
  onSaveNew,
  onDelete,
  onCancel,
}: SongDetailPageProps) {
  const displaySong = song || editingSong

  if (!displaySong) return null

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
        <CardContent className="p-6">
          {!isEditMode ? (
            // 詳細表示モード
            <div className="space-y-6">
              {/* ジャケット画像 */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={displaySong.jacket || "/placeholder.svg"}
                    alt={`${displaySong.title} ジャケット`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-amber-900">{displaySong.title}</h2>
                <p className="text-xl text-amber-700">{displaySong.artist}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-100 p-4 rounded-lg text-center border border-amber-200">
                  <div className="text-2xl font-bold text-amber-800">{keyToString(displaySong.key)}</div>
                  <div className="text-sm text-amber-600">キー</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center border border-blue-200">
                  <div className="text-2xl font-bold text-blue-800">{displaySong.score || "未記録"}</div>
                  <div className="text-sm text-blue-600">点数</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-100 p-4 rounded-lg text-center border border-purple-200">
                  <div className="text-lg font-bold text-purple-800">{displaySong.category}</div>
                  <div className="text-sm text-purple-600">カテゴリ</div>
                </div>
                <div className="bg-indigo-100 p-4 rounded-lg text-center border border-indigo-200">
                  <div className="text-lg font-bold text-indigo-800">{displaySong.machine}</div>
                  <div className="text-sm text-indigo-600">機種</div>
                </div>
              </div>

              {/* タグ表示 */}
              {displaySong.tags && displaySong.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-amber-900">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {displaySong.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="outline"
                        className={`${tag.name === "得意曲"
                          ? "border-green-400 text-green-700 bg-green-50"
                          : tag.name === "練習中"
                            ? "border-blue-400 text-blue-700 bg-blue-50"
                            : "border-amber-400 text-amber-700"
                          }`}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {displaySong.memo && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-amber-900">メモ</h3>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-amber-800">{displaySong.memo}</p>
                  </div>
                </div>
              )}

              {displaySong.lyrics && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-amber-900">歌詞（冒頭）</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-orange-800 italic">{displaySong.lyrics}</p>
                  </div>
                </div>
              )}

              {song && (
                <>
                  <Button onClick={() => onEdit(song)} className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-2">
                    <Edit className="w-4 h-4 mr-2" />
                    この楽曲を編集
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => onDelete(song.id)}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    この楽曲を削除
                  </Button>
                </>
              )}
            </div>
          ) : (
            // 編集モード
            <SongForm
              song={editingSong}
              onSave={song
                ? (s) => onSave(s as Song)
                : (s) => onSaveNew(s as Omit<Song, "id">)
              }
              onCancel={onCancel}
              isEditing={!!song}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
