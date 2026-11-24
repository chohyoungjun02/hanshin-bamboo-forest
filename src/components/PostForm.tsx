'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createPost, updatePost } from '@/src/services/postApi'
import type { Post } from '@/src/types/post'

/** post가 있으면 수정, 없으면 새 글 작성 */
export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const cancelHref = post ? `/posts/${post.id}` : '/posts'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')
    try {
      const id = post
        ? (await updatePost(post.id, { title, content })).id
        : (await createPost({ title, content })).post.id
      router.push(`/posts/${id}`)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '외침을 남기지 못했습니다.')
      setSubmitting(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        제목
        <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100} placeholder="무슨 말을 외칠까요?" />
      </label>
      <label>
        내용
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required maxLength={5000} rows={10}
          placeholder="누가 썼는지는 아무도 모릅니다." />
        <small>{content.length} / 5000</small>
      </label>
      {message && <p className="form-error" role="alert">{message}</p>}
      <div className="actions">
        <Link href={cancelHref}>취소</Link>
        <button type="submit" disabled={submitting || !title.trim() || !content.trim()}>
          {submitting ? '외치는 중…' : post ? '고쳐 외치기' : '익명으로 외치기'}
        </button>
      </div>
    </form>
  )
}
