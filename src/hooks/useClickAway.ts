import { RefObject, useEffect } from 'react'

export function useClickAway(onClickAway: (event: MouseEvent) => void, targetRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!targetRef.current || targetRef.current.contains(event.target as Node)) {
        return
      }
      onClickAway(event)
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [onClickAway, targetRef])
}
