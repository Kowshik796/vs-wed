import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import Hero from "./components/wedding/Hero"

const A = "/assets"

const HERO_IMAGES = [
  `${A}/910e4.webp`,
  `${A}/460ba.webp`,
  `${A}/3a4ef.webp`,
  `${A}/1c4aa.webp`,
  `${A}/73f55.webp`,
]

const SUBSEQUENT_IMAGES = [
  `${A}/26508.webp`,
  `${A}/f7387.webp`,
  `${A}/bbb98.webp`,
  "/wed.webp",
  `${A}/60b21.webp`,
  `${A}/a5887.webp`,
  `${A}/f19cc.webp`,
  "/Kovil.webp?v=4",
  `${A}/d20fb.webp`,
]

const events = [
  {
    name: "Reception",
    date: "24 October 2026",
    time: "7:00 PM",
    venue: "LR THIRUMANA MAHAL",
    map: "https://maps.app.goo.gl/AvDf5752wuoZitgD8",
    image: `${A}/bbb98.webp`,
    imageAlt: "A couple celebrating a traditional pre-wedding ceremony",
    description:
      "As we celebrate the joyous union of P. Vinoth & S. Sweatha, we cordially invite you, your family, and friends to join us for a wonderful evening filled with warmth, laughter, and festivity.",
  },
  {
    name: "Wedding",
    date: "25 October 2026",
    time: "4:00 AM",
    venue: "Arulmigu Sri Sornapureeswarar Temple, Thenponparappi",
    map: "https://maps.app.goo.gl/CXSaRamM6FaZxT527",
    image: "/wed.webp",
    imageAlt: "Traditional auspicious wedding ceremony",
    description:
      "With sacred mantras and timeless rituals, P. Vinoth & S. Sweatha unite in holy matrimony. We humbly request your presence and divine blessings on this auspicious dawn.",
  },
]

function EventIcon({ src, alt }: { src: string alt: string }) {
  return <img className="event-icon" src={`${A}/${src}`} alt={alt} />
}

export default function App() {
  const [eventIndex, setEventIndex] = useState(0)
  const [blessingCount, setBlessingCount] = useState(0)
  const templeSectionRef = useRef<HTMLElement>(null)
  const event = events[eventIndex]

  // Fast loading: Preload above-the-fold hero images immediately; fetch subsequent pages smoothly without network contention
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    const preloadSubsequent = () => {
      SUBSEQUENT_IMAGES.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadSubsequent, { timeout: 1200 })
    } else {
      setTimeout(preloadSubsequent, 600)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.14 },
    )

    document
      .querySelectorAll(".reveal")
      .forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = templeSectionRef.current
    if (!section) return

    let frame = 0
    const updateProgress = () => {
      const bounds = section.getBoundingClientRect()
      const distance = window.innerHeight + bounds.height
      const rawProgress = Math.min(
        1,
        Math.max(0, (window.innerHeight - bounds.top) / distance),
      )

      // Target position: couple descends and lands exactly in front of the center lotus pot on the floor
      const targetPosition = 0.52
      const animProgress = Math.min(targetPosition, rawProgress)

      // Smooth ease curve for natural descent
      const normalized = animProgress / targetPosition
      const eased = normalized * normalized * (3 - 2 * normalized)

      // Offset starts higher up and decreases smoothly to 0px, locking couple permanently on courtyard floor
      const startOffset = bounds.height * 0.32
      const currentOffset = Math.max(0, (1 - eased) * startOffset)

      section.style.setProperty("--journey-progress", animProgress.toString())
      section.style.setProperty(
        "--couple-offset",
        `${currentOffset.toFixed(1)}px`,
      )
      frame = 0
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const moveEvent = (direction: number) => {
    setEventIndex(
      (current) => (current + direction + events.length) % events.length,
    )
  }

  return (
    <main className="invitation">
      <Hero />

      <section
        className="invite-panel"
        id="invitation"
        aria-labelledby="invite-heading"
      >
        <img className="ganesha" src={`${A}/73f55.webp`} alt="" />
        <p className="invite-tamil">|| ஓம் ஸ்ரீ கணேசாய நமஹ ||</p>
        <p className="invite-blessing">
          With the blessings of God and our beloved parents,
          <br />
          we cordially
        </p>
        <h1 id="invite-heading">Invite</h1>
        <div className="invite-elders">
          <p>With the blessings of the Almighty and our beloved elders,</p>
          <p>
            <strong>
              Late Mr. Chithamalai &amp; Late Mrs. Laxhmi , Mrs. Vasantha
            </strong>
          </p>
          <p>
            <strong>Late Mr. Kolandai &amp; Mrs. Kowsalya</strong>
            <br />
            together cordially invite you to grace the auspicious wedding
            ceremony of their beloved grand daughter wedding
          </p>
        </div>
        <p className="invite-name invite-vinoth">Vinoth</p>
        <p className="invite-weds">weds</p>
        <p className="invite-name invite-sweatha">Sweatha</p>
        <div className="invite-venue">
          <p>At</p>
          <a
            href="https://maps.app.goo.gl/AvDf5752wuoZitgD8"
            target="_blank"
            rel="noreferrer"
          >
            LR THIRUMANA MAHAL,
          </a>
          <a
            href="https://maps.app.goo.gl/AvDf5752wuoZitgD8"
            target="_blank"
            rel="noreferrer"
          >
            LR Thirumana Mahal, (salem to chennai highway) Deviyakurichy,
          </a>
          <a
            href="https://maps.app.goo.gl/AvDf5752wuoZitgD8"
            target="_blank"
            rel="noreferrer"
          >
            Tamil Nadu - 636112
          </a>
        </div>
        <h2>On the following events</h2>
      </section>

      <section className="events-section" aria-label="Wedding events">
        <div
          className="event-card reveal"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") moveEvent(-1)
            if (e.key === "ArrowRight") moveEvent(1)
          }}
          tabIndex={0}
        >
          <img
            className="event-corner corner-tr"
            src={`${A}/55044.svg`}
            alt=""
          />
          <img
            className="event-corner corner-bl"
            src={`${A}/9949d.svg`}
            alt=""
          />
          <img
            className="event-corner corner-br"
            src={`${A}/e87b9.svg`}
            alt=""
          />
          <div className="event-label">
            <img src={`${A}/45996.svg`} alt="" />
            Krishna &amp; Radha
          </div>
          <div className="event-grid">
            <div className="event-photo-wrap">
              <img
                key={event.image}
                className="event-photo event-photo-fade"
                src={event.image}
                alt={event.imageAlt}
              />
              <div className="event-controls">
                <button
                  type="button"
                  onClick={() => moveEvent(-1)}
                  aria-label="Previous event"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => moveEvent(1)}
                  aria-label="Next event"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="event-copy" key={event.name}>
              <h2>{event.name}</h2>
              <div className="event-meta">
                <span>
                  <EventIcon src="6f14c.svg" alt="" />
                  {event.date}
                </span>
                <span>
                  <EventIcon src="196b6.svg" alt="" />
                  {event.time}
                </span>
                <span>
                  <EventIcon src="3e7cb.svg" alt="" />
                  {event.venue}
                </span>
              </div>
              <p>{event.description}</p>
              <a
                className="button"
                href={event.map}
                target="_blank"
                rel="noreferrer"
              >
                View location
              </a>
              <div className="event-dots" aria-label="Choose event">
                {events.map((item, index) => (
                  <button
                    type="button"
                    key={item.name}
                    className={index === eventIndex ? "active" : ""}
                    onClick={() => setEventIndex(index)}
                    aria-label={`Show ${item.name}`}
                    aria-current={index === eventIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="temple-scene"
        ref={templeSectionRef}
        aria-label="Temple illustration"
      >
        <img
          className="paper-cloud cloud-one"
          src={`${A}/42dac.webp`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="paper-cloud cloud-two"
          src={`${A}/923f7.webp`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="paper-cloud cloud-three"
          src={`${A}/923f7.webp`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="paper-temple"
          src={`${A}/a5887.webp`}
          alt="A handcrafted temple"
          loading="lazy"
          decoding="async"
        />
        <img
          className="paper-couple"
          src={`${A}/f19cc.webp`}
          alt="Bride and groom exchanging garlands"
          decoding="async"
        />
      </section>

      <section className="story" aria-labelledby="story-heading">
        <div className="story-copy">
          <h2 id="story-heading">Our&nbsp; Story</h2>
          <div className="story-paragraphs">
            <p className="story-narrow">
              Some souls are destined to find each other, no matter how long the
              journey or how many paths life takes them through.
            </p>
            <p className="story-medium">
              Like the eternal bond of Krishna and Radha, whose love was not
              merely about being together, but about understanding, trust,
              devotion, and finding a sense of peace in one another’s presence,
              some connections are written in the heart long before they are
              spoken in words.
            </p>
            <p className="story-wide">
              Their journey began with two hearts finding comfort in each other,
              slowly discovering that love is not just found in grand moments,
              but in the little things that make life beautiful. In every shared
              smile, every heartfelt conversation, every moment of laughter, and
              every challenge they faced together, their bond grew stronger and
              deeper.
            </p>
            <p>
              They learned that true love is about standing beside each other
              through every season of life. It is about finding strength when
              days are difficult, sharing happiness when life is kind, and
              choosing each other again and again. Through every joy, every
              tear, every dream, and every moment in between, they found in one
              another a companion, a confidant, and a home.
            </p>
            <p>
              Today, as they take the sacred vows of marriage, they promise to
              walk hand in hand through every chapter that lies ahead. They
              carry with them dreams of a beautiful future, faith in the journey
              they are beginning together, and gratitude for all the love and
              blessings that have brought them to this precious day.
            </p>
            <p>
              With hearts filled with{" "}
              <strong>love, gratitude, and happiness</strong>, they warmly
              invite you and your family to join them as they celebrate this
              sacred union.
            </p>
          </div>
          <blockquote>
            <span>“Two hearts. One journey. One beautiful forever.</span>
            <span>
              With the blessings of the Almighty and their beloved elders,
            </span>
            <span>
              they invite you to celebrate the beginning of their forever.”
            </span>
          </blockquote>
        </div>
      </section>

      <section className="rsvp" aria-labelledby="rsvp-heading">
        <div className="rsvp-copy reveal">
          <h2 id="rsvp-heading">
            <span>W</span>ill You
            <br />
            Join Us?
          </h2>
          <p>
            We would be truly honoured to celebrate this day with you. Your
            presence is the only gift we need.
          </p>
          <div className="blessing-scene">
            <img
              src={`${A}/f19cc.webp`}
              alt="Bride and groom exchanging garlands"
            />
            {blessingCount > 0 && (
              <div
                className="petal-shower"
                key={blessingCount}
                aria-hidden="true"
              >
                {Array.from({ length: 75 }, (_, index) => {
                  const colors = [
                    "#e35b82",
                    "#f3c45d",
                    "#f7a6b9",
                    "#ff4d6d",
                    "#ffd166",
                    "#fff0f3",
                    "#ff758f",
                  ]
                  const left = `${((index * 17) % 96) + 2}%`
                  const delay = `${(index * 42) % 3200}ms`
                  const duration = `${3200 + ((index * 97) % 2400)}ms`
                  const drift = `${((index * 23) % 80) - 40}px`
                  const size = `${8 + ((index * 7) % 8)}px`
                  const bg = colors[index % colors.length]
                  const rot = `${360 + ((index * 47) % 540)}deg`
                  return (
                    <i
                      key={index}
                      style={
                        {
                          "--petal-left": left,
                          "--petal-delay": delay,
                          "--petal-duration": duration,
                          "--petal-drift": drift,
                          "--petal-size": size,
                          "--petal-bg": bg,
                          "--petal-rot": rot,
                        } as CSSProperties
                      }
                    />
                  )
                })}
              </div>
            )}
          </div>
          <div className="rsvp-actions">
            <button
              type="button"
              onClick={() => setBlessingCount((count) => count + 1)}
            >
              Send blessings
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
