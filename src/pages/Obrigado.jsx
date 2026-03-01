import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Obrigado() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#D4AF37]/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-2xl w-full flex flex-col items-center text-center">

        {/* Logo grande */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg"
            alt="Aurum — App de Finanças Pessoais e Investimentos"
            className="h-24 md:h-32 w-auto object-contain"
          />
        </motion.div>

        {/* Check badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: 0.2 }}
          className="w-14 h-14 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 flex items-center justify-center mb-8"
        >
          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
        >
          Bem-vindo à nova era
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-4xl md:text-5xl font-bold text-[#D4AF37] leading-tight mb-10"
        >
          das finanças pessoais.
        </motion.p>

        {/* Message card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-full bg-[#0E0E0E] border border-[#D4AF37]/15 rounded-3xl p-8 md:p-10 space-y-5 text-left mb-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-1 h-full min-h-[1.5rem] bg-[#D4AF37] rounded-full flex-shrink-0 mt-1" />
            <p className="text-[#BFBFBF] text-base leading-relaxed">
              <span className="text-white font-semibold">Você está na lista!</span> Obrigado por entrar para a lista de espera do Aurum.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-1 h-full min-h-[1.5rem] bg-[#D4AF37]/40 rounded-full flex-shrink-0 mt-1" />
            <p className="text-[#BFBFBF] text-base leading-relaxed">
              Você está dando o primeiro passo para transformar sua vida financeira com <span className="text-[#D4AF37]">clareza</span>, <span className="text-[#D4AF37]">estratégia</span> e <span className="text-[#D4AF37]">inteligência</span>.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-1 h-full min-h-[1.5rem] bg-[#D4AF37]/40 rounded-full flex-shrink-0 mt-1" />
            <p className="text-[#BFBFBF] text-base leading-relaxed">
              Fique de olho no seu e-mail: quando o Aurum for lançado, você será um dos primeiros a saber e terá acesso a <span className="text-white font-semibold">benefícios exclusivos</span>.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="w-full flex items-center gap-4 mb-8"
        >
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[#BFBFBF]/30 text-xs tracking-widest uppercase">Enquanto isso</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Back CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <Link
            to={createPageUrl("Home")}
            className="inline-block bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-sm px-10 py-3.5 rounded-full transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:scale-105"
          >
            Voltar para a página inicial
          </Link>
        </motion.div>
      </div>
    </div>
  );
}