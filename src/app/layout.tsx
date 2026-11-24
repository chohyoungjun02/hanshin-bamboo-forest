import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Header from '@/src/components/Header'
import './globals.css'

export const metadata: Metadata = { title: '한신 대나무숲', description: '익명으로 외치는 게시판' }

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="footer">바람에 흩어진 이야기는 누구의 것도 아닙니다.</footer>
      </body>
    </html>
  )
}
