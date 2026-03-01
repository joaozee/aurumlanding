import { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { base44 } from "@/api/base44Client";

const RadioGroup = ({ label, options, value, onChange }) => (
  <div className="space-y-3">
    <label className="text-[#BFBFBF] text-sm font-medium block">{label}</label>
    <div className="grid gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
            value === opt
              ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white"
              : "border-white/10 bg-[#1C1C1C] text-[#BFBFBF] hover:border-white/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            value === opt ? "border-[#D4AF37]" : "border-white/30"
          }`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
          </div>
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function WaitlistForm({ formRef }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    monthly_income: "",
    already_invests: "",
    main_goal: "",
    wants_early_access: null,
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) return;
    setStatus("loading");
    await base44.entities.WaitlistEntry.create({
      ...form,
      wants_early_access: form.wants_early_access === "Sim",
    });
    setStatus("success");
  };

  const set = (field) => (val) => setForm((prev) => ({ ...prev, [field]: val }));

  return (
    <section ref={sectionRef} id="waitlist-form" className="bg-black py-28 px-6">
      <div className="max-w-2xl mx-auto" ref={formRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Lista de Espera</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            Garanta seu<br />
            <span className="text-[#D4AF37]">acesso antecipado</span>
          </h2>
          <p className="mt-5 text-[#BFBFBF] text-base max-w-lg mx-auto">
            Os primeiros cadastrados terão acesso antecipado e benefícios exclusivos. Preencha abaixo.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0E0E0E] border border-[#D4AF37]/30 rounded-3xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
              <span className="text-[#D4AF37] text-2xl">✓</span>
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Bem-vindo à nova era das finanças pessoais.</h3>
            <p className="text-[#BFBFBF] leading-relaxed">
              Obrigado por entrar para a lista de espera.<br />
              Você está dando o primeiro passo para transformar sua vida financeira com clareza, estratégia e inteligência.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-[#0E0E0E] border border-white/5 rounded-3xl p-8 md:p-10 space-y-8"
          >
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[#BFBFBF] text-sm font-medium block">Nome completo</label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => set("full_name")(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-[#1C1C1C] border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[#BFBFBF] text-sm font-medium block">E-mail <span className="text-[#D4AF37]">*</span></label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[#1C1C1C] border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
            </div>

            <RadioGroup
              label="Sua renda mensal aproximada:"
              options={["Até R$ 2.000", "R$ 2.001 a R$ 5.000", "R$ 5.001 a R$ 10.000", "Acima de R$ 10.000"]}
              value={form.monthly_income}
              onChange={set("monthly_income")}
            />

            <RadioGroup
              label="Você já investe hoje?"
              options={["Sim, com consistência", "Sim, mas ainda sinto insegurança", "Não, mas quero começar", "Não"]}
              value={form.already_invests}
              onChange={set("already_invests")}
            />

            <RadioGroup
              label="Qual seu objetivo financeiro principal hoje?"
              options={["Organizar minhas finanças", "Começar a investir", "Melhorar meus investimentos", "Conquistar liberdade financeira"]}
              value={form.main_goal}
              onChange={set("main_goal")}
            />

            <RadioGroup
              label="Quer receber convite para testar o app antes do lançamento?"
              options={["Sim", "Não"]}
              value={form.wants_early_access}
              onChange={set("wants_early_access")}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#D4AF37] hover:bg-[#B8860B] disabled:opacity-60 text-black font-semibold text-base py-4 rounded-xl transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30"
            >
              {status === "loading" ? "Enviando..." : "Quero entrar na lista de espera →"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}