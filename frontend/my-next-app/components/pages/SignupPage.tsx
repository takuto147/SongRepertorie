"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Eye, EyeOff, UserPlus, Shield, Cpu, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface SignupPageProps {
  onSignup: () => void
  onBackToLogin: () => void
}

export function SignupPage({ onSignup, onBackToLogin }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; char: string; left: number; delay: number }>>([])

  const { register, loading, error } = useAuth()
  const [localError, setLocalError] = useState<string | null>(null)

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.displayName) {
      newErrors.displayName = "Display name is required"
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    if (!validateForm()) return
    setLocalError(null)
    try {
      await register({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
      })
      onSignup()
    } catch (e: any) {
      setLocalError(e?.message || "サインアップに失敗しました")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
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
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBackToLogin}
            className="mb-4 text-sao-cyan-400 hover:text-sao-cyan-300 hover:bg-sao-cyan-500/10 border border-sao-cyan-500/30 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sao-purple-500 to-sao-blue-600 mb-6 animate-glow-pulse">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sao-purple-400 to-sao-blue-400 sao-text-glow mb-2">
              CREATE ACCOUNT
            </h1>
            <p className="text-sao-cyan-300/80 text-sm tracking-wider">NEURAL INTERFACE REGISTRATION v2.0</p>
          </div>

          {/* Signup Panel */}
          <Card className="sao-panel border-2 animate-slide-in-right">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-sao-cyan-400 text-xl font-semibold flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                ACCOUNT REGISTRATION
              </CardTitle>
              <div className="flex items-center justify-center gap-2 text-sao-cyan-300/60 text-xs">
                <Cpu className="w-4 h-4" />
                <span>SECURE NEURAL LINK INITIALIZATION</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sao-cyan-300 text-sm font-medium tracking-wide">
                  NEURAL ID (EMAIL)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your neural ID..."
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`sao-input h-12 text-base ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sao-cyan-300 text-sm font-medium tracking-wide">
                  DISPLAY NAME
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Enter your display name..."
                  value={formData.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  className={`sao-input h-12 text-base ${errors.displayName ? "border-red-500" : ""}`}
                />
                {errors.displayName && <p className="text-red-400 text-xs">{errors.displayName}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sao-cyan-300 text-sm font-medium tracking-wide">
                  ACCESS CODE
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create access code..."
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`sao-input h-12 text-base pr-12 ${errors.password ? "border-red-500" : ""}`}
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
                {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sao-cyan-300 text-sm font-medium tracking-wide">
                  CONFIRM ACCESS CODE
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm access code..."
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`sao-input h-12 text-base pr-12 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-sao-cyan-400 hover:text-sao-cyan-300 hover:bg-sao-cyan-500/10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
              </div>

              {/* エラー表示 */}
              {(localError || error) && (
                <div className="text-red-400 text-sm text-center font-semibold">
                  {localError || error}
                </div>
              )}

              {/* Signup Button */}
              <Button
                onClick={handleSignup}
                disabled={loading}
                className="w-full h-12 sao-button text-base font-semibold tracking-wide"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>INITIALIZING NEURAL LINK...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>CREATE ACCOUNT</span>
                  </div>
                )}
              </Button>

              {/* Status Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sao-cyan-500/20">
                <div className="text-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1 animate-pulse"></div>
                  <span className="text-xs text-sao-cyan-300/60">SECURE</span>
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1 animate-pulse"></div>
                  <span className="text-xs text-sao-cyan-300/60">ENCRYPTED</span>
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
