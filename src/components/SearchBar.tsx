import Form from 'next/form'

export default function SearchBar({ q }: { q: string }) {
  return (
    <Form action="/posts" className="search" role="search">
      {/* key: 검색어가 바뀌면 입력값도 새로 맞춤 */}
      <input name="q" defaultValue={q} key={q} placeholder="제목으로 외침 찾기" aria-label="제목 검색" maxLength={100} />
      <button type="submit">찾기</button>
    </Form>
  )
}
