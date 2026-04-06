import { useCarousel } from '../../hooks/useCarousel'

interface Slide {
  src: string
  alt: string
}

interface HeroCarouselProps {
  slides: Slide[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const { currentSlide, goToSlide, stopAutoPlay, startAutoPlay } = useCarousel(slides.length)

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-surface-container-high aspect-[4/5] w-full"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onTouchStart={stopAutoPlay}
      onTouchEnd={startAutoPlay}
    >
      {/* Strip: each slide is min-w-full, no explicit width needed */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0">
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className="w-2 h-2 rounded-full bg-white transition-opacity duration-300"
            style={{ opacity: i === currentSlide ? 1 : 0.3 }}
          />
        ))}
      </div>

      {/* Identity chip — desktop: absolute inside; mobile: hidden here, shown outside */}
      <div className="absolute bottom-8 left-0 lg:-left-6 z-30 hidden lg:flex items-center gap-3 glass-panel border border-white/10 rounded-2xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-black text-white font-headline text-sm flex-shrink-0">
          AC
        </div>
        <div>
          <p className="text-white font-bold font-headline text-sm">Alex Chen</p>
          <p className="text-on-surface-variant text-xs font-body">UI/UX Designer · High School</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-green-400 font-semibold">Open</span>
        </div>
      </div>
    </div>
  )
}
