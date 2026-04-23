import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_PREFS = {
  necessary: true,
  marketing: false,
  statistics: false,
};

function ShieldIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            className="text-white/40 text-xs hover:text-white/60 transition-colors mt-0.5 flex items-center gap-1"
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

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [expanded, setExpanded] = useState({ necessary: false, marketing: false, statistics: false });

  useEffect(() => {
    const consent = localStorage.getItem("aurum_cookie_consent");
    if (!consent) setVisible(true);
    else {
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

  return (
    <>
      {/* Banner principal */}
      <AnimatePresence>
        {visible && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-lg z-50"
          >
            <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <ShieldIcon />
                </div>
                <span className="text-[#D4AF37] font-semibold text-base">Controle sua privacidade</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A Aurum utiliza cookies para otimizar sua experiência, personalizar conteúdos e analisar o desempenho do site. Você pode ajustar suas preferências a qualquer momento clicando em "Minhas opções".
              </p>
              <div className="flex gap-3 text-sm mb-5">
                <a href="/politica-de-privacidade" className="text-[#D4AF37] underline underline-offset-2 hover:text-[#B8960B]">
                  Política de Privacidade
                </a>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  Minhas opções
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  Rejeitar
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 py-2.5 text-sm bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold rounded-xl transition-colors"
                >
                  Aceitar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de preferências */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#0B1120] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <span className="text-white font-semibold text-base">Quem pode usar seus cookies?</span>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Categorias */}
              <div className="px-5">
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
              <div className="flex gap-3 p-5 border-t border-white/5">
                <button
                  onClick={rejectAll}
                  className="flex-1 py-2.5 text-sm text-white/60 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  Rejeitar
                </button>
                <button
                  onClick={saveOptions}
                  className="flex-1 py-2.5 text-sm bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold rounded-xl transition-colors"
                >
                  Salvar opções
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}