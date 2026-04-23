import { motion } from "framer-motion";
import AurumLogo from "./AurumLogo";

export default function HeroSection({ onCTAClick }) {
  return (
    <section style={{ position: "relative", zIndex: 0 }} className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37] opacity-5 blur-[120px]" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 mb-10"
      >
        <AurumLogo className="h-20 md:h-28" />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <span className="border border-[#D4AF37]/30 text-[#D4AF37] text-xs tracking-widest uppercase px-4 py-2 rounded-full">
          Em breve · Lista de Espera Aberta
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl"
      >
        <span className="text-[#D4AF37]">Construa sua</span>
        <br />
        <span className="text-white">Liberdade Financeira</span>
        <br />
        <span className="text-[#BFBFBF] font-light">com Clareza e Segurança</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-8 text-center text-[#BFBFBF] text-lg md:text-xl max-w-2xl leading-relaxed"
      >
        Entre para a lista de espera do app que vai organizar suas finanças e guiar seus investimentos com inteligência, tudo em um só lugar.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={onCTAClick}
        className="mt-12 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:scale-105"
      >
        Quero entrar na lista de espera →
      </motion.button>



      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#BFBFBF]/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-[#D4AF37]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}