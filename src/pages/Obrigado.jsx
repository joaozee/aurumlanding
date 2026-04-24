import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import AurumLogo from "../components/landing/AurumLogo";

export default function Obrigado() {
  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/7 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#D4AF37]/4 blur-[120px] rounded-full pointer-events-none" />

      {/* Header mínimo com logo linkado ao home */}
      <header className="relative flex justify-center items-center py-6 px-6 border-b border-white/5">
        <Link to={createPageUrl("Home")} className="outline-none focus-visible:outline-[#D4AF37]">
          <AurumLogo className="h-8" variant="selo" loading="eager" />
        </Link>
      </header>

      {/* Conteúdo central */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">

          {/* Logo principal — wordmark completo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <AurumLogo className="h-16 md:h-24" loading="eager" />
          </motion.div>

          {/* Badge "na lista" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <span className="border border-[#D4AF37]/30 text-[#D4AF37] text-xs md:text-sm tracking-widest uppercase px-5 py-2 rounded-full">
              Você está na lista ✓
            </span>
          </motion.div>

          {/* Check icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: 0.2 }}
            className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 flex items-center justify-center mb-8"
          >
            <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

          {/* Card de mensagem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="w-full bg-[#0E0E0E] border border-[#D4AF37]/15 rounded-3xl p-8 md:p-10 space-y-5 text-left mb-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-1 min-h-[1.5rem] bg-[#D4AF37] rounded-full flex-shrink-0 mt-1" />
              <p className="text-[#BFBFBF] text-base leading-relaxed">
                <span className="text-white font-semibold">Você está na lista!</span> Obrigado por entrar para a lista de espera do Aurum.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1 min-h-[1.5rem] bg-[#D4AF37]/40 rounded-full flex-shrink-0 mt-1" />
              <p className="text-[#BFBFBF] text-base leading-relaxed">
                Você está dando o primeiro passo para transformar sua vida financeira com{" "}
                <span className="text-[#D4AF37]">clareza</span>,{" "}
                <span className="text-[#D4AF37]">estratégia</span> e{" "}
                <span className="text-[#D4AF37]">inteligência</span>.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1 min-h-[1.5rem] bg-[#D4AF37]/40 rounded-full flex-shrink-0 mt-1" />
              <p className="text-[#BFBFBF] text-base leading-relaxed">
                Fique de olho no seu e-mail: quando o Aurum for lançado, você será um dos primeiros a saber e terá acesso a{" "}
                <span className="text-white font-semibold">benefícios exclusivos</span>.
              </p>
            </div>
          </motion.div>

          {/* Divisor */}
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

          {/* CTA voltar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <Link
              to={createPageUrl("Home")}
              className="inline-block bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-sm px-10 py-3.5 rounded-full transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:scale-105 outline-none"
            >
              Voltar para a página inicial
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
