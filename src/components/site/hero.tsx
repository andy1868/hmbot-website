"use client";

import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/use-lang";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLang();

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stats = [
    { value: t.heroStat1, label: t.heroStat1Label },
    { value: t.heroStat2, label: t.heroStat2Label },
    { value: t.heroStat3, label: t.heroStat3Label },
    { value: t.heroStat4, label: t.heroStat4Label },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-foreground text-background pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-dark mask-radial-faded opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 0%, oklch(0.66 0.21 41 / 0.25) 0%, transparent 60%), radial-gradient(40% 40% at 20% 100%, oklch(0.62 0.16 150 / 0.18) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.99 0.005 60))",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-background/15 bg-background/5 backdrop-blur-sm text-xs font-medium animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            <span className="text-background/80">{t.heroEyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up">
            <span className="block">{t.heroTitle1}</span>
            <span className="block mt-2 text-gradient-brand">
              {t.heroTitleHighlight}
            </span>
            {t.heroTitle2 && <span className="block mt-2">{t.heroTitle2}</span>}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-2xl text-base sm:text-lg text-background/70 leading-relaxed animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {t.heroSubtitle}
          </p>

          {/* Quiet poetic line */}
          <p
            className="mt-5 text-sm sm:text-base text-background/45 italic font-light leading-relaxed animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            {t.heroQuote}
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-glow"
            >
              <a
                href="#products"
                onClick={(e) => onNavClick(e, "#products")}
                className="inline-flex items-center gap-2"
              >
                {t.heroCtaPrimary}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/20 bg-background/5 text-background hover:bg-background/10 hover:text-background backdrop-blur-sm"
            >
              <a
                href="#order"
                onClick={(e) => onNavClick(e, "#order")}
                className="inline-flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {t.heroCtaSecondary}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div
            className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-background/10 bg-background/5 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-foreground/95 px-5 py-6 sm:px-6 sm:py-7 flex flex-col gap-1"
              >
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient-brand">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-background/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        onClick={(e) => onNavClick(e, "#about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-background/40 hover:text-background/70 transition-colors"
        aria-label={t.scrollDown}
      >
        <span className="text-[10px] tracking-widest uppercase">
          {t.scrollDown}
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
