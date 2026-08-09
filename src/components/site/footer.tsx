"use client";

import { useLang } from "@/lib/use-lang";
import { Logo } from "./logo";
import { Mail, MapPin, Globe, ArrowUp } from "lucide-react";

const NAV_KEYS = [
  { key: "navAbout", href: "#about" },
  { key: "navProducts", href: "#products" },
  { key: "navAchievements", href: "#achievements" },
  { key: "navInvestor", href: "#investor" },
  { key: "navContact", href: "#order" },
] as const;

export function SiteFooter() {
  const { t } = useLang();

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const products = [
    { key: "product1Name", id: "vehicle-collision" },
    { key: "product2Name", id: "structural-monitoring" },
    { key: "product3Name", id: "vision-arm" },
    { key: "product4Name", id: "warehouse-robot" },
  ] as const;

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Decorative top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 60% at 90% 100%, oklch(0.66 0.21 41 / 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-background/65 leading-relaxed max-w-xs">
              {t.footerTagline}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/5 border border-background/10 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              <span className="text-background/80">{t.brandTagline}</span>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-background/50">
              {t.footerProductTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <a
                    href="#products"
                    onClick={(e) => onNavClick(e, "#products")}
                    className="text-sm text-background/75 hover:text-brand transition-colors"
                  >
                    {t[p.key as keyof typeof t] as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-background/50">
              {t.footerNavTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_KEYS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="text-sm text-background/75 hover:text-brand transition-colors"
                  >
                    {t[item.key as keyof typeof t] as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-background/50">
              {t.footerContactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-background/75">
                <MapPin className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                <div>
                  <div className="text-[11px] text-background/50 uppercase tracking-wide">
                    {t.footerAddressLabel}
                  </div>
                  <div>{t.footerAddress}</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/75">
                <Mail className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                <div>
                  <div className="text-[11px] text-background/50 uppercase tracking-wide">
                    {t.footerEmailLabel}
                  </div>
                  <a
                    href="mailto:contact@hmbot.net"
                    className="hover:text-brand transition-colors"
                  >
                    {t.footerEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/75">
                <Globe className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                <div>
                  <div className="text-[11px] text-background/50 uppercase tracking-wide">
                    {t.footerDomainLabel}
                  </div>
                  <div>{t.domain}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-background/55 leading-relaxed">
            <div>{t.footerCopyright}</div>
            <div className="mt-1 text-background/40">{t.footerIcp}</div>
          </div>

          <a
            href="#top"
            onClick={(e) => onNavClick(e, "#top")}
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-background/15 bg-background/5 hover:bg-background/10 text-xs font-medium text-background/80 transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {t.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
