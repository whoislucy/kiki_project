import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

const SLIDE_W = 794;
const SLIDE_H = 1123;
const pct = (n: number, total: number) => `${(n / total) * 100}%`;

type Overlay = { x: number; y: number; w: number; h: number };
type VideoOverlay = Overlay & { src: string; poster: string };
type LinkOverlay = Overlay & { href: string; label: string };

const SLIDE_2_VIDEOS: VideoOverlay[] = [
  { src: "media1.mp4", poster: "image6.png", x: 269, y: 187, w: 123, h: 219 },
  { src: "media2.mp4", poster: "image7.png", x: 516, y: 231, w: 221, h: 393 },
  { src: "media3.mp4", poster: "image8.png", x: 333, y: 810, w: 140, h: 229 },
];

const SLIDE_1_LINKS: LinkOverlay[] = [
  { href: "https://instagram.com/atelier.de.kiki", label: "Instagram @atelier.de.kiki", x: 54, y: 1063, w: 130, h: 22 },
  { href: "https://t.me/Kikiki_me", label: "Telegram @Kikiki_me", x: 668, y: 1063, w: 86, h: 22 },
];

const SLIDE_3_LINKS: LinkOverlay[] = [
  { href: "https://t.me/Kikiki_me", label: "Telegram @Kikiki_me", x: 315, y: 1066, w: 140, h: 24 },
  { href: "https://instagram.com/atelier.de.kiki", label: "Instagram atelier.de.kiki", x: 458, y: 1066, w: 140, h: 24 },
  { href: "mailto:palokris@gmail.com", label: "Email palokris@gmail.com", x: 619, y: 1066, w: 145, h: 24 },
];

function styleFor(o: Overlay): React.CSSProperties {
  return {
    left: pct(o.x, SLIDE_W),
    top: pct(o.y, SLIDE_H),
    width: pct(o.w, SLIDE_W),
    height: pct(o.h, SLIDE_H),
  };
}

const PNG_SLIDES = [
  { num: 1, src: "slide-1.png", videos: [] as VideoOverlay[], links: SLIDE_1_LINKS },
  { num: 2, src: "slide-2.png", videos: SLIDE_2_VIDEOS, links: [] as LinkOverlay[] },
  { num: 3, src: "slide-3.png", videos: [] as VideoOverlay[], links: SLIDE_3_LINKS },
];

function useIsDesktop(query = "(min-width: 768px)") {
  const [match, setMatch] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

const SERVICES = [
  "Коммерческие кампании",
  "Лукбуки и Editorial",
  "AI-персонажи и аватары",
  "Предметная съёмка",
  "AI-видео и Micro-motion",
  "Концепты и визуал. системы",
  "Стилизация под референс",
  "Контент для соцсетей",
];

type WorkCard = {
  id: string;
  image: string;
  video?: string;
  ratio: string;
  tag: string;
  title: string;
  subtitle: string;
};

const SLIDE_2_CARDS: WorkCard[] = [
  { id: "w1", image: "image2.jpeg", ratio: "244 / 378", tag: "BRAND CAMPAIGN · INSPIRO", title: "INSPIRO — BOTANICAL LAB", subtitle: "Продуктовый лайфстайл · sound design" },
  { id: "w2", image: "image6.png", video: "media1.mp4", ratio: "123 / 219", tag: "BRAND CAMPAIGN · INSPIRO", title: "INSPIRO — BOTANICAL LAB", subtitle: "Идея · Кампейн" },
  { id: "w3", image: "image7.png", video: "media2.mp4", ratio: "221 / 393", tag: "BRAND CAMPAIGN · STAYA", title: "STAYA — CONNECTION YOU CAN TRUST", subtitle: "Продуктовая съёмка · аксессуары · sound design" },
  { id: "w4", image: "image3.jpeg", ratio: "167 / 277", tag: "BRAND CAMPAIGN · STAYA", title: "MADE FOR DOGS", subtitle: "Идея · Кампейн · AI-персонажи" },
  { id: "w5", image: "image4.jpeg", ratio: "140 / 229", tag: "BRAND CAMPAIGN · OPU", title: "NATURAL TEXTURES", subtitle: "Идея · AI-модель · продукт" },
  { id: "w6", image: "image8.png", video: "media3.mp4", ratio: "140 / 229", tag: "BRAND CAMPAIGN · OPU", title: "NEW PRODUCTS", subtitle: "Кампейн · sound design" },
  { id: "w7", image: "image5.jpeg", ratio: "140 / 229", tag: "BRAND CAMPAIGN · OPU", title: "ATMOSPHERE", subtitle: "Атмосфера · продукт" },
];

const SLIDE_3_CARDS: WorkCard[] = [
  { id: "l1", image: "image9.jpeg", ratio: "184 / 327", tag: "LOOKBOOK · EDITORIAL", title: "FLAT LAY STUDY", subtitle: "AI-лукбук · AI-модели" },
  { id: "l2", image: "image12.jpeg", ratio: "184 / 327", tag: "LOOKBOOK · EDITORIAL", title: "OLIVE DUO", subtitle: "AI-лукбук · стиль" },
  { id: "l3", image: "image10.png", ratio: "286 / 200", tag: "LOOKBOOK · CAPSULE", title: "THE ASYMMETRIC ENSEMBLE", subtitle: "AI-лукбук · капсула" },
  { id: "l4", image: "image11.png", ratio: "388 / 295", tag: "LOOKBOOK · JEWELLERY", title: "GOLD & PERIDOT SET", subtitle: "Ювелирный лукбук · AI-модель · 1:1 точность" },
  { id: "l5", image: "image13.png", ratio: "192 / 144", tag: "LOOKBOOK · JEWELLERY", title: "GECKO DETAIL", subtitle: "Предметная съёмка · детальный план" },
];

type ContactLink = { label: string; value: string; href: string; accent?: boolean };

const CONTACTS: ContactLink[] = [
  { label: "Telegram", value: "@Kikiki_me", href: "https://t.me/Kikiki_me", accent: true },
  { label: "Instagram", value: "atelier.de.kiki", href: "https://instagram.com/atelier.de.kiki", accent: true },
  { label: "Email", value: "palokris@gmail.com", href: "mailto:palokris@gmail.com" },
];

function Card({ card, onOpen }: { card: WorkCard; onOpen: (c: WorkCard) => void }) {
  return (
    <article className="card" data-testid={`card-${card.id}`}>
      <div className="card-media" style={{ ["--natural-ratio" as string]: card.ratio }}>
        {card.video ? (
          <video
            className="card-video"
            src={`${BASE}${card.video}`}
            poster={`${BASE}${card.image}`}
            controls
            playsInline
            preload="metadata"
            data-testid={`video-${card.id}`}
          />
        ) : (
          <button
            type="button"
            className="card-img-btn"
            onClick={() => onOpen(card)}
            aria-label={`Открыть ${card.title} на весь экран`}
            data-testid={`open-${card.id}`}
          >
            <img className="card-img" src={`${BASE}${card.image}`} alt={card.title} loading="lazy" />
            <span className="card-zoom-hint" aria-hidden="true">⤢</span>
          </button>
        )}
        {card.video && <span className="video-badge" aria-hidden="true">▶ VIDEO</span>}
      </div>
      <p className="card-tag">{card.tag}</p>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-sub">{card.subtitle}</p>
    </article>
  );
}

export default function Home() {
  const isDesktop = useIsDesktop();
  const [activeSlide, setActiveSlide] = useState(1);
  const [lightboxCard, setLightboxCard] = useState<WorkCard | null>(null);
  const [zoomedSlide, setZoomedSlide] = useState<number | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const slideZoomCloseRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (card: WorkCard) => {
    openerRef.current = (document.activeElement as HTMLElement) ?? null;
    setLightboxCard(card);
  };

  const openSlideZoom = (num: number) => {
    openerRef.current = (document.activeElement as HTMLElement) ?? null;
    setZoomedSlide(num);
  };

  useEffect(() => {
    if (zoomedSlide === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => slideZoomCloseRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setZoomedSlide(null); return; }
      if (e.key === "Tab") { e.preventDefault(); slideZoomCloseRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      const opener = openerRef.current;
      if (opener && document.contains(opener)) opener.focus();
      openerRef.current = null;
    };
  }, [zoomedSlide]);

  useEffect(() => {
    if (!lightboxCard) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => lightboxCloseRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightboxCard(null); return; }
      if (e.key === "Tab") {
        e.preventDefault();
        lightboxCloseRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      const opener = openerRef.current;
      if (opener && document.contains(opener)) {
        opener.focus();
      }
      openerRef.current = null;
    };
  }, [lightboxCard]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              setActiveSlide(i + 1);
            }
          });
        },
        { threshold: [0.4] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isDesktop]);

  const scrollToSlide = (idx: number) => {
    const el = slideRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isDesktop) {
    return (
      <main className="portfolio-root portfolio-desktop" data-testid="portfolio-page">
        <style>{styles}</style>
        {PNG_SLIDES.map((slide, idx) => (
          <section
            key={`png-slide-${slide.num}`}
            ref={(el) => { slideRefs.current[idx] = el; }}
            className="slide-frame"
            data-testid={`slide-${slide.num}`}
          >
            <img
              className="slide-bg"
              src={`${BASE}${slide.src}`}
              alt={`Slide ${slide.num}`}
              draggable={false}
            />
            {slide.videos.map((v, i) => (
              <video
                key={`s${slide.num}-v-${i}`}
                className="video-overlay"
                src={`${BASE}${v.src}`}
                poster={`${BASE}${v.poster}`}
                controls
                playsInline
                preload="metadata"
                style={styleFor(v)}
                data-testid={`video-${v.src.replace(/\./g, "-")}`}
              />
            ))}
            {slide.links.map((l, i) => (
              <a
                key={`s${slide.num}-l-${i}`}
                className="link-overlay"
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={l.label}
                title={l.label}
                style={styleFor(l)}
                data-testid={`link-s${slide.num}-${i}`}
              />
            ))}
            <button
              type="button"
              className="zoom-btn"
              onClick={() => openSlideZoom(slide.num)}
              aria-label={`Открыть слайд ${slide.num} на весь экран`}
              data-testid={`zoom-btn-${slide.num}`}
            >
              ⤢
            </button>
          </section>
        ))}

        {zoomedSlide !== null && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Слайд ${zoomedSlide} увеличенный`}
            onClick={(e) => { if (e.target === e.currentTarget) setZoomedSlide(null); }}
            data-testid="slide-lightbox"
          >
            <button
              ref={slideZoomCloseRef}
              type="button"
              className="lightbox-close"
              onClick={() => setZoomedSlide(null)}
              aria-label="Закрыть"
              data-testid="slide-lightbox-close"
            >
              ×
            </button>
            <div className="slide-lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <img
                className="slide-lightbox-img"
                src={`${BASE}slide-${zoomedSlide}.png`}
                alt={`Slide ${zoomedSlide} fullscreen`}
                data-testid={`slide-lightbox-img-${zoomedSlide}`}
              />
            </div>
          </div>
        )}

        <nav className="nav-dots" aria-label="Навигация по слайдам">
          <span className="nav-label">{String(activeSlide).padStart(2, "0")} / 03</span>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              className="nav-dot"
              data-active={activeSlide === n}
              onClick={() => scrollToSlide(n - 1)}
              aria-label={`Перейти к слайду ${n}`}
              data-testid={`nav-dot-${n}`}
            />
          ))}
        </nav>
      </main>
    );
  }

  return (
    <main className="portfolio-root" data-testid="portfolio-page">
      <style>{styles}</style>

      <section
        ref={(el) => { slideRefs.current[0] = el; }}
        className="slide slide-1"
        data-testid="slide-1"
      >
        <header className="slide-header">
          <span className="header-tag">AI VISUAL CREATOR · PORTFOLIO MMXXVI</span>
          <span className="header-asterisk">✱</span>
          <span className="header-num" data-testid="header-num-1">{String(activeSlide).padStart(2, "0")} / 03</span>
        </header>

        <div className="hero">
          <h1 className="hero-title">KRISTINA</h1>
          <h2 className="hero-subtitle">ERMILOVA</h2>
        </div>

        <ul className="services">
          {SERVICES.map((s, i) => (
            <li key={s} className="service" data-testid={`service-${i + 1}`}>
              <span className="service-name">{s}</span>
              <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>

        <div className="visual-creator-mark" aria-hidden="true">VISUAL CREATOR · MOSCOW</div>

        <div className="big-tagline">
          <h2 className="big-tagline-1">ВИЗУАЛЬНЫЙ</h2>
          <h2 className="big-tagline-2">ЯЗЫК БРЕНДА</h2>
        </div>

      </section>

      <section
        ref={(el) => { slideRefs.current[1] = el; }}
        className="slide slide-2"
        data-testid="slide-2"
      >
        <header className="slide-header">
          <span className="header-tag">I · SELECTED WORKS</span>
          <span className="header-asterisk">✱</span>
          <span className="header-num" data-testid="header-num-2">{String(activeSlide).padStart(2, "0")} / 03</span>
        </header>

        <div className="cards-grid">
          {SLIDE_2_CARDS.map((card) => <Card key={card.id} card={card} onOpen={openLightbox} />)}
        </div>
      </section>

      <section
        ref={(el) => { slideRefs.current[2] = el; }}
        className="slide slide-3"
        data-testid="slide-3"
      >
        <header className="slide-header">
          <span className="header-tag">II · LOOKBOOKS & PORTRAITS</span>
          <span className="header-asterisk">✱</span>
          <span className="header-num" data-testid="header-num-3">{String(activeSlide).padStart(2, "0")} / 03</span>
        </header>

        <div className="cards-grid">
          {SLIDE_3_CARDS.map((card) => <Card key={card.id} card={card} onOpen={openLightbox} />)}
        </div>

        <footer className="contacts-footer">
          <div className="contact-block">
            <span className="contact-label">АВТОР</span>
            <span className="contact-value contact-author">Kristina Ermilova</span>
          </div>
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              className={`contact-block contact-link ${c.accent ? "contact-accent" : ""}`}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              data-testid={`contact-${c.label.toLowerCase()}`}
            >
              <span className="contact-label">{c.label.toUpperCase()}</span>
              <span className="contact-value">{c.value}</span>
            </a>
          ))}
        </footer>
      </section>

      {lightboxCard && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxCard.title}
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxCard(null); }}
          data-testid="lightbox"
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxCard(null)}
            aria-label="Закрыть"
            data-testid="lightbox-close"
          >
            ×
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img
              className="lightbox-img"
              src={`${BASE}${lightboxCard.image}`}
              alt={lightboxCard.title}
              data-testid="lightbox-img"
            />
            <figcaption className="lightbox-caption">
              <span className="lightbox-tag">{lightboxCard.tag}</span>
              <span className="lightbox-title">{lightboxCard.title}</span>
              <span className="lightbox-sub">{lightboxCard.subtitle}</span>
            </figcaption>
          </figure>
        </div>
      )}

      <nav className="nav-dots" aria-label="Навигация по слайдам">
        <span className="nav-label">{String(activeSlide).padStart(2, "0")} / 03</span>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            className="nav-dot"
            data-active={activeSlide === n}
            onClick={() => scrollToSlide(n - 1)}
            aria-label={`Перейти к слайду ${n}`}
            data-testid={`nav-dot-${n}`}
          />
        ))}
      </nav>
    </main>
  );
}

const styles = `
:root { color-scheme: light; }
html, body { margin: 0; padding: 0; background: #F4F1EB; }

.portfolio-root {
  background: #F4F1EB;
  min-height: 100vh;
  font-family: 'Onest', 'Inter', system-ui, sans-serif;
  color: #151210;
  padding-bottom: 80px;
  overflow-x: clip;
}

/* DESKTOP — original PNG-based slides (matches deployed version) */
.portfolio-desktop {
  padding: 24px 16px 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.slide-frame {
  position: relative;
  width: 100%;
  max-width: ${SLIDE_W}px;
  aspect-ratio: ${SLIDE_W} / ${SLIDE_H};
  background: #F4F1EB;
  box-shadow: 0 30px 60px -20px rgba(20,18,16,0.25),
              0 18px 36px -18px rgba(20,18,16,0.18);
  overflow: hidden;
  border-radius: 2px;
}
.slide-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  display: block;
}
.video-overlay {
  position: absolute;
  object-fit: cover;
  background: #000;
  z-index: 2;
  display: block;
}
.link-overlay {
  position: absolute;
  z-index: 3;
  display: block;
  background: transparent;
  border-radius: 4px;
  transition: background-color 0.15s ease;
  -webkit-tap-highlight-color: rgba(224, 48, 24, 0.20);
}
.link-overlay:hover { background: rgba(224, 48, 24, 0.10); }
.link-overlay:focus-visible { outline: 2px solid #E03018; outline-offset: 2px; }

.zoom-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 4;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(20,18,16,0.72);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-tap-highlight-color: transparent;
  padding: 0;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.15s ease;
}
.slide-frame:hover .zoom-btn,
.zoom-btn:focus-visible { opacity: 1; }
.zoom-btn:hover { background: rgba(224, 48, 24, 0.92); }
.zoom-btn:active { transform: scale(0.94); }

.slide-lightbox-inner {
  position: relative;
  width: 100%;
  max-width: 1400px;
  padding: 56px 0 24px;
  margin: 0 auto;
}
.slide-lightbox-img {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
}

.slide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px clamp(16px, 4vw, 56px) 56px;
  position: relative;
  border-bottom: 1px solid rgba(20,18,16,0.06);
}

/* HEADER */
.slide-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #CCC7BC;
  margin-bottom: clamp(28px, 5vw, 56px);
}
.header-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.4vw, 11px);
  letter-spacing: 0.12em;
  color: #9A9088;
  text-transform: uppercase;
}
.header-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.4vw, 11px);
  letter-spacing: 0.12em;
  color: #9A9088;
  text-align: right;
}
.header-asterisk { color: #E03018; font-size: 14px; }

/* HERO (slide 1) */
.hero { margin-bottom: clamp(28px, 5vw, 56px); }
.hero-title, .hero-subtitle {
  margin: 0;
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.92;
  font-size: clamp(40px, 13vw, 156px);
  overflow-wrap: anywhere;
}
.hero-title { color: #151210; }
.hero-subtitle { color: #E03018; }

/* SERVICES list */
.services {
  list-style: none;
  margin: 0 0 clamp(48px, 8vw, 96px);
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0 32px;
}
.service {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #CCC7BC;
}
.service-name {
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  font-size: clamp(11px, 2.6vw, 14px);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #151210;
}
.service-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.2vw, 11px);
  color: #E03018;
  letter-spacing: 0.1em;
}

.visual-creator-mark {
  display: none;
}

/* BIG tagline */
.big-tagline { margin: clamp(48px, 10vw, 120px) 0 clamp(28px, 5vw, 48px); }
.big-tagline-1, .big-tagline-2 {
  margin: 0;
  font-family: 'Unbounded', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  font-size: clamp(28px, 9vw, 88px);
  overflow-wrap: anywhere;
}
.big-tagline-1 { color: #151210; }
.big-tagline-2 { color: #E03018; }

/* SLIDE 1 footer */
.slide-1-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #CCC7BC;
}
.mono-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.4vw, 11px);
  letter-spacing: 0.14em;
  color: #9A9088;
  text-decoration: none;
  transition: color 0.15s ease;
  -webkit-tap-highlight-color: rgba(224, 48, 24, 0.20);
  display: inline-block;
  padding: 12px 4px;
  margin: -12px -4px;
}
.mono-link:hover, .mono-link:focus-visible { color: #E03018; outline: none; }
.slide-1-footer .mono-link:last-child { text-align: right; }
.footer-asterisk { color: #E03018; font-size: 14px; text-align: center; }

/* CARDS GRID */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 3.5vw, 36px) clamp(12px, 2.5vw, 24px);
}

@media (min-width: 640px) {
  .cards-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px); }
}
@media (min-width: 1024px) {
  .cards-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
}

.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
.card-media {
  position: relative;
  width: 100%;
  background: #E8E2D5;
  overflow: hidden;
  border-radius: 2px;
  aspect-ratio: 3 / 4 !important;
}
@media (min-width: 1024px) {
  .card-media { aspect-ratio: var(--natural-ratio, 3 / 4) !important; }
}
.card-img, .card-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.card-video { background: #000; }

.card-img-btn {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
  display: block;
  -webkit-tap-highlight-color: rgba(224, 48, 24, 0.20);
  overflow: hidden;
}
.card-img-btn:focus-visible { outline: 2px solid #E03018; outline-offset: -2px; }
.card-img-btn .card-img { transition: transform 0.4s ease; }
.card-img-btn:hover .card-img { transform: scale(1.04); }
.card-zoom-hint {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(20,18,16,0.72);
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  backdrop-filter: blur(6px);
}
.card-img-btn:hover .card-zoom-hint,
.card-img-btn:focus-visible .card-zoom-hint { opacity: 1; }
@media (hover: none) and (pointer: coarse) {
  .card-zoom-hint { opacity: 1; }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(20,18,16,0.94);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 16px 24px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  animation: fade-in 0.18s ease-out;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.lightbox-close {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 101;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.96);
  color: #151210;
  cursor: pointer;
  font-size: 26px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  -webkit-tap-highlight-color: transparent;
}
.lightbox-close:active { transform: scale(0.94); }
.lightbox-figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: min(1200px, 100%);
  max-height: 100%;
}
.lightbox-img {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 160px);
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 2px;
  user-select: none;
}
.lightbox-caption {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #F4F1EB;
  text-align: left;
}
.lightbox-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: #E03018;
  text-transform: uppercase;
}
.lightbox-title {
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.01em;
}
.lightbox-sub {
  font-family: 'Onest', sans-serif;
  font-size: 12px;
  color: rgba(244,241,235,0.65);
}

.video-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #E03018;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  padding: 4px 8px;
  border-radius: 2px;
  pointer-events: none;
  z-index: 2;
}

.card-tag {
  margin: 4px 0 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: #E03018;
  text-transform: uppercase;
}
.card-title {
  margin: 0;
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: clamp(14px, 2.6vw, 16px);
  letter-spacing: -0.01em;
  color: #151210;
  line-height: 1.2;
}
.card-sub {
  margin: 0;
  font-family: 'Onest', sans-serif;
  font-size: clamp(11px, 2.4vw, 13px);
  color: #9A9088;
  line-height: 1.4;
}

/* CONTACTS footer */
.contacts-footer {
  margin-top: clamp(40px, 6vw, 64px);
  padding-top: 24px;
  border-top: 1px solid #CCC7BC;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px 32px;
}
.contact-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0;
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: rgba(224, 48, 24, 0.20);
  min-height: 44px;
}
.contact-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: #9A9088;
  text-transform: uppercase;
}
.contact-value {
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: clamp(15px, 3.4vw, 18px);
  color: #151210;
  word-break: break-word;
}
.contact-accent .contact-value { color: #E03018; }
.contact-link { transition: opacity 0.15s ease; }
.contact-link:hover, .contact-link:focus-visible { opacity: 0.7; outline: none; }

/* NAV PILL */
.nav-dots {
  position: fixed;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background: rgba(20,18,16,0.82);
  backdrop-filter: blur(10px);
  padding: 4px 10px 4px 14px;
  border-radius: 999px;
  display: flex;
  gap: 2px;
  align-items: center;
  box-shadow: 0 8px 24px -8px rgba(0,0,0,0.3);
}
.nav-dot {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-dot::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.45);
  transition: all 0.2s ease;
}
.nav-dot[data-active="true"]::before {
  background: #E03018;
  width: 22px;
  border-radius: 999px;
}
.nav-label {
  color: rgba(255,255,255,0.85);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  margin-right: 6px;
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .slide { padding: 24px 16px 40px; }
  .slide-header { gap: 8px; }
  .services { grid-template-columns: 1fr; gap: 0; }
  .contacts-footer {
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
    margin-top: clamp(24px, 4vw, 32px);
    padding-top: 14px;
  }
  .contact-block { padding: 0; gap: 2px; min-height: 0; }
  .contact-block:first-child { grid-column: 1 / -1; }
  .contact-label { font-size: 8.5px; letter-spacing: 0.1em; }
  .contact-value { font-size: 13px; }
  .contact-author { font-size: 15px; }
  .contact-block:nth-child(4) .contact-value { font-size: 11px; word-break: break-all; }
}

@media (max-width: 340px) {
  .cards-grid { grid-template-columns: 1fr; }
  .contacts-footer { grid-template-columns: 1fr; }
  .contact-block:first-child { grid-column: auto; }
}

@media (hover: none) and (pointer: coarse) {
  .mono-link:hover, .contact-link:hover { color: inherit; opacity: 1; }
}
`;
