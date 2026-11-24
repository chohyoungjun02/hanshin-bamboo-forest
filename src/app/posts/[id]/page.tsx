import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostMeta from '@/src/components/PostMeta'
import PostActions from '@/src/components/PostActions'
import { getPost } from '@/src/services/postApi'

export const dynamic = 'force-dynamic'

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  if (!Number.isSafeInteger(id) || id < 1) notFound()
  const post = await getPost(id)
  if (!post) notFound()

  return (
    <article className="detail">
      <span className="card-no">#{post.id}번째 외침</span>
      <h1>{post.title}</h1>
      <PostMeta post={post} />
      <p className="content">{post.content}</p>
      <div className="detail-foot">
        <Link href="/posts" className="back">← 숲으로 돌아가기</Link>
        <PostActions id={post.id} />
      </div>
    </article>
  )
}
