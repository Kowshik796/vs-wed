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

          // Active range: complete upward scroll naturally matching the video
          const activeRange = Math.min(window.innerHeight * 0.85, 600)
          const rawProgress = Math.min(
            1,
            Math.max(0, scrollDistance / activeRange),
          )

          // Smooth cubic ease curve
          const easedProgress = 1 - Math.pow(1 - rawProgress, 3)

          // Grouped frame parallax lift: temple + trees ascend together over static text
          const frameLift = easedProgress * (heroHeight * 0.16)
          const templeScale = 1 + easedProgress * 0.025

          hero.style.setProperty(
            "--hero-scroll-progress",
            rawProgress.toFixed(4),
          )
          hero.style.setProperty(
            "--hero-frame-lift",
            `${frameLift.toFixed(2)}px`,
          )
          hero.style.setProperty("--hero-temple-scale", templeScale.toFixed(4))

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

      {/* Static Stable Text: Vinoth weds Sweatha (behind temple group when scrolling) */}
      <div className="hero-title-track">
        <div className="hero-title" id="couple-names">
          <span className="hero-name groom">Vinoth</span>
          <em className="hero-weds">weds</em>
          <span className="hero-name bride">Sweatha</span>
        </div>
      </div>

      {/* Grouped Frame: Temple + Trees (Parallax scroll effect in front of static text) */}
      <div className="hero-scene-frame">
        {/* 460ba.webp: Temple Image */}
        <img
          className="hero-temple"
          src={`${A}/460ba.webp`}
          alt="Meenakshi Amman temple tower"
          fetchPriority="high"
        />

        {/* 3a4ef.webp: Foreground Trees Image */}
        <img
          className="hero-trees"
          src={`${A}/3a4ef.webp`}
          alt=""
          fetchPriority="high"
        />
      </div>
    </section>
  )
}
