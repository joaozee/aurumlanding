import { motion } from "framer-motion";
import { BarChart2, Briefcase, GraduationCap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    Icon: BarChart2,
    tag: "Finanças",
    title: "Controle total do seu dinheiro",
    description: "Carteiras separadas para pessoa física e empresa. Visualize receitas, despesas e evolução patrimonial com clareza.",
    badge: "PF & PJ",
  },
  {
    Icon: Briefcase,
    tag: "Carteira",
    title: "Seus investimentos em um só lugar",
    description: "Acompanhe todos os seus ativos consolidados. Veja desempenho, alocação por classe e rentabilidade real.",
    badge: null,
  },
  {
    Icon: GraduationCap,
    tag: "Cursos",
    title: "Aprenda na prática",
    description: "Conteúdos educacionais de qualidade. Alguns inclusos na assinatura, outros premium para quem quer ir mais fundo.",
    badge: "Incluso no plano",
  },
  {
    Icon: Users,
    tag: "Comunidade",
    title: "O Instagram dos investimentos",
    description: "Poste, crie grupos, troque mensagens e acompanhe notícias e conteúdos do mercado financeiro em tempo real.",
    badge: null,
  },
  {
    Icon: TrendingUp,
    tag: "Ações",
    title: "Análise completa de ativos",
    description: "Consulte cotações, gráficos históricos e todos os detalhes de qualquer ativo. Tudo para tomar boas decisões.",
    badge: null,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ position: "relative", zIndex: 0 }} className="bg-black py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[#D4AF37] text-xs md:text-sm tracking-widest uppercase">Funcionalidades</span>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={`group relative bg-[#0E0E0E] border border-white/5 rounded-3xl p-8 hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/0 to-transparent group-hover:from-[#D4AF37]/5 transition-all duration-500" />

              {/* Icon + tag row */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <feature.Icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                {feature.badge && (
                  <span className="text-xs font-medium tracking-wide text-[#D4AF37]/70 border border-[#D4AF37]/20 px-2.5 py-1 rounded-full bg-[#D4AF37]/5">
                    {feature.badge}
                  </span>
                )}
              </div>

              <p className="text-[#D4AF37]/60 text-xs md:text-sm font-medium tracking-widest uppercase mb-2">{feature.tag}</p>
              <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{feature.title}</h3>
              <p className="text-[#BFBFBF] text-sm md:text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
