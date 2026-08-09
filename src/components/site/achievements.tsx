"use client";

import { useLang } from "@/lib/use-lang";
import { Award, Building2, FlaskConical, Truck } from "lucide-react";

export function Achievements() {
  const { t } = useLang();

  const stats = [
    {
      value: t.achievement1Value,
      label: t.achievement1Label,
      desc: t.achievement1Desc,
      accent: "text-brand",
    },
    {
      value: t.achievement2Value,
      label: t.achievement2Label,
      desc: t.achievement2Desc,
      accent: "text-growth",
    },
    {
      value: t.achievement3Value,
      label: t.achievement3Label,
      desc: t.achievement3Desc,
      accent: "text-amber-500",
    },
    {
      value: t.achievement4Value,
      label: t.achievement4Label,
      desc: t.achievement4Desc,
      accent: "text-rose-500",
    },
  ];

  const awards = [
    {
      icon: Award,
      title: t.award1,
      desc: t.award1Desc,
    },
    {
      icon: Building2,
      title: t.award2,
      desc: t.award2Desc,
    },
    {
      icon: FlaskConical,
      title: t.award3,
      desc: t.award3Desc,
    },
    {
      icon: Truck,
      title: t.award4,
      desc: t.award4Desc,
    },
  ];

  return (
    <section
      id="achievements"
      className="relative py-20 sm:py-28 bg-foreground text-background scroll-mt-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-dark mask-radial-faded opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 50% at 80% 0%, oklch(0.66 0.21 41 / 0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-background/15 bg-background/5 text-xs font-semibold text-brand tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {t.achievementsEyebrow}
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.achievementsTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-background/70 leading-relaxed">
            {t.achievementsSubtitle}
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-background/10 bg-background/5">
          {stats.map((s, i) => (
            <div key={i} className="bg-foreground/95 px-5 py-7 sm:px-6 sm:py-8">
              <div className={`text-4xl sm:text-5xl font-bold tracking-tight ${s.accent}`}>
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-background/90">
                {s.label}
              </div>
              <div className="mt-2 text-xs text-background/55 leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="mt-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-background/90 mb-6">
            {t.awardsTitle}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {awards.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 p-5 sm:p-6 rounded-xl border border-background/10 bg-background/5 hover:bg-background/10 transition-colors"
                >
                  <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-background">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-sm text-background/65 leading-relaxed">
                      {a.desc}
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
