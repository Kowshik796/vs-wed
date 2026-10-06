import { useEffect, useRef } from "react"

const A = "/assets"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect()
          // How much the hero has scrolled past the top of the viewport
          const scrollDistance = Math.max(0, -rect.top)
          const heroHeight = rect.height || 1000

          // Active range: complete the full upward scroll within a natural scroll distance
          const activeRange = Math.min(window.innerHeight * 0.75, 550)
          const rawProgress = Math.min(
            1,
            Math.max(0, scrollDistance / activeRange),
          )

          // Smooth easeOutCubic curve for cinematic transition
          const easedProgress = 1 - Math.pow(1 - rawProgress, 3)

          // FULL scroll-up effect up to the hero section name:
          // 1. Temple (460ba.png) ascends all the way up to the hero names
          const templeLift = easedProgress * (heroHeight * 0.22)
          // 2. Trees (3a4ef.png) ascends all the way up to the hero names
          const treesLift = easedProgress * (heroHeight * 0.3)
          const templeScale = 1 + easedProgress * 0.04

          hero.style.setProperty(
            "--hero-scroll-progress",
            rawProgress.toFixed(4),
          )
          hero.style.setProperty(
            "--hero-temple-lift",
            `${templeLift.toFixed(2)}px`,
          )
          hero.style.setProperty("--hero-temple-scale", templeScale.toFixed(4))
          hero.style.setProperty(
            "--hero-trees-lift",
            `${treesLift.toFixed(2)}px`,
          )

          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <section ref={heroRef} className="hero" aria-labelledby="couple-names">
      {/* Sky Background */}
      <img
        className="hero-sky"
        src={`${A}/910e4.webp`}
        alt=""
        fetchPriority="high"
      />

      {/* Names Track (Sticky & Centered) - Animated cinematically on page load */}
      <div className="hero-title-track">
        <div className="hero-title" id="couple-names">
          <span className="hero-name groom">Vinoth</span>
          <em className="hero-weds">weds</em>
          <span className="hero-name bride">Sweatha</span>
        </div>
      </div>

      {/* 460ba.webp: Temple Image - Ascends upward on scroll toward the names */}
      <img
        className="hero-temple"
        src={`${A}/460ba.webp`}
        alt="Meenakshi Amman temple tower"
        fetchPriority="high"
      />

      {/* 3a4ef.webp: Trees Image - Also ascends upward on scroll */}
      <img
        className="hero-trees"
        src={`${A}/3a4ef.webp`}
        alt=""
        fetchPriority="high"
      />
    </section>
  )
}
