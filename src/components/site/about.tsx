"use client";

import { useLang } from "@/lib/use-lang";
import { HardHat, Coins, Wrench, Utensils } from "lucide-react";

export function About() {
  const { t } = useLang();

  const points = [
    {
      icon: HardHat,
      title: t.aboutPoint1Title,
      text: t.aboutPoint1Text,
    },
    {
      icon: Coins,
      title: t.aboutPoint2Title,
      text: t.aboutPoint2Text,
    },
    {
      icon: Wrench,
      title: t.aboutPoint3Title,
      text: t.aboutPoint3Text,
    },
    {
      icon: Utensils,
      title: t.aboutPoint4Title,
      text: t.aboutPoint4Text,
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — title */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand-soft text-xs font-semibold text-brand tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {t.aboutEyebrow}
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground">
              {t.aboutTitle}
            </h2>

            {/* decorative divider */}
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-brand to-transparent" />
              <span className="text-brand text-xs tracking-widest">—</span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-[1.85]">
              {t.aboutLead}
            </p>
          </div>

          {/* Right — point cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
            {points.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl border border-border bg-card hover:border-brand/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-6 right-6 text-4xl font-mono font-bold text-foreground/5 group-hover:text-brand/15 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-[1.85]">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
