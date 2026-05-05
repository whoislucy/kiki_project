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

function Card({ card }: { card: WorkCard }) {
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
          <img className="card-img" src={`${BASE}${card.image}`} alt={card.title} loading="lazy" />
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
  const [activeSlide, setActiveSlide] = useState(1);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);

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

        <div className="visual-creator-mark" aria-hidden="true">VISUAL CREATOR · MOSCOW</div>

        <div className="big-tagline">
          <h2 className="big-tagline-1">ВИЗУАЛЬНЫЙ</h2>
          <h2 className="big-tagline-2">ЯЗЫК БРЕНДА</h2>
        </div>

        <footer className="slide-footer slide-1-footer">
          <a className="mono-link" href="https://instagram.com/atelier.de.kiki" target="_blank" rel="noopener noreferrer" data-testid="footer-link-atelier">
            @ATELIER.DE.KIKI
          </a>
          <span className="footer-asterisk">✱</span>
          <a className="mono-link" href="https://t.me/Kikiki_me" target="_blank" rel="noopener noreferrer" data-testid="footer-link-kikiki">
            @KIKIKI_ME
          </a>
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
          {SLIDE_2_CARDS.map((card) => <Card key={card.id} card={card} />)}
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
          {SLIDE_3_CARDS.map((card) => <Card key={card.id} card={card} />)}
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
  .contacts-footer { grid-template-columns: 1fr 1fr; }
  .contact-block:first-child { grid-column: 1 / -1; }
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
