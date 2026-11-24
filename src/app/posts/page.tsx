import Link from 'next/link'
import PostList from '@/src/components/PostList'
import SearchBar from '@/src/components/SearchBar'
import Pagination from '@/src/components/Pagination'
import { getPosts } from '@/src/services/postApi'

export const dynamic = 'force-dynamic'

const SIZE = 10
type SearchParams = Promise<{ q?: string | string[]; page?: string | string[] }>

export default async function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.trim() : ''
  const requested = Number(params.page)
  const page = Number.isSafeInteger(requested) && requested >= 1 ? requested : 1 // 잘못된 값은 1페이지로
  const { posts, total } = await getPosts({ q, page, size: SIZE })
  const totalPages = Math.ceil(total / SIZE)
  const emptyText = q ? '그런 외침은 숲에 없어요.'
    : total > 0 ? '이 페이지엔 외침이 없어요.'
    : '아직 숲이 조용합니다. 첫 외침을 남겨 보세요.'

  return (
    <>
      <section className="hero">
        <h1>대나무숲에 외쳐 주세요</h1>
        <p>로그인도, 이름도 없이. 하고 싶었던 말을 남겨요.</p>
      </section>
      <SearchBar q={q} />
      {q && <p className="result">“{q}” 외침 {total}건 · <Link href="/posts">전체 보기</Link></p>}
      <PostList posts={posts} emptyText={emptyText} />
      <Pagination q={q} page={page} totalPages={totalPages} />
    </>
  )
}
