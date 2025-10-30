"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface ContactContextState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactContext = createContext<ContactContextState | undefined>(
  undefined
);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleHashOpen = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash === "#contacto") {
        setIsOpen(true);
      }
    };

    handleHashOpen();
    window.addEventListener("hashchange", handleHashOpen);
    return () => window.removeEventListener("hashchange", handleHashOpen);
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactContext);
  if (!ctx)
    throw new Error("useContactModal debe usarse dentro de ContactProvider");
  return ctx;
}
