import type { PostSummary } from '@/src/types/post'
import PostItem from './PostItem'

export default function PostList({ posts, emptyText }: { posts: PostSummary[]; emptyText: string }) {
  if (posts.length === 0) return <p className="empty">{emptyText}</p>
  return <ul className="list">{posts.map((post) => <PostItem key={post.id} post={post} />)}</ul>
}
