'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deletePost } from '@/src/services/postApi'
import { useHasEditToken } from '@/src/hooks/useHasEditToken'

/** 이 브라우저에 관리 토큰이 있는 글에만 수정·삭제 버튼 표시 */
export default function PostActions({ id }: { id: number }) {
  const router = useRouter()
  const hasToken = useHasEditToken(id)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')

  if (!hasToken) return null

  async function handleDelete() {
    if (!confirm('이 외침을 숲에서 지울까요? 되돌릴 수 없습니다.')) return
    setDeleting(true)
    setMessage('')
    try {
      await deletePost(id)
      router.push('/posts')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '삭제하지 못했습니다.')
      setDeleting(false)
    }
  }

  return (
    <div className="owner">
      <Link href={`/posts/${id}/edit`}>수정</Link>
      <button type="button" className="danger" onClick={handleDelete} disabled={deleting}>
        {deleting ? '지우는 중…' : '삭제'}
      </button>
      {message && <p className="form-error" role="alert">{message}</p>}
    </div>
  )
}
