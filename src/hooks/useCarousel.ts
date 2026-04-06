import { useState, useRef, useEffect, useCallback } from 'react'

export function useCarousel(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextSlide, 5000)
  }, [nextSlide])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index)
      startAutoPlay()
    },
    [startAutoPlay]
  )

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  return { currentSlide, goToSlide, stopAutoPlay, startAutoPlay }
}
