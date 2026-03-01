import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CTABanner({ onCTAClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0E0E0E] py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#1C1C1C] to-[#0E0E0E] border border-[#D4AF37]/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#D4AF37]/10 blur-[80px] rounded-full" />

          <span className="relative text-[#D4AF37] text-xs tracking-widest uppercase">Sua chance</span>
          <h2 className="relative mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            Se você quer mudar sua vida<br />
            <span className="text-[#D4AF37]">financeira de verdade</span>
          </h2>
          <p className="relative mt-6 text-[#BFBFBF] text-lg max-w-2xl mx-auto leading-relaxed">
            Comece entrando na lista de espera. Os primeiros cadastrados terão acesso antecipado e benefícios exclusivos.
          </p>

          <button
            onClick={onCTAClick}
            className="relative mt-10 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-base px-12 py-4 rounded-full transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:scale-105"
          >
            Quero entrar na lista de espera →
          </button>
        </motion.div>
      </div>
    </section>
  );
}