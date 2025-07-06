"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-cream-50 border-amber-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-md">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-amber-900">カラオケメモ</CardTitle>
          <p className="text-amber-700">あなたのレパートリーを管理しよう</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-amber-800">
              メールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="bg-white border-amber-300 focus:border-amber-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-amber-800">
              パスワード
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="パスワードを入力"
              className="bg-white border-amber-300 focus:border-amber-500"
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
            onClick={onLogin}
          >
            ログイン
          </Button>
          <div className="text-center">
            <Button variant="link" className="text-sm text-amber-700 hover:text-amber-900">
              アカウントを作成
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPageRoute() {
  const handleLogin = () => {
    // ログイン処理をここに実装
    window.location.href = "/"
  }

  return <LoginPage onLogin={handleLogin} />
}
