import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL;

const services = [
  { num: '01', title: 'Коммерческие кампании', sub: 'Commercial campaigns' },
  { num: '02', title: 'Лукбуки и Editorial', sub: 'Lookbooks & Editorial' },
  { num: '03', title: 'AI-персонажи и аватары', sub: 'AI characters & avatars' },
  { num: '04', title: 'Предметная съёмка', sub: 'Product photography' },
  { num: '05', title: 'AI-видео и Micro-motion', sub: 'AI video & micro-motion' },
  { num: '06', title: 'Концепты и визуал. системы', sub: 'Concept & visual systems' },
  { num: '07', title: 'Стилизация под референс', sub: 'Reference stylization' },
  { num: '08', title: 'Контент для соцсетей', sub: 'Social media content' }
];

const brandCampaigns = [
  { img: 'image2.jpeg', title: 'INSPIRO — BOTANICAL LAB', sub: 'Продуктовый лайфстайл · sound design', aspect: 'aspect-[4/5]' },
  { img: 'image3.jpeg', title: 'STAYA — CONNECTION YOU CAN TRUST', sub: 'Продуктовая съёмка · аксессуары · sound design', aspect: 'aspect-[3/2]' },
  { img: 'image4.jpeg', title: 'OPU — NATURAL TEXTURES', sub: 'Идея · AI-модель · продукт', aspect: 'aspect-[4/5]' },
  { img: 'image5.jpeg', title: 'OPU — NEW PRODUCTS', sub: 'Кампейн · sound design', aspect: 'aspect-[1/1]' },
  { img: 'image6.png', title: 'OPU — ATMOSPHERE', sub: 'Атмосфера · продукт', aspect: 'aspect-[3/4]' },
  { img: 'image7.png', title: 'STAYA — MADE FOR DOGS', sub: 'Идея · Кампейн · AI-персонажи', aspect: 'aspect-[16/9]' },
  { img: 'image8.png', title: 'INSPIRO — BOTANICAL LAB', sub: 'Идея · Кампэйн', aspect: 'aspect-[4/5]' },
];

const lookbooks = [
  { img: 'image10.png', title: 'CAPSULE — THE ASYMMETRIC ENSEMBLE', sub: 'AI-лукбук · капсула', aspect: 'aspect-[3/4]' },
  { img: 'image11.png', title: 'JEWELLERY — GOLD & PERIDOT SET', sub: 'Ювелирный лукбук · AI-модель · 1:1 точность', aspect: 'aspect-[4/5]' },
  { img: 'image13.png', title: 'EDITORIAL — OLIVE DUO', sub: 'AI-лукбук · AI-модели', aspect: 'aspect-[4/5]' },
  { img: 'image12.jpeg', title: 'JEWELLERY — GECKO DETAIL', sub: 'Предметная съемка · детальный план', aspect: 'aspect-[1/1]' },
  { img: 'image9.jpeg', title: 'EDITORIAL', sub: 'Дополнительные работы', aspect: 'aspect-[4/5]' },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageCard({ item }: { item: any }) {
  return (
    <div className={`group relative overflow-hidden bg-zinc-900 ${item.aspect} w-full`}>
      <motion.img 
        src={`${BASE_URL}${item.img}`} 
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">{item.title}</h3>
        <p className="font-mono text-xs text-white/70 uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">{item.sub}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-white selection:text-black">
      {/* Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={`${BASE_URL}image1.png`} alt="Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
        </motion.div>

        <div className="relative z-10 flex justify-between items-start pt-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
            Portfolio MMXXVI
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 text-right">
            @ATELIER.DE.KIKI<br/>@KIKIKI_ME<br/>MOSCOW
          </motion.div>
        </div>

        <div className="relative z-10 pb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-white/60 mb-6 uppercase"
          >
            Visual language of a brand
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-5xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight uppercase"
          >
            Kristina<br/>Ermilova
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="mt-12">
            <span className="font-mono text-xs tracking-[0.2em] border border-white/20 px-4 py-2 rounded-full uppercase">AI Visual Creator</span>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl mb-16 italic text-white/80">Expertise & Services</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {services.map((srv, idx) => (
              <FadeIn key={srv.num} delay={idx * 0.1} className="group border-b border-white/10 pb-6 flex items-start gap-6">
                <span className="font-mono text-sm text-white/40 mt-1">{srv.num}</span>
                <div>
                  <h3 className="font-sans text-lg md:text-xl font-medium mb-1 group-hover:text-white/80 transition-colors">{srv.title}</h3>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">{srv.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Works: Brand Campaigns */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-tight">Brand<br/><span className="italic text-white/60">Campaigns</span></h2>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest max-w-xs">Hyper-real product photography & atmospheric campaigns powered by AI</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="flex flex-col gap-6 md:gap-12 mt-12 md:mt-24">
              {brandCampaigns.filter((_, i) => i % 2 === 0).map((item, i) => (
                <FadeIn key={i}>
                  <ImageCard item={item} />
                </FadeIn>
              ))}
            </div>
            <div className="flex flex-col gap-6 md:gap-12">
              {brandCampaigns.filter((_, i) => i % 2 !== 0).map((item, i) => (
                <FadeIn key={i} delay={0.2}>
                  <ImageCard item={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works: Lookbooks */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-tight">Lookbooks<br/>& <span className="italic text-white/60">Portraits</span></h2>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest max-w-xs">Virtual casting, styling & high-fashion editorial simulation</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <FadeIn>
                <ImageCard item={lookbooks[0]} />
              </FadeIn>
            </div>
            <div className="flex flex-col gap-6 md:gap-8 mt-8 md:mt-32">
              <FadeIn>
                <ImageCard item={lookbooks[1]} />
              </FadeIn>
              <FadeIn>
                <ImageCard item={lookbooks[3]} />
              </FadeIn>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
            <FadeIn>
              <ImageCard item={lookbooks[2]} />
            </FadeIn>
            <FadeIn>
              <ImageCard item={lookbooks[4]} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 md:py-48 px-6 md:px-12 border-t border-white/10 bg-zinc-950 text-center flex flex-col items-center">
        <FadeIn>
          <h2 className="font-serif text-5xl md:text-8xl mb-12 uppercase tracking-tighter">Get in touch</h2>
        </FadeIn>
        
        <FadeIn delay={0.2} className="flex flex-col gap-6 items-center">
          <a href="mailto:palokris@gmail.com" className="font-mono text-sm md:text-base hover:text-white/60 transition-colors uppercase tracking-[0.2em] border-b border-white/20 pb-2">
            palokris@gmail.com
          </a>
          
          <div className="flex gap-8 mt-8">
            <a href="https://t.me/Kikiki_me" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
              Telegram
            </a>
            <a href="https://instagram.com/atelier.de.kiki" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-32 text-white/20 font-mono text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} Kristina Ermilova. All rights reserved.
        </FadeIn>
      </section>
    </div>
  );
}
