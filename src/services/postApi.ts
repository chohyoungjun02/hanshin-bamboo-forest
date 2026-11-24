import type { CreatePostResponse, Post, PostInput, PostListQuery, PostListResponse } from '@/src/types/post'

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

async function send(url: string, init?: RequestInit) {
  const response = await fetch(url, { cache: 'no-store', ...init })
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    const message = body && typeof body === 'object' && 'message' in body && typeof body.message === 'string'
      ? body.message : `요청에 실패했습니다. (${response.status})`
    throw new ApiError(message, response.status)
  }
  return response
}

const request = async <T,>(url: string, init?: RequestInit) => (await send(url, init)).json() as Promise<T>

// ── Server Component 전용: 서버에서는 상대 경로를 쓸 수 없어 절대 URL 사용 ──
function serverUrl(path: string) {
  const base = process.env.API_BASE_URL
  if (!base) throw new Error('API_BASE_URL이 설정되지 않았습니다. .env.local을 확인하세요.')
  return new URL(path, base).toString()
}

export function getPosts({ q, page, size }: PostListQuery = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (page) params.set('page', String(page))
  if (size) params.set('size', String(size))
  return request<PostListResponse>(serverUrl(`/api/posts?${params}`))
}

/** 없는 글이면 null. view=false면 조회수를 올리지 않음(수정 폼용) */
export async function getPost(id: number, view = true) {
  try {
    return await request<Post>(serverUrl(`/api/posts/${id}${view ? '' : '?view=0'}`))
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}

// ── Client Component 전용: 같은 출처로 요청 ──
export const tokenKey = (id: number) => `editToken:${id}`

function authHeaders(id: number): Record<string, string> {
  const token = localStorage.getItem(tokenKey(id))
  if (!token) throw new ApiError('이 브라우저에서 작성한 글만 수정·삭제할 수 있어요.', 401)
  return { Authorization: `Bearer ${token}` }
}

const json = { 'Content-Type': 'application/json' }

export async function createPost(input: PostInput) {
  const result = await request<CreatePostResponse>('/api/posts', {
    method: 'POST', headers: json, body: JSON.stringify(input),
  })
  // 토큰은 작성 응답에서 한 번만 발급되므로 글 ID별로 보관
  localStorage.setItem(tokenKey(result.post.id), result.editToken)
  return result
}

export function updatePost(id: number, input: PostInput) {
  return request<Post>(`/api/posts/${id}`, {
    method: 'PATCH', headers: { ...json, ...authHeaders(id) }, body: JSON.stringify(input),
  })
}

export async function deletePost(id: number) {
  await send(`/api/posts/${id}`, { method: 'DELETE', headers: authHeaders(id) }) // 204: 본문 파싱 생략
  localStorage.removeItem(tokenKey(id))
}
