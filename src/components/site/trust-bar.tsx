"use client";

import { useLang } from "@/lib/use-lang";

export function TrustBar() {
  const { t } = useLang();

  // Pull partner names from the i18n dictionary so all copy lives in one place.
  // (Ref: code review finding #7 — partners were hard-coded in the component.)
  const partners = [
    t.trustPartner1,
    t.trustPartner2,
    t.trustPartner3,
    t.trustPartner4,
    t.trustPartner5,
    t.trustPartner6,
    t.trustPartner7,
    t.trustPartner8,
  ];

  // Duplicate for seamless marquee loop
  const looped = [...partners, ...partners];

  return (
    <section
      className="relative py-12 sm:py-16 border-b border-border/60 bg-background"
      aria-label={t.trustTitle}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground tracking-widest uppercase">
            {t.trustTitle}
          </p>
          <p className="mt-1 text-sm text-muted-foreground/80">
            {t.trustSubtitle}
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Edge fade masks */}
        <div
          className="absolute inset-y-0 left-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
        />

        {/* Marquee — pauses on hover for readability / a11y */}
        <ul
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          role="list"
        >
          {looped.map((name, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-8 sm:px-10 shrink-0"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand/60" aria-hidden="true" />
              <span className="text-base sm:text-lg font-semibold text-foreground/70 whitespace-nowrap">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
