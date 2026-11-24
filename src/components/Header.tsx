import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <Link href="/posts" className="brand">
        <span className="brand-mark" aria-hidden="true">竹</span>
        <span>
          <strong>한신 대나무숲</strong>
          <small>임금님 귀는 당나귀 귀</small>
        </span>
      </Link>
      <nav aria-label="주요 메뉴" className="nav">
        <Link href="/posts">외침 목록</Link>
        <Link href="/posts/new" className="nav-cta">외치기</Link>
      </nav>
    </header>
  )
}
