'use client'

export default function PostsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="empty" role="alert">
      <p>숲에 바람이 멎었어요. 잠시 후 다시 시도해 주세요.</p>
      <p className="error-detail">{error.message}</p>
      <button type="button" onClick={reset}>다시 시도</button>
    </div>
  )
}
