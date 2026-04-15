import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";

const INCOME_OPTIONS = [
  "Até R$ 2.500",
  "R$ 2.501 a R$ 5.000",
  "R$ 5.001 a R$ 10.000",
  "R$ 10.001 a R$ 20.000",
  "R$ 20.001 a R$ 50.000",
  "R$ 50.001 a R$ 100.000",
  "Acima de R$ 100.000",
];

const OCCUPATION_OPTIONS = [
  "CLT (carteira assinada)",
  "Servidor público",
  "Autônomo",
  "Profissional liberal (advogado, médico, contador etc.)",
  "Empresário / Sócio de empresa",
  "Aposentado / Pensionista",
  "Estudante",
  "Desempregado",
  "Outro",
];

const INVEST_OPTIONS = [
  "Sim, com consistência",
  "Sim, mas ainda sinto insegurança",
  "Não, mas quero começar",
  "Não",
];

const GOAL_OPTIONS = [
  "Organizar minhas finanças",
  "Começar a investir",
  "Melhorar meus investimentos",
  "Conquistar liberdade financeira",
];

function RadioGroup({ label, options, value, onChange, error }) {
  return (
    <div className="space-y-3">
      <p className="text-[#BFBFBF] text-sm font-medium">{label}</p>
      <div className="grid gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            onClick={() => onChange(opt)}
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
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function WaitlistForm({ formRef }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [honeypot, setHoneypot] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    whatsapp: "",
    monthly_income: "",
    occupation: "",
    occupation_other: "",
    already_invests: "",
    main_goal: "",
    wants_early_access: null,
  });

  const [errors, setErrors] = useState({});
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState("idle");

  const set = (field) => (val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.full_name.trim()) newErrors.full_name = "Nome obrigatório.";
    if (!form.email.trim()) {
      newErrors.email = "E-mail obrigatório.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }
    if (!form.monthly_income) newErrors.monthly_income = "Selecione sua faixa de renda.";
    if (!form.occupation) newErrors.occupation = "Selecione sua ocupação.";
    if (!form.already_invests) newErrors.already_invests = "Selecione uma opção.";
    if (!form.main_goal) newErrors.main_goal = "Selecione seu objetivo.";
    if (form.wants_early_access === null) newErrors.wants_early_access = "Selecione uma opção.";
    if (!acceptedPrivacy) newErrors.privacy = "Você precisa aceitar a Política de Privacidade para continuar.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorEl = document.querySelector("[data-error='true']");
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");
    const occupationValue = form.occupation === "Outro" && form.occupation_other
      ? `Outro: ${form.occupation_other}`
      : form.occupation;

    const response = await base44.functions.invoke("submitWaitlist", {
      full_name: form.full_name,
      email: form.email,
      whatsapp: form.whatsapp,
      monthly_income: form.monthly_income,
      occupation: occupationValue,
      already_invests: form.already_invests,
      main_goal: form.main_goal,
      wants_early_access: form.wants_early_access === "Sim",
      website: honeypot,
    });

    if (response.data?.error) {
      setErrors({ form: response.data.error });
      setStatus("idle");
      return;
    }

    navigate(createPageUrl("Obrigado"));
  };

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

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#0E0E0E] border border-white/5 rounded-3xl p-8 md:p-10 space-y-8"
        >
          {/* Honeypot field — hidden from real users, bots will fill it */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name */}
          <div className="space-y-2" data-error={!!errors.full_name}>
            <label className="text-[#BFBFBF] text-sm font-medium block">
              Nome completo <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => set("full_name")(e.target.value)}
              placeholder="Seu nome completo"
              className={`w-full bg-[#1C1C1C] border text-white placeholder-white/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                errors.full_name ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-[#D4AF37]/50"
              }`}
            />
            {errors.full_name && <p className="text-red-400 text-xs">{errors.full_name}</p>}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="text-[#BFBFBF] text-sm font-medium block">
              WhatsApp
            </label>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => set("whatsapp")(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full bg-[#1C1C1C] border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2" data-error={!!errors.email}>
            <label className="text-[#BFBFBF] text-sm font-medium block">
              E-mail <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              placeholder="seu@email.com"
              className={`w-full bg-[#1C1C1C] border text-white placeholder-white/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                errors.email ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-[#D4AF37]/50"
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>

          {/* Income */}
          <div data-error={!!errors.monthly_income}>
            <RadioGroup
              label="Qual é a sua faixa de renda mensal? *"
              options={INCOME_OPTIONS}
              value={form.monthly_income}
              onChange={set("monthly_income")}
              error={errors.monthly_income}
            />
          </div>

          {/* Occupation */}
          <div data-error={!!errors.occupation}>
            <RadioGroup
              label="Qual é a sua ocupação atual? *"
              options={OCCUPATION_OPTIONS}
              value={form.occupation}
              onChange={set("occupation")}
              error={errors.occupation}
            />
            {form.occupation === "Outro" && (
              <input
                type="text"
                value={form.occupation_other}
                onChange={(e) => set("occupation_other")(e.target.value)}
                placeholder="Descreva sua ocupação"
                className="mt-3 w-full bg-[#1C1C1C] border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
            )}
          </div>

          {/* Already invests */}
          <div data-error={!!errors.already_invests}>
            <RadioGroup
              label="Você já investe hoje? *"
              options={INVEST_OPTIONS}
              value={form.already_invests}
              onChange={set("already_invests")}
              error={errors.already_invests}
            />
          </div>

          {/* Main goal */}
          <div data-error={!!errors.main_goal}>
            <RadioGroup
              label="Qual seu objetivo financeiro principal hoje? *"
              options={GOAL_OPTIONS}
              value={form.main_goal}
              onChange={set("main_goal")}
              error={errors.main_goal}
            />
          </div>

          {/* Early access */}
          <div data-error={!!errors.wants_early_access}>
            <RadioGroup
              label="Quer receber convite para testar o app antes do lançamento? *"
              options={["Sim", "Não"]}
              value={form.wants_early_access}
              onChange={set("wants_early_access")}
              error={errors.wants_early_access}
            />
          </div>

          {/* Error summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4">
              <p className="text-red-400 text-sm font-medium">Por favor, preencha todos os campos obrigatórios antes de continuar.</p>
            </div>
          )}

          {/* Privacy consent */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => { setAcceptedPrivacy(v => !v); setErrors(prev => ({ ...prev, privacy: null })); }}
              className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                acceptedPrivacy ? "bg-[#D4AF37] border-[#D4AF37]" : errors.privacy ? "border-red-500" : "border-white/30"
              }`}
            >
              {acceptedPrivacy && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <p className="text-[#BFBFBF] text-sm leading-relaxed">
              Li e concordo com a{" "}
              <a href="/PrivacyPolicy" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline underline-offset-2 hover:text-[#B8960B]">Política de Privacidade</a>{" "}
              do Aurum.
            </p>
          </div>
          {errors.privacy && <p className="text-red-400 text-xs -mt-4">{errors.privacy}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#D4AF37] hover:bg-[#B8860B] disabled:opacity-60 text-black font-semibold text-base py-4 rounded-xl transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 hover:scale-[1.01]"
          >
            {status === "loading" ? "Enviando..." : "Quero entrar na lista de espera →"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}