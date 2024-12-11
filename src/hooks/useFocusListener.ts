import { useEffect, useRef } from "react"

export function useFocusListener<T extends HTMLElement>(args: {
  handleInFocus?: () => void
  handleOutOfFocus?: () => void
}) {
  const elementRef = useRef<T | null>(null)
  useEffect(() => {
    window.addEventListener("click", (ev) => {
      if (!(ev.target instanceof Node) || !elementRef.current) return
      if (elementRef.current.contains(ev.target) && args.handleInFocus)
        args.handleInFocus()
      if (!elementRef.current.contains(ev.target) && args.handleOutOfFocus)
        args.handleOutOfFocus()
    })
  })

  return { ref: elementRef }
}
