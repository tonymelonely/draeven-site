"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThreeContextValue = {
  enabled: boolean;
  ready: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
};

const ThreeContext = createContext<ThreeContextValue | null>(null);
const STORAGE_KEY = "draeven-3d";

function applyDepth(enabled: boolean) {
  document.documentElement.dataset.depth = enabled ? "on" : "off";
  document.cookie = `draeven-3d=${enabled ? "on" : "off"};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function ThreeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    let next = !reduced;
    if (stored === "on") next = true;
    else if (stored === "off") next = false;
    setEnabledState(next);
    applyDepth(next);
    setReady(true);
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    applyDepth(value);
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const value = useMemo(
    () => ({ enabled, ready, setEnabled, toggle }),
    [enabled, ready, setEnabled, toggle]
  );

  return <ThreeContext.Provider value={value}>{children}</ThreeContext.Provider>;
}

export function useThreePreference() {
  const ctx = useContext(ThreeContext);
  if (!ctx) throw new Error("useThreePreference needs ThreeProvider");
  return ctx;
}
