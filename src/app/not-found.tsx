import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="empty">
      <h1 className="page-title">찾는 외침이 없어요</h1>
      <p>이미 바람에 흩어졌거나, 처음부터 없던 이야기예요.</p>
      <Link href="/posts" className="back">← 숲으로 돌아가기</Link>
    </div>
  )
}
