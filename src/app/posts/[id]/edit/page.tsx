import { notFound } from 'next/navigation'
import PostForm from '@/src/components/PostForm'
import { getPost } from '@/src/services/postApi'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  if (!Number.isSafeInteger(id) || id < 1) notFound()
  const post = await getPost(id, false) // 수정 폼은 조회수를 올리지 않음
  if (!post) notFound()

  return (
    <>
      <h1 className="page-title">외침 고치기</h1>
      <PostForm post={post} />
    </>
  )
}
