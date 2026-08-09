"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dict, type Dict, type Lang } from "./i18n";

interface LangState {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLang = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "zh",
      t: dict.zh,
      setLang: (lang) => set({ lang, t: dict[lang] }),
      toggle: () => {
        const next = get().lang === "zh" ? "en" : "zh";
        set({ lang: next, t: dict[next] });
      },
    }),
    {
      name: "hmbot-lang",
      // Only persist the lang key, derive `t` from it on rehydration
      partialize: (state) => ({ lang: state.lang } as LangState),
      onRehydrateStorage: () => (state) => {
        if (state && state.lang) {
          state.t = dict[state.lang];
        }
      },
    }
  )
);
