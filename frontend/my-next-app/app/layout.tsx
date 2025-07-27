import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Song Repertorie',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/レコードプレーヤー3.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
