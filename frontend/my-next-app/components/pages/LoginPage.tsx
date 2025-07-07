"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Eye, EyeOff, Music, Shield, Cpu } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; char: string; left: number; delay: number }>>([])

  // Matrix rain effect
  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const newMatrixChars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setMatrixChars(newMatrixChars)
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    // SAO風のログインアニメーション
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sao-dark-900 via-sao-dark-800 to-sao-dark-700 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="animate-matrix-bg">
        {matrixChars.map((char) => (
          <div
            key={char.id}
            className="matrix-char"
            style={{
              left: `${char.left}%`,
              animationDelay: `${char.delay}s`,
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-line"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Header with SAO Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sao-cyan-500 to-sao-blue-600 mb-6 animate-glow-pulse">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sao-cyan-400 to-sao-blue-400 sao-text-glow mb-2">
              KARAOKE SYSTEM
            </h1>
            <p className="text-sao-cyan-300/80 text-sm tracking-wider">NEURAL INTERFACE PROTOCOL v2.0</p>
          </div>

          {/* Login Panel */}
          <Card className="sao-panel border-2 animate-slide-in-right">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-sao-cyan-400 text-xl font-semibold flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                AUTHENTICATION REQUIRED
              </CardTitle>
              <div className="flex items-center justify-center gap-2 text-sao-cyan-300/60 text-xs">
                <Cpu className="w-4 h-4" />
                <span>SECURE CONNECTION ESTABLISHED</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sao-cyan-300 text-sm font-medium tracking-wide">
                  USER ID
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your neural ID..."
                  className="sao-input h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sao-cyan-300 text-sm font-medium tracking-wide">
                  ACCESS CODE
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter access code..."
                    className="sao-input h-12 text-base pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-sao-cyan-400 hover:text-sao-cyan-300 hover:bg-sao-cyan-500/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full h-12 sao-button text-base font-semibold tracking-wide"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CONNECTING TO NEURAL NETWORK...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>INITIATE DIVE</span>
                  </div>
                )}
              </Button>

              {/* Status Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sao-cyan-500/20">
                <div className="text-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1 animate-pulse"></div>
                  <span className="text-xs text-sao-cyan-300/60">NEURAL</span>
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1 animate-pulse"></div>
                  <span className="text-xs text-sao-cyan-300/60">SECURE</span>
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1 animate-pulse"></div>
                  <span className="text-xs text-sao-cyan-300/60">READY</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6 text-sao-cyan-300/40 text-xs">
            <p>© 2024 KARAOKE NEURAL INTERFACE SYSTEM</p>
            <p className="mt-1">POWERED BY QUANTUM RESONANCE TECHNOLOGY</p>
          </div>
        </div>
      </div>
    </div>
  )
}
