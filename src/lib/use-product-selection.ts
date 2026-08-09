"use client";

import { create } from "zustand";

interface ProductSelectionState {
  productId: string | null;
  productName: string | null;
  setProduct: (id: string | null, name: string | null) => void;
  /** Scroll to the order form section */
  goToOrder: () => void;
}

export const useProductSelection = create<ProductSelectionState>((set) => ({
  productId: null,
  productName: null,
  setProduct: (id, name) => set({ productId: id, productName: name }),
  goToOrder: () => {
    if (typeof document === "undefined") return;
    const el = document.querySelector("#order");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  },
}));
