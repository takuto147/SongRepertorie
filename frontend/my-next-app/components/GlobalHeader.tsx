"use client"

import { Button } from "@/components/ui/button"

export default function GlobalHeader({ onLogout }: { onLogout: () => void }) {
  const handleClick = () => {
    onLogout();
  };
  return (
    <header className="w-full bg-sao-dark-800 border-b-2 border-sao-cyan-500/30 px-4 py-3 flex items-center justify-between z-50 relative">
      <div className="text-xl font-bold text-sao-cyan-300 tracking-wide">SONG REPERTOIRE</div>
      <Button variant="outline" className="text-sao-cyan-400 border-sao-cyan-500/30" onClick={handleClick}>
        サインアウト
      </Button>
    </header>
  )
} 