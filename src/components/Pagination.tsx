import Link from 'next/link'

type Props = { q: string; page: number; totalPages: number }

export default function Pagination({ q, page, totalPages }: Props) {
  if (totalPages <= 1) return null
  const href = (target: number) => {
    const params = new URLSearchParams({ page: String(target) })
    if (q) params.set('q', q)
    return `/posts?${params}`
  }
  return (
    <nav className="pagination" aria-label="페이지 이동">
      {page > 1 ? <Link href={href(page - 1)}>← 이전</Link> : <span />}
      <span>{page} / {totalPages}</span>
      {page < totalPages ? <Link href={href(page + 1)}>다음 →</Link> : <span />}
    </nav>
  )
}
