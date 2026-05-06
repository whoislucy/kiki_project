import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

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
  ratio: string;
  tag: string;
  title: string;
  subtitle: string;
  videoBadge?: boolean;
};

const SLIDE_2_CARDS: WorkCard[] = [
  { id: "d1", image: "dimg-2-1.jpeg", ratio: "338 / 451", tag: "BRAND CAMPAIGN · OPU", title: "BODY RITUAL", subtitle: "Кампейн · AI-персонаж · ритуал" },
  { id: "d2", image: "dimg-2-2.png",  ratio: "338 / 451", tag: "BRAND CAMPAIGN · STAYA", title: "MADE FOR DOGS", subtitle: "Кампейн · студийная съёмка" },
  { id: "d3", image: "dimg-2-3.png",  ratio: "164 / 218", tag: "BRAND CAMPAIGN · STAYA", title: "STAYA — MADE FOR DOGS", subtitle: "Кампейн · AI-персонажи · city", videoBadge: true },
  { id: "d4", image: "dimg-2-4.jpeg", ratio: "222 / 125", tag: "BRAND CAMPAIGN · OPU", title: "OPU — BODY RITUAL", subtitle: "Кампейн · AI-персонаж · sound design", videoBadge: true },
  { id: "d5", image: "dimg-2-5.png",  ratio: "222 / 125", tag: "BRAND CAMPAIGN · INSPIRO", title: "INSPIRO — BOTANICAL LAB", subtitle: "Б/а напитки · ботаническая лаборатория", videoBadge: true },
  { id: "d6", image: "dimg-2-6.png",  ratio: "222 / 296", tag: "BRAND CAMPAIGN · STAYA", title: "MADE FOR DOGS", subtitle: "Продуктовая съёмка" },
  { id: "d7", image: "dimg-2-7.png",  ratio: "222 / 296", tag: "BRAND CAMPAIGN · INSPIRO", title: "BOTANICAL INFUSION", subtitle: "Концепт-съёмка" },
  { id: "d8", image: "dimg-2-8.png",  ratio: "222 / 296", tag: "BRAND CAMPAIGN · INSPIRO", title: "PEACH SPRITZ", subtitle: "Продуктовая съёмка" },
];

const SLIDE_3_CARDS: WorkCard[] = [
  { id: "e1", image: "dimg-3-1.png", ratio: "338 / 451", tag: "LOOKBOOK · CAPSULE", title: "THE ASYMMETRIC ENSEMBLE", subtitle: "AI-лукбук · AI-модели · капсула" },
  { id: "e2", image: "dimg-3-2.png", ratio: "338 / 451", tag: "LOOKBOOK · JEWELLERY", title: "GOLD & PERIDOT SET", subtitle: "Ювелирный лукбук · 1:1 точность" },
  { id: "e3", image: "dimg-3-3.png", ratio: "338 / 451", tag: "LOOKBOOK · DETAIL", title: "FLAT LAY STUDY", subtitle: "Предметная детализация · фактуры" },
  { id: "e4", image: "dimg-3-4.png", ratio: "338 / 451", tag: "LOOKBOOK · EDITORIAL", title: "OLIVE DUO", subtitle: "AI-лукбук · стиль" },
];

type ContactLink = { label: string; value: string; href: string; accent?: boolean };

const CONTACTS: ContactLink[] = [
  { label: "Telegram", value: "@Kikiki_me", href: "https://t.me/Kikiki_me", accent: true },
  { label: "Instagram", value: "atelier.de.kiki", href: "https://instagram.com/atelier.de.kiki", accent: true },
  { label: "Email", value: "palokris@gmail.com", href: "mailto:palokris@gmail.com" },
];

function useSwipe(onPrev: () => void, onNext: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let startX = 0, startY = 0, tracking = false;
    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) { tracking = false; return; }
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; tracking = true;
    };
    const onEnd = (e: TouchEvent) => {
      if (!tracking) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX, dy = t.clientY - startY;
      tracking = false;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onNext(); else onPrev();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [onPrev, onNext, enabled]);
}

function Card({ card, onOpen }: { card: WorkCard; onOpen: (c: WorkCard) => void }) {
  return (
    <article className="card" data-testid={`card-${card.id}`}>
      <div className="card-media" style={{ ["--natural-ratio" as string]: card.ratio }}>
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
        {card.videoBadge && <span className="video-badge" aria-hidden="true">▶ VIDEO</span>}
      </div>
      <p className="card-tag">{card.tag}</p>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-sub">{card.subtitle}</p>
    </article>
  );
}

const ALL_CARDS: WorkCard[] = [...SLIDE_2_CARDS, ...SLIDE_3_CARDS];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const lightboxCard = lightboxIndex !== null ? ALL_CARDS[lightboxIndex] : null;
  const lightboxOpen = lightboxIndex !== null;

  const openLightbox = (card: WorkCard) => {
    const idx = ALL_CARDS.findIndex((c) => c.id === card.id);
    if (idx < 0) return;
    openerRef.current = (document.activeElement as HTMLElement) ?? null;
    setLightboxIndex(idx);
  };

  const lightboxPrev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + ALL_CARDS.length) % ALL_CARDS.length));
  const lightboxNext = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % ALL_CARDS.length));

  useSwipe(lightboxPrev, lightboxNext, lightboxOpen);

  useEffect(() => {
    if (!lightboxOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => lightboxCloseRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightboxIndex(null); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); lightboxPrev(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); lightboxNext(); return; }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

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
  }, []);

  const scrollToSlide = (idx: number) => {
    const el = slideRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

        <div className="big-tagline">
          <h2 className="big-tagline-1">ВИЗУАЛЬНЫЙ</h2>
          <h2 className="big-tagline-2">ЯЗЫК БРЕНДА</h2>
        </div>

        <footer className="slide-1-footer">
          <a className="mono-link" href="https://instagram.com/atelier.de.kiki" target="_blank" rel="noopener noreferrer">@ATELIER.DE.KIKI</a>
          <span className="footer-asterisk">✱</span>
          <a className="mono-link" href="https://t.me/Kikiki_me" target="_blank" rel="noopener noreferrer">@KIKIKI_ME</a>
        </footer>
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
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIndex(null); }}
          data-testid="lightbox"
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Закрыть"
            data-testid="lightbox-close"
          >×</button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Предыдущая работа"
            data-testid="lightbox-prev"
          >‹</button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Следующая работа"
            data-testid="lightbox-next"
          >›</button>
          <span className="lightbox-counter" data-testid="lightbox-counter">
            {String(lightboxIndex! + 1).padStart(2, "0")} / {String(ALL_CARDS.length).padStart(2, "0")}
          </span>
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

const BG = "#0E0D0C";
const FG = "#F0EDE8";
const MUTED = "#6A6460";
const ACCENT = "#E03018";
const BORDER = "rgba(240,237,232,0.10)";

const styles = `
:root { color-scheme: dark; }
html, body { margin: 0; padding: 0; background: ${BG}; }

.portfolio-root {
  background: ${BG};
  min-height: 100vh;
  font-family: 'Onest', 'Inter', system-ui, sans-serif;
  color: ${FG};
  padding-bottom: 80px;
  overflow-x: clip;
}

.slide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px clamp(16px, 4vw, 56px) 56px;
  position: relative;
  border-bottom: 1px solid ${BORDER};
}

/* HEADER */
.slide-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #2E2B27;
  margin-bottom: clamp(28px, 5vw, 56px);
}
.header-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.4vw, 11px);
  letter-spacing: 0.12em;
  color: ${MUTED};
  text-transform: uppercase;
}
.header-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.4vw, 11px);
  letter-spacing: 0.12em;
  color: ${MUTED};
  text-align: right;
}
.header-asterisk { color: ${ACCENT}; font-size: 14px; }

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
.hero-title { color: ${FG}; }
.hero-subtitle { color: ${ACCENT}; }

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
  border-bottom: 1px solid #2E2B27;
}
.service-name {
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  font-size: clamp(11px, 2.6vw, 14px);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${FG};
}
.service-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.2vw, 11px);
  color: ${ACCENT};
  letter-spacing: 0.1em;
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
.big-tagline-1 { color: ${FG}; }
.big-tagline-2 { color: ${ACCENT}; }

/* SLIDE 1 footer */
.slide-1-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #2E2B27;
}
.mono-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(9px, 2.4vw, 11px);
  letter-spacing: 0.14em;
  color: ${MUTED};
  text-decoration: none;
  transition: color 0.15s ease;
  -webkit-tap-highlight-color: rgba(224, 48, 24, 0.20);
  display: inline-block;
  padding: 12px 4px;
  margin: -12px -4px;
}
.mono-link:hover, .mono-link:focus-visible { color: ${ACCENT}; outline: none; }
.slide-1-footer .mono-link:last-child { text-align: right; }
.footer-asterisk { color: ${ACCENT}; font-size: 14px; text-align: center; }

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
  background: #1A1816;
  overflow: hidden;
  border-radius: 2px;
  aspect-ratio: 3 / 4 !important;
}
@media (min-width: 1024px) {
  .card-media { aspect-ratio: var(--natural-ratio, 3 / 4) !important; }
}
.card-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

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
.card-img-btn:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: -2px; }
.card-img-btn .card-img { transition: transform 0.4s ease; }
.card-img-btn:hover .card-img { transform: scale(1.04); }
.card-zoom-hint {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.16);
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(-3px);
  transition: opacity 0.18s ease, transform 0.18s ease, background 0.15s ease;
  pointer-events: none;
  backdrop-filter: blur(6px);
}
.card-img-btn:hover .card-zoom-hint,
.card-img-btn:focus-visible .card-zoom-hint {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.card-zoom-hint:hover { background: ${ACCENT}; }
@media (hover: none) and (pointer: coarse) {
  .card-zoom-hint { opacity: 1; transform: translateY(0); }
}

.video-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${ACCENT};
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
  color: ${ACCENT};
  text-transform: uppercase;
}
.card-title {
  margin: 0;
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: clamp(14px, 2.6vw, 16px);
  letter-spacing: -0.01em;
  color: ${FG};
  line-height: 1.2;
}
.card-sub {
  margin: 0;
  font-family: 'Onest', sans-serif;
  font-size: clamp(11px, 2.4vw, 13px);
  color: ${MUTED};
  line-height: 1.4;
}

/* CONTACTS footer */
.contacts-footer {
  margin-top: clamp(40px, 6vw, 64px);
  padding-top: 24px;
  border-top: 1px solid #2E2B27;
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
  color: ${MUTED};
  text-transform: uppercase;
}
.contact-value {
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: clamp(15px, 3.4vw, 18px);
  color: ${FG};
  word-break: break-word;
}
.contact-accent .contact-value { color: ${ACCENT}; }
.contact-link { transition: opacity 0.15s ease; }
.contact-link:hover, .contact-link:focus-visible { opacity: 0.7; outline: none; }

/* LIGHTBOX */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.96);
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
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
  color: ${FG};
  text-align: left;
}
.lightbox-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: ${ACCENT};
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
  color: rgba(240,237,232,0.55);
}
.lightbox-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 101;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.92);
  color: #151210;
  cursor: pointer;
  font-size: 32px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  -webkit-tap-highlight-color: transparent;
  padding: 0 0 4px 0;
  font-weight: 300;
  transition: background 0.15s ease, transform 0.15s ease;
}
.lightbox-nav:hover { background: #fff; }
.lightbox-nav:active { transform: translateY(-50%) scale(0.94); }
.lightbox-prev { left: 12px; }
.lightbox-next { right: 12px; }
@media (max-width: 480px) {
  .lightbox-nav { width: 40px; height: 40px; font-size: 26px; }
  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
}
.lightbox-counter {
  position: fixed;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
  color: rgba(255,255,255,0.85);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  background: rgba(20,18,16,0.6);
  padding: 6px 12px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

/* NAV PILL */
.nav-dots {
  position: fixed;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background: rgba(240,237,232,0.10);
  backdrop-filter: blur(10px);
  padding: 4px 10px 4px 14px;
  border-radius: 999px;
  display: flex;
  gap: 2px;
  align-items: center;
  box-shadow: 0 8px 24px -8px rgba(0,0,0,0.6);
  border: 1px solid rgba(240,237,232,0.06);
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
  background: rgba(240,237,232,0.40);
  transition: all 0.2s ease;
}
.nav-dot[data-active="true"]::before {
  background: ${ACCENT};
  width: 22px;
  border-radius: 999px;
}
.nav-label {
  color: rgba(240,237,232,0.85);
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
