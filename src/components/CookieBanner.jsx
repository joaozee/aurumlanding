import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("aurum_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("aurum_cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("aurum_cookie_consent", "rejected");
    setVisible(false);
  };

  const myOptions = () => {
    // future: open preferences modal
    accept();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-lg z-50"
        >
          <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <svg width="38" height="38" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 2 L4 5 L4 11 C4 15.4 7 19.2 11 20.5 C15 19.2 18 15.4 18 11 L18 5 Z" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round"/>
                <rect x="8" y="10" width="6" height="5" rx="1" fill="#D4AF37" fillOpacity="0.9"/>
                <path d="M9 10 L9 8.5 C9 7.1 13 7.1 13 8.5 L13 10" stroke="#D4AF37" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <circle cx="11" cy="12.5" r="0.8" fill="#0B1120"/>
              </svg>
            </div>
              <span className="text-[#D4AF37] font-semibold text-base">Controle sua privacidade</span>
            </div>

            {/* Body */}
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              A Aurum utiliza cookies para otimizar sua experiência, personalizar conteúdos e analisar o desempenho do site. Você pode ajustar suas preferências a qualquer momento clicando em "Minhas opções".
            </p>

            {/* Links */}
            <div className="flex gap-3 text-sm mb-5">
              <a href="#" className="text-[#D4AF37] underline underline-offset-2 hover:text-[#B8960B]">Política de Privacidade</a>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={myOptions}
                className="flex-1 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                Minhas opções
              </button>
              <button
                onClick={reject}
                className="flex-1 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                Rejeitar
              </button>
              <button
                onClick={accept}
                className="flex-1 py-2.5 text-sm bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold rounded-xl transition-colors"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}