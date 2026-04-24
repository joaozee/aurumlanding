import { motion } from "framer-motion";

const audience = [
  "Quem quer começar a investir com segurança",
  "Quem precisa de clareza nas finanças",
  "Quem quer parar de viver no vermelho",
  "Quem quer construir patrimônio sólido",
  "Quem busca liberdade financeira de verdade",
];

export default function AudienceSection() {
  return (
    <section id="audience" style={{ position: "relative", zIndex: 0 }} className="bg-[#0E0E0E] py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs md:text-sm tracking-widest uppercase">Para Quem É</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
            O Aurum é para<br />
            <span className="text-[#D4AF37]">pessoas como você</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {audience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="flex items-center gap-4 bg-[#1C1C1C] border border-white/5 rounded-2xl px-6 py-5"
            >
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4AF37] text-sm">✓</span>
              </div>
              <p className="text-white text-sm md:text-base font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
