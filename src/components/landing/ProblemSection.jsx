import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  "Não sabe para onde o dinheiro vai todo mês",
  "Não consegue guardar o suficiente para o futuro",
  "Tem medo de investir por falta de clareza",
  "Sente que está sempre no 'modo sobrevivência'",
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ position: "relative", zIndex: 0 }} className="bg-[#0E0E0E] py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase">O Problema</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            Gerenciar dinheiro<br />
            <span className="text-[#BFBFBF] font-light">não é fácil.</span>
          </h2>
          <p className="mt-6 text-[#BFBFBF] text-lg max-w-2xl mx-auto leading-relaxed">
            Você ganha… paga contas… tenta investir… e ainda assim sente que não está avançando.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              className="flex items-center gap-5 bg-[#1C1C1C] border border-white/5 rounded-2xl px-6 py-5"
            >
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
              <p className="text-[#BFBFBF] text-base">{problem}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center text-[#D4AF37] text-xl font-semibold"
        >
          É hora de mudar isso.
        </motion.p>
      </div>
    </section>
  );
}