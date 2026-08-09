"use client";

import { useLang } from "@/lib/use-lang";
import { Button } from "@/components/ui/button";
import {
  Coins,
  Armchair,
  Compass,
  HeartHandshake,
  ArrowRight,
  Mail,
} from "lucide-react";

export function Investor() {
  const { t } = useLang();

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const points = [
    {
      icon: Coins,
      label: "I",
      title: t.investorPoint1Title,
      text: t.investorPoint1Text,
    },
    {
      icon: Armchair,
      label: "II",
      title: t.investorPoint2Title,
      text: t.investorPoint2Text,
    },
    {
      icon: Compass,
      label: "III",
      title: t.investorPoint3Title,
      text: t.investorPoint3Text,
    },
    {
      icon: HeartHandshake,
      label: "IV",
      title: t.investorPoint4Title,
      text: t.investorPoint4Text,
    },
  ];

  return (
    <section
      id="investor"
      className="relative py-20 sm:py-28 bg-background scroll-mt-16 overflow-hidden"
    >
      {/* Soft warm radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, oklch(0.66 0.21 41 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — centered, editorial */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand-soft text-xs font-semibold text-brand tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {t.investorEyebrow}
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {t.investorTitle}
          </h2>

          {/* decorative divider */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <span className="text-brand text-lg">·</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.investorLead}
          </p>
        </div>

        {/* Reason cards — single column, editorial layout for reading rhythm */}
        <div className="mt-16 max-w-4xl mx-auto space-y-5">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="group relative grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-7 p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-brand/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Left — icon + roman numeral */}
                <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <div className="text-xs font-mono tracking-[0.2em] text-foreground/35">
                    {p.label}
                  </div>
                </div>

                {/* Right — text */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] sm:text-base text-muted-foreground leading-[1.85]">
                    {p.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA — quiet, with email */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="relative inline-block">
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm"
            >
              <a
                href="#order"
                onClick={(e) => onNavClick(e, "#order")}
                className="inline-flex items-center gap-2"
              >
                {t.investorCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:contact@hmbot.net"
              className="hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              contact@hmbot.net
            </a>
            <span className="text-foreground/30 mx-1">·</span>
            <span className="text-foreground/60">{t.domain}</span>
          </div>

          {/* poetic line */}
          <p className="mt-8 text-xs sm:text-sm text-foreground/40 italic font-light leading-relaxed">
            {t.aboutPoint4Text}
          </p>
        </div>
      </div>
    </section>
  );
}
