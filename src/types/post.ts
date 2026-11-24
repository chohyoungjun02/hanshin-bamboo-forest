export type PostSummary = {
  id: number
  title: string
  author: '익명'
  createdAt: string // UTC ISO 문자열
  views: number
}

export type Post = PostSummary & { content: string }

export type PostInput = { title: string; content: string }

export type PostListQuery = { q?: string; page?: number; size?: number }

export type PostListResponse = { posts: PostSummary[]; total: number; page: number; size: number }

export type CreatePostResponse = { post: Post; editToken: string }

export type ApiErrorBody = { message: string }
