"use client";

import { useLang } from "@/lib/use-lang";
import { useProductSelection } from "@/lib/use-product-selection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Mountain,
  Bot,
  PackageSearch,
  ArrowRight,
  Check,
} from "lucide-react";

export function Products() {
  const { t } = useLang();
  const setProduct = useProductSelection((s) => s.setProduct);
  const goToOrder = useProductSelection((s) => s.goToOrder);

  const handleOrder = (
    productId: string,
    productName: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setProduct(productId, productName);
    goToOrder();
  };

  const products = [
    {
      id: "vehicle-collision",
      name: t.product1Name,
      tag: t.product1Tag,
      short: t.product1Short,
      desc: t.product1Desc,
      specs: [
        { label: t.product1Spec1, sub: null },
        { label: t.product1Spec2, sub: null },
        { label: t.product1Spec3, sub: null },
      ],
      icon: Truck,
      accent: "from-orange-500/20 to-orange-500/5",
    },
    {
      id: "structural-monitoring",
      name: t.product2Name,
      tag: t.product2Tag,
      short: t.product2Short,
      desc: t.product2Desc,
      specs: [
        { label: t.product2Spec1, sub: t.product2Spec1Label },
        { label: t.product2Spec2, sub: t.product2Spec2Label },
        { label: t.product2Spec3, sub: null },
      ],
      icon: Mountain,
      accent: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      id: "vision-arm",
      name: t.product3Name,
      tag: t.product3Tag,
      short: t.product3Short,
      desc: t.product3Desc,
      specs: [
        { label: t.product3Spec1, sub: t.product3Spec1Label },
        { label: t.product3Spec2, sub: t.product3Spec2Label },
        { label: t.product3Spec3, sub: null },
      ],
      icon: Bot,
      accent: "from-amber-500/20 to-amber-500/5",
    },
    {
      id: "warehouse-robot",
      name: t.product4Name,
      tag: t.product4Tag,
      short: t.product4Short,
      desc: t.product4Desc,
      specs: [
        { label: t.product4Spec1, sub: t.product4Spec1Label },
        { label: t.product4Spec2, sub: t.product4Spec2Label },
        { label: t.product4Spec3, sub: null },
      ],
      icon: PackageSearch,
      accent: "from-rose-500/20 to-rose-500/5",
    },
  ];

  return (
    <section
      id="products"
      className="relative py-20 sm:py-28 bg-secondary/30 scroll-mt-16"
    >
      {/* decorative top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand-soft text-xs font-semibold text-brand tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {t.productsEyebrow}
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.productsTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.productsSubtitle}
          </p>
        </div>

        {/* Product grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-5 sm:gap-6">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <Card
                key={p.id}
                className="group relative overflow-hidden p-0 border-border hover:border-brand/40 hover:shadow-xl transition-all duration-300 bg-card"
              >
                {/* Visual header */}
                <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${p.accent} overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand/30 blur-3xl scale-75 group-hover:scale-100 transition-transform duration-500" />
                      <div className="relative inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-card shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-brand" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-card/80 backdrop-blur-sm text-foreground/80 border-border/40"
                    >
                      {p.tag}
                    </Badge>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-brand">
                    {p.short}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>

                  {/* Specs */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {p.specs.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-border/60 bg-secondary/40 p-3 text-center"
                      >
                        <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight">
                          {s.label}
                        </div>
                        {s.sub && (
                          <div className="mt-1 text-[10px] text-muted-foreground leading-tight">
                            {s.sub}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-3">
                    <Button
                      onClick={(e) => handleOrder(p.id, p.name, e)}
                      className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm flex-1"
                    >
                      <Check className="h-4 w-4 mr-1.5" />
                      {t.productOrder}
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setProduct(p.id, p.name);
                        goToOrder();
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      {t.productCustom}
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
