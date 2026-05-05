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

export default function Home() {
  return (
    <main className="portfolio-root" data-testid="portfolio-page">
      <style>{`
        .portfolio-root {
          background: #F4F1EB;
          min-height: 100vh;
          padding: 24px 16px;
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

        @media (max-width: 640px) {
          .portfolio-root { padding: 12px 8px; gap: 16px; }
          .slide-frame { border-radius: 1px;
            box-shadow: 0 12px 24px -10px rgba(20,18,16,0.18),
                        0 6px 14px -8px rgba(20,18,16,0.14); }
        }

        @media (max-width: 380px) {
          .portfolio-root { padding: 8px 4px; gap: 12px; }
        }
      `}</style>

      <section className="slide-frame" data-testid="slide-1">
        <img
          className="slide-bg"
          src={`${BASE}slide-1.png`}
          alt="Slide 1"
          draggable={false}
          data-testid="img-slide-1"
        />
        {SLIDE_1_LINKS.map((l, i) => (
          <a
            key={`s1-link-${i}`}
            className="link-overlay"
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            title={l.label}
            style={styleFor(l)}
            data-testid={`link-s1-${i}`}
          />
        ))}
      </section>

      <section className="slide-frame" data-testid="slide-2">
        <img
          className="slide-bg"
          src={`${BASE}slide-2.png`}
          alt="Slide 2"
          draggable={false}
          data-testid="img-slide-2"
        />
        {SLIDE_2_VIDEOS.map((v, i) => (
          <video
            key={`video-${i}`}
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
      </section>

      <section className="slide-frame" data-testid="slide-3">
        <img
          className="slide-bg"
          src={`${BASE}slide-3.png`}
          alt="Slide 3"
          draggable={false}
          data-testid="img-slide-3"
        />
        {SLIDE_3_LINKS.map((l, i) => (
          <a
            key={`s3-link-${i}`}
            className="link-overlay"
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            title={l.label}
            style={styleFor(l)}
            data-testid={`link-s3-${i}`}
          />
        ))}
      </section>
    </main>
  );
}
