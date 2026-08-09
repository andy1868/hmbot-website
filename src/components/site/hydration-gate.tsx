"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Defers rendering of children until the client has mounted.
 *
 * Why: persisted Zustand stores (e.g. language preference) rehydrate
 * asynchronously on the client. Rendering language-dependent UI before
 * mount causes a hydration mismatch warning. This guard uses
 * useSyncExternalStore to return `false` on the server and `true` on the
 * client without triggering a cascading re-render via setState-in-effect.
 */
export function HydrationGate({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );

  if (!mounted) {
    // Minimal placeholder visible during SSR — matches page background
    // so there is no flash of wrong-colored content.
    return (
      <div className="min-h-screen bg-background" aria-hidden="true">
        <div className="h-16" />
      </div>
    );
  }

  return <>{children}</>;
}
