"use client";

import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { About } from "@/components/site/about";
import { Products } from "@/components/site/products";
import { Achievements } from "@/components/site/achievements";
import { Investor } from "@/components/site/investor";
import { OrderForm } from "@/components/site/order-form";
import { SiteFooter } from "@/components/site/footer";
import { HydrationGate } from "@/components/site/hydration-gate";

export default function Home() {
  return (
    <HydrationGate>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Skip-to-content link — visible on focus only.
            Ref: code review finding #8 (no skip link). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-brand focus:text-brand-foreground focus:shadow-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main-content" className="flex-1">
          <Hero />
          <TrustBar />
          <About />
          <Products />
          <Achievements />
          <Investor />
          <OrderForm />
        </main>
        <SiteFooter />
      </div>
    </HydrationGate>
  );
}
