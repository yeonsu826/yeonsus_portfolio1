import { useEffect } from 'react'

/**
 * .reveal 클래스가 붙은 요소가 화면에 들어오면 .is-visible을 더해준다.
 * 컴포넌트가 늘어나도 클래스만 붙이면 되도록 문서 전체를 한 번에 감시한다.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
