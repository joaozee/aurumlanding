import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AurumLogo from "./AurumLogo";

// v2 - fixed nav links
const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Funcionalidades", href: "#features" },
  { label: "Para quem é?", href: "#audience" },
  { label: "Lista de Espera", href: "#waitlist-form" },
];

export default function NavBar({ onCTAClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLink = (href) => {
    setOpen(false);
    if (href === "#waitlist-form") {
      onCTAClick?.();
    } else if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        style={{ zIndex: 9999, position: "fixed", top: 0, left: 0, right: 0, height: "64px", backgroundColor: "#000000", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none" }}
      >
        <div style={{ position: "relative", zIndex: 1, backgroundColor: "#000000", height: "100%" }} className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <AurumLogo className="h-8" />
          </div>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLink(link.href)}
                className="text-[#BFBFBF] hover:text-[#D4AF37] text-sm transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={onCTAClick}
            className="hidden lg:block bg-[#D4AF37] hover:bg-[#B8860B] text-black text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            Entrar na lista →
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-0.5 bg-[#D4AF37] rounded-full origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5 bg-[#D4AF37] rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-0.5 bg-[#D4AF37] rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{ zIndex: 9998, position: "fixed", inset: 0 }}
              className="bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              style={{ zIndex: 9999, position: "fixed", top: 0, right: 0, bottom: 0 }}
              className="w-72 bg-[#0A0A0A] border-l border-[#D4AF37]/10 lg:hidden flex flex-col"
            >
              <div className="px-8 pt-8 pb-6 border-b border-white/5">
                <AurumLogo className="h-8" />
              </div>
              <nav className="flex flex-col px-8 py-8 gap-2 flex-1">
                {LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => handleLink(link.href)}
                    className="text-left text-[#BFBFBF] hover:text-[#D4AF37] text-base py-3 border-b border-white/5 transition-colors duration-200"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <div className="px-8 pb-10">
                <button
                  onClick={() => { setOpen(false); onCTAClick?.(); }}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-sm py-3.5 rounded-xl transition-all duration-200"
                >
                  Entrar na lista de espera →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}