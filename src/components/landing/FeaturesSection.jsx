import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "◈",
    title: "Organização Financeira Real",
    description: "Visual limpo, automático e inteligente. Você sabe para onde seu dinheiro vai, sem esforço.",
  },
  {
    icon: "◉",
    title: "Plano de Investimentos Personalizado",
    description: "Com base em renda, risco e metas. Nada de receitas prontas. Estratégia real para o seu perfil.",
  },
  {
    icon: "◎",
    title: "Evolução Mensal",
    description: "Gráficos, alertas e indicadores que mostram para onde você está caminhando mês a mês.",
  },
  {
    icon: "◇",
    title: "Conteúdo Direto ao Ponto",
    description: "Explicações simples para que você realmente entenda onde está colocando seu dinheiro.",
  },
  {
    icon: "◆",
    title: "Comunidade Aurum",
    description: "Aprenda com outras pessoas e evolua junto, sem achismos, com dados e resultados reais.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-black py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Funcionalidades</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            O que o Aurum vai<br />
            <span className="text-[#D4AF37]">fazer por você</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
              className={`group relative bg-[#0E0E0E] border border-white/5 rounded-3xl p-8 hover:border-[#D4AF37]/30 transition-all duration-500 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-transparent transition-all duration-500" />
              <span className="text-[#D4AF37] text-3xl mb-5 block">{feature.icon}</span>
              <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-[#BFBFBF] text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}