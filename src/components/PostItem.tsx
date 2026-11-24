import Link from 'next/link'
import type { PostSummary } from '@/src/types/post'
import PostMeta from './PostMeta'

export default function PostItem({ post }: { post: PostSummary }) {
  return (
    <li className="card">
      {/* 상세 조회 시 조회수가 올라가므로 prefetch 끔 */}
      <Link href={`/posts/${post.id}`} prefetch={false} className="card-link">
        <span className="card-no">#{post.id}번째 외침</span>
        <h2>{post.title}</h2>
        <PostMeta post={post} />
      </Link>
    </li>
  )
}
