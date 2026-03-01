import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "📊",
    title: "Finanças",
    description: "Controle completo com carteiras separadas para pessoa física e empresa. Visualize receitas, despesas e evolução patrimonial em um só lugar.",
  },
  {
    icon: "💼",
    title: "Carteira",
    description: "Acompanhe todos os seus investimentos consolidados. Veja o desempenho de cada ativo, alocação por classe e rentabilidade real.",
  },
  {
    icon: "🎓",
    title: "Cursos",
    description: "Conteúdos educacionais de qualidade. Alguns gratuitos com a assinatura do app e outros pagos para quem quer ir mais fundo.",
  },
  {
    icon: "📱",
    title: "Comunidade",
    description: "O Instagram dos investimentos. Poste, crie grupos, troque mensagens e acompanhe notícias e conteúdos do mercado em tempo real.",
  },
  {
    icon: "📈",
    title: "Ações",
    description: "Consulte cotações, gráficos históricos e todos os detalhes de qualquer ativo do mercado. Tudo que você precisa para tomar boas decisões.",
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