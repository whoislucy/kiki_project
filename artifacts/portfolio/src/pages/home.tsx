import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;
const SLIDE_W = 794;
const SLIDE_H = 1123;

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

type VideoOverlay = {
  src: string;
  poster: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const SLIDE_2_VIDEOS: VideoOverlay[] = [
  { src: "media1.mp4", poster: "image6.png", x: 269, y: 187, w: 123, h: 219 },
  { src: "media2.mp4", poster: "image7.png", x: 516, y: 231, w: 221, h: 393 },
  { src: "media3.mp4", poster: "image8.png", x: 333, y: 810, w: 140, h: 229 },
];

type LinkOverlay = {
  href: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const SLIDE_1_LINKS: LinkOverlay[] = [
  { href: "https://instagram.com/atelier.de.kiki", label: "Instagram @atelier.de.kiki", x: 54, y: 1063, w: 130, h: 22 },
  { href: "https://t.me/Kikiki_me", label: "Telegram @Kikiki_me", x: 668, y: 1063, w: 86, h: 22 },
];

const SLIDE_3_LINKS: LinkOverlay[] = [
  { href: "https://t.me/Kikiki_me", label: "Telegram @Kikiki_me", x: 315, y: 1066, w: 140, h: 24 },
  { href: "https://instagram.com/atelier.de.kiki", label: "Instagram atelier.de.kiki", x: 458, y: 1066, w: 140, h: 24 },
  { href: "mailto:palokris@gmail.com", label: "Email palokris@gmail.com", x: 619, y: 1066, w: 145, h: 24 },
];

function styleFor(o: { x: number; y: number; w: number; h: number }) {
  return {
    left: pct(o.x, SLIDE_W),
    top: pct(o.y, SLIDE_H),
    width: pct(o.w, SLIDE_W),
    height: pct(o.h, SLIDE_H),
  };
}

const SLIDES = [
  { num: 1, src: "slide-1.png", videos: [] as VideoOverlay[], links: SLIDE_1_LINKS },
  { num: 2, src: "slide-2.png", videos: SLIDE_2_VIDEOS, links: [] as LinkOverlay[] },
  { num: 3, src: "slide-3.png", videos: [] as VideoOverlay[], links: SLIDE_3_LINKS },
];

export default function Home() {
  const [zoomedSlide, setZoomedSlide] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (zoomedSlide !== null) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setZoomedSlide(null);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [zoomedSlide]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveSlide(i + 1);
            }
          });
        },
        { threshold: [0.5] }
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
      <style>{`
        :root { color-scheme: light; }
        html, body { margin: 0; padding: 0; background: #F4F1EB; }
        .portfolio-root {
          background: #F4F1EB;
          min-height: 100vh;
          padding: 24px 16px 96px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          font-family: 'Unbounded', 'Inter', system-ui, sans-serif;
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
          display: none;
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 4;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 50%;
          background: rgba(20,18,16,0.72);
          color: #fff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          -webkit-tap-highlight-color: transparent;
          padding: 0;
          font-size: 18px;
        }
        .zoom-btn:active { transform: scale(0.94); }
        .nav-dots {
          display: none;
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          background: rgba(20,18,16,0.78);
          backdrop-filter: blur(10px);
          padding: 8px 14px;
          border-radius: 999px;
          gap: 8px;
          align-items: center;
        }
        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.45);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-dot[data-active="true"] {
          background: #E03018;
          width: 24px;
          border-radius: 999px;
        }
        .nav-label {
          color: rgba(255,255,255,0.7);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          margin-right: 4px;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(20,18,16,0.94);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          touch-action: pinch-zoom pan-x pan-y;
        }
        .lightbox-inner {
          position: relative;
          width: 100%;
          max-width: 1400px;
          padding: 56px 0 24px;
        }
        .lightbox-img {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
        }
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
          font-size: 22px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          -webkit-tap-highlight-color: transparent;
        }
        .lightbox-close:active { transform: scale(0.94); }
        .lightbox-hint {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 101;
          color: rgba(255,255,255,0.85);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          background: rgba(20,18,16,0.6);
          padding: 8px 12px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 768px) {
          .zoom-btn { display: flex; }
          .nav-dots { display: flex; }
          .portfolio-root { padding-bottom: 80px; }
        }

        @media (max-width: 640px) {
          .portfolio-root { padding: 12px 8px 80px; gap: 16px; }
          .slide-frame { border-radius: 1px;
            box-shadow: 0 12px 24px -10px rgba(20,18,16,0.18),
                        0 6px 14px -8px rgba(20,18,16,0.14); }
          .link-overlay { transform: scale(1.4); transform-origin: center; }
        }

        @media (max-width: 380px) {
          .portfolio-root { padding: 8px 4px 80px; gap: 12px; }
        }

        @media (hover: none) and (pointer: coarse) {
          .link-overlay:hover { background: transparent; }
        }
      `}</style>

      {SLIDES.map((slide, idx) => (
        <section
          key={`slide-${slide.num}`}
          ref={(el) => { slideRefs.current[idx] = el; }}
          className="slide-frame"
          data-testid={`slide-${slide.num}`}
        >
          <img
            className="slide-bg"
            src={`${BASE}${slide.src}`}
            alt={`Slide ${slide.num}`}
            draggable={false}
            data-testid={`img-slide-${slide.num}`}
          />
          {slide.videos.map((v, i) => (
            <video
              key={`s${slide.num}-video-${i}`}
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
              key={`s${slide.num}-link-${i}`}
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
            onClick={() => setZoomedSlide(slide.num)}
            aria-label={`Открыть слайд ${slide.num} на весь экран`}
            data-testid={`zoom-btn-${slide.num}`}
          >
            ⤢
          </button>
        </section>
      ))}

      <nav className="nav-dots" aria-label="Навигация по слайдам">
        <span className="nav-label">{String(activeSlide).padStart(2, "0")} / 03</span>
        {SLIDES.map((slide) => (
          <button
            key={`dot-${slide.num}`}
            type="button"
            className="nav-dot"
            data-active={activeSlide === slide.num}
            onClick={() => scrollToSlide(slide.num - 1)}
            aria-label={`Перейти на слайд ${slide.num}`}
            data-testid={`nav-dot-${slide.num}`}
          />
        ))}
      </nav>

      {zoomedSlide !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Слайд ${zoomedSlide} увеличенный`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setZoomedSlide(null);
          }}
          data-testid="lightbox"
        >
          <div className="lightbox-hint">PINCH TO ZOOM · TAP OUTSIDE TO CLOSE</div>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setZoomedSlide(null)}
            aria-label="Закрыть"
            data-testid="lightbox-close"
          >
            ×
          </button>
          <div className="lightbox-inner">
            <img
              className="lightbox-img"
              src={`${BASE}slide-${zoomedSlide}.png`}
              alt={`Slide ${zoomedSlide} fullscreen`}
              data-testid={`lightbox-img-${zoomedSlide}`}
            />
          </div>
        </div>
      )}
    </main>
  );
}
