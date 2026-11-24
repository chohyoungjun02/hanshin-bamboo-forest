'use client'

import { useSyncExternalStore } from 'react'
import { tokenKey } from '@/src/services/postApi'

const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

/** 서버 렌더링 때는 false, 브라우저에서 토큰이 있으면 true */
export function useHasEditToken(id: number) {
  return useSyncExternalStore(subscribe, () => localStorage.getItem(tokenKey(id)) !== null, () => false)
}
