const formatter = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Seoul',
})

export const formatDate = (iso: string) => formatter.format(new Date(iso))
