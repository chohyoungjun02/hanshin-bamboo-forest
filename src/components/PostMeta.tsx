import type { PostSummary } from '@/src/types/post'
import { formatDate } from '@/src/lib/date'

export default function PostMeta({ post }: { post: PostSummary }) {
  return (
    <p className="meta">
      <span>{post.author}</span>
      <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      <span>조회 {post.views.toLocaleString('ko-KR')}</span>
    </p>
  )
}
