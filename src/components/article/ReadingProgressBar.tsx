import { useReadingProgress } from '../../hooks/useReadingProgress'

export default function ReadingProgressBar() {
  const progress = useReadingProgress()

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-primary z-[200] transition-[width] duration-100"
      style={{ width: `${progress}%` }}
    />
  )
}
