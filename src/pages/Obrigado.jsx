import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import AurumLogo from "../components/landing/AurumLogo";

export default function Obrigado() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D4AF37]/8 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2"
      >
        <AurumLogo className="h-10" />
      </motion.div>

      <div className="relative max-w-2xl w-full text-center">
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#D4AF37] text-3xl"
          >
            ✓
          </motion.span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
        >
          Bem-vindo à nova era<br />
          <span className="text-[#D4AF37]">das finanças pessoais.</span>
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#0E0E0E] border border-[#D4AF37]/20 rounded-3xl p-8 md:p-10 space-y-4 text-left"
        >
          <p className="text-[#BFBFBF] text-base leading-relaxed">
            🎉 <span className="text-white font-medium">Você está na lista!</span> Obrigado por entrar para a lista de espera do Aurum.
          </p>
          <p className="text-[#BFBFBF] text-base leading-relaxed">
            Você está dando o primeiro passo para transformar sua vida financeira com <span className="text-[#D4AF37]">clareza</span>, <span className="text-[#D4AF37]">estratégia</span> e <span className="text-[#D4AF37]">inteligência</span>.
          </p>
          <p className="text-[#BFBFBF] text-base leading-relaxed">
            📬 Fique de olho no seu e-mail: quando o Aurum for lançado, você será um dos primeiros a saber e terá acesso a <span className="text-white font-medium">benefícios exclusivos</span>.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="my-8 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[#BFBFBF]/40 text-xs tracking-widest uppercase">Enquanto isso</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Back CTA */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          href={createPageUrl("Home")}
          className="inline-block text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium px-8 py-3 rounded-full transition-all duration-300"
        >
          ← Voltar para a página inicial
        </motion.a>
      </div>
    </div>
  );
}