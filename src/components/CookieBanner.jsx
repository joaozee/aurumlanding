import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_PREFS = {
  necessary: true,
  marketing: false,
  statistics: false,
};

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2 L4 5 L4 11 C4 15.4 7 19.2 11 20.5 C15 19.2 18 15.4 18 11 L18 5 Z" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round"/>
      <rect x="8" y="10" width="6" height="5" rx="1" fill="#D4AF37" fillOpacity="0.9"/>
      <path d="M9 10 L9 8.5 C9 7.1 13 7.1 13 8.5 L13 10" stroke="#D4AF37" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <circle cx="11" cy="12.5" r="0.8" fill="#0B1120"/>
    </svg>
  );
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-[#D4AF37]" : "bg-white/10"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`} />
    </button>
  );
}

function CategoryRow({ icon, title, count, description, checked, onChange, disabled, expanded, onToggleExpand }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3 py-4">
        <span className="text-xl">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">{title}</span>
            <span className="text-white/30 text-xs">({count})</span>
          </div>
          <button
            onClick={onToggleExpand}
            className="text-white/40 text-xs hover:text-white/60 transition-colors mt-0.5 flex items-center gap-1 outline-none"
          >
            Mostrar mais
            <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>›</span>
          </button>
        </div>
        <Toggle checked={checked} onChange={onChange} disabled={disabled} />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-xs leading-relaxed pb-4 pl-9">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Widget flutuante com logo Aurum (A estilizado)
function AurumCookieWidget({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-1 cursor-pointer outline-none"
      aria-label="Gerenciar cookies"
    >
      <div
        style={{
          width: 48,
          height: 48,
          background: "#111",
          border: "2px solid #C9A827",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(201,168,39,0.3)",
        }}
      >
        {/* Logo Aurum — letra A */}
        <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
          <defs>
            <linearGradient id="aurum-gold-widget" x1="13" y1="2" x2="13" y2="24">
              <stop offset="0%" stopColor="#f5d060" />
              <stop offset="100%" stopColor="#c9a227" />
            </linearGradient>
          </defs>
          <polygon points="13,2 22,24 18,24 13,9 8,24 4,24" fill="url(#aurum-gold-widget)" />
          <rect x="7.5" y="16" width="11" height="2.5" fill="#111" />
        </svg>
      </div>
      <span
        style={{
          color: "#c9a227",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
        }}
      >
        Cookies
      </span>
    </motion.button>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [expanded, setExpanded] = useState({ necessary: false, marketing: false, statistics: false });

  useEffect(() => {
    const consent = localStorage.getItem("aurum_cookie_consent");
    if (!consent) {
      setVisible(true);
    } else {
      // Já consentiu — mostrar widget flutuante
      setShowWidget(true);
      try {
        const saved = JSON.parse(consent);
        if (saved.prefs) setPrefs(saved.prefs);
      } catch {}
    }
  }, []);

  const saveConsent = (finalPrefs) => {
    localStorage.setItem("aurum_cookie_consent", JSON.stringify({
      status: "custom",
      prefs: finalPrefs,
      date: new Date().toISOString(),
    }));
    setVisible(false);
    setShowModal(false);
    setShowWidget(true);
  };

  const acceptAll = () => {
    const all = { necessary: true, marketing: true, statistics: true };
    setPrefs(all);
    saveConsent(all);
  };

  const rejectAll = () => {
    const none = { necessary: true, marketing: false, statistics: false };
    setPrefs(none);
    saveConsent(none);
  };

  const saveOptions = () => saveConsent(prefs);

  const toggleExpand = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const handleWidgetClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Banner compacto — fixo no canto inferior direito */}
      <AnimatePresence>
        {visible && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-[9990]"
          >
            <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 mt-0.5">
                  <ShieldIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[#D4AF37] font-semibold text-sm block">Controle sua privacidade</span>
                  <p className="text-white/60 text-xs leading-relaxed mt-1">
                    Usamos cookies para melhorar sua experiência.{" "}
                    <a href="/politica-de-privacidade" className="text-[#D4AF37]/80 underline underline-offset-2 hover:text-[#D4AF37]">
                      Saiba mais
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={rejectAll}
                  className="flex-1 min-h-[40px] text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors whitespace-nowrap outline-none"
                >
                  Rejeitar
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 min-h-[40px] text-sm bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold rounded-xl transition-colors whitespace-nowrap outline-none"
                >
                  Aceitar
                </button>
              </div>
              <button
                onClick={() => { setVisible(false); setShowModal(true); }}
                className="w-full mt-2 py-1.5 text-xs text-white/30 hover:text-white/50 transition-colors outline-none"
              >
                Personalizar preferências ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget flutuante permanente — canto inferior direito */}
      <AnimatePresence>
        {showWidget && !showModal && (
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 9989,
            }}
          >
            <AurumCookieWidget onClick={handleWidgetClick} />
          </div>
        )}
      </AnimatePresence>

      {/* Modal de preferências */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9991] flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#0B1120] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2 L4 5 L4 11 C4 15.4 7 19.2 11 20.5 C15 19.2 18 15.4 18 11 L18 5 Z" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round"/>
                    <rect x="8" y="10" width="6" height="5" rx="1" fill="#D4AF37" fillOpacity="0.9"/>
                    <path d="M9 10 L9 8.5 C9 7.1 13 7.1 13 8.5 L13 10" stroke="#D4AF37" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  </svg>
                  <span className="text-white font-semibold text-sm">Gestor de Cookies</span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 transition-colors text-sm outline-none"
                >
                  ✕
                </button>
              </div>

              {/* Categorias */}
              <div className="px-5 overflow-y-auto flex-1">
                <CategoryRow
                  icon="🛡️"
                  title="Necessários"
                  count="3/3"
                  description="Os cookies necessários são essenciais para o funcionamento do site, sem eles o site não funcionaria corretamente. Por exemplo, login, acesso a áreas seguras do site, segurança e legislação."
                  checked={prefs.necessary}
                  onChange={() => {}}
                  disabled={true}
                  expanded={expanded.necessary}
                  onToggleExpand={() => toggleExpand("necessary")}
                />
                <CategoryRow
                  icon="📢"
                  title="Marketing"
                  count="0/3"
                  description="Os cookies de marketing ou publicidade rastreiam a navegação dos visitantes e coletam dados para que a empresa possa fornecer anúncios mais relevantes de acordo com tal comportamento."
                  checked={prefs.marketing}
                  onChange={(val) => setPrefs(p => ({ ...p, marketing: val }))}
                  disabled={false}
                  expanded={expanded.marketing}
                  onToggleExpand={() => toggleExpand("marketing")}
                />
                <CategoryRow
                  icon="📈"
                  title="Estatísticas"
                  count="0/1"
                  description="Os cookies de estatísticas, ou análises, traduzem as interações dos visitantes em relatórios de comportamento de forma anônima, ajudando a melhorar o site."
                  checked={prefs.statistics}
                  onChange={(val) => setPrefs(p => ({ ...p, statistics: val }))}
                  disabled={false}
                  expanded={expanded.statistics}
                  onToggleExpand={() => toggleExpand("statistics")}
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 p-5 border-t border-white/5 flex-shrink-0">
                <button
                  onClick={rejectAll}
                  className="flex-1 min-h-[44px] text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors outline-none"
                >
                  Rejeitar todos
                </button>
                <button
                  onClick={saveOptions}
                  className="flex-1 min-h-[44px] text-sm bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold rounded-xl transition-colors outline-none"
                >
                  Salvar
                </button>
              </div>

              {/* Rodapé Grupo Aurum */}
              <div className="text-center pb-4 flex items-center justify-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 26 26" fill="none">
                  <defs>
                    <linearGradient id="aurum-gold-modal" x1="13" y1="2" x2="13" y2="24">
                      <stop offset="0%" stopColor="#f5d060" />
                      <stop offset="100%" stopColor="#c9a227" />
                    </linearGradient>
                  </defs>
                  <polygon points="13,2 22,24 18,24 13,9 8,24 4,24" fill="url(#aurum-gold-modal)" />
                  <rect x="7.5" y="16" width="11" height="2.5" fill="#0B1120" />
                </svg>
                <span style={{ color: "#444", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Grupo Aurum
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}