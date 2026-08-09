"use client";

import { useEffect, useState } from "react";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { useLang } from "@/lib/use-lang";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_KEYS = [
  { key: "navAbout", href: "#about" },
  { key: "navProducts", href: "#products" },
  { key: "navAchievements", href: "#achievements" },
  { key: "navInvestor", href: "#investor" },
  { key: "navContact", href: "#contact" },
] as const;

export function SiteHeader() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => onNavClick(e, "#top")}
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="HMbot home"
          >
            <Logo variant="dark" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_KEYS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                className="px-3 py-2 text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
              >
                {t[item.key as keyof typeof t] as string}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-sm font-medium border border-border/60 hover:bg-foreground/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-pressed={lang === "en"}
              aria-label={
                lang === "zh"
                  ? "Switch language to English"
                  : "切换语言为中文"
              }
              title={
                lang === "zh"
                  ? "Switch to English"
                  : "切换到中文"
              }
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.langSwitch}</span>
            </button>

            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm"
            >
              <a
                href="#order"
                onClick={(e) => onNavClick(e, "#order")}
                className="inline-flex items-center gap-1.5"
              >
                {t.navQuote}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border/60 hover:bg-foreground/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={t.menuOpen}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.menuOpen}
        className={cn(
          "md:hidden fixed inset-0 z-50 transition-all duration-300",
          menuOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[80%] max-w-sm bg-background shadow-2xl transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <Logo variant="dark" />
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t.menuClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-1">
            {NAV_KEYS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t[item.key as keyof typeof t] as string}
              </a>
            ))}
            <Button
              asChild
              className="mt-3 bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <a
                href="#order"
                onClick={(e) => onNavClick(e, "#order")}
                className="inline-flex items-center justify-center gap-1.5"
              >
                {t.navQuote}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <button
              onClick={() => {
                toggle();
                setMenuOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium border border-border rounded-lg"
            >
              <Globe className="h-4 w-4" />
              {lang === "zh" ? "Switch to English" : "切换到中文"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
