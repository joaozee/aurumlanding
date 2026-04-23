import { useState } from "react";
import { motion } from "framer-motion";

const REQUEST_TYPES = [
  "Quero acessar meus dados.",
  "Quero corrigir ou atualizar meus dados.",
  "Quero pedir a portabilidade dos meus dados.",
  "Quero que a empresa elimine meus dados.",
  "Quero revogar o meu consentimento sobre o tratamento dos meus dados.",
  "Quero saber com quem meus dados são compartilhados.",
  "Quero saber o que acontecerá se eu revogar o meu consentimento para tratamento de dados.",
  "Quero saber se vocês tratam os meus dados.",
  "Quero solicitar a anonimização, o bloqueio ou eliminação de dados.",
];

const WHO_OPTIONS = [
  "Inscrito na lista de espera",
  "Usuário beta",
  "Cliente",
  "Ex-usuário",
  "Prestador de serviço",
  "Outro",
];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function DataRequestForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    whatsapp: "",
    request_type: "",
    who_i_am: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (field) => (e) => {
    const val = e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Nome obrigatório.";
    if (!form.email.trim()) e.email = "E-mail obrigatório.";
    else if (!validateEmail(form.email)) e.email = "E-mail inválido.";
    if (!form.request_type) e.request_type = "Selecione o tipo de solicitação.";
    if (!form.who_i_am) e.who_i_am = "Selecione uma opção.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");

    try {
      const res = await fetch("/api/data-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email.toLowerCase().trim(),
          whatsapp: form.whatsapp,
          request_type: form.request_type,
          who_i_am: form.who_i_am,
          description: form.message,
          status: "Pendente",
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setErrors({ form: data.error || "Muitas tentativas. Tente novamente em alguns minutos." });
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        setErrors({ form: data.error || "Erro ao enviar. Tente novamente." });
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch (err) {
      setErrors({ form: "Erro de conexão. Tente novamente." });
      setStatus("idle");
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#1C1C1C] border text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
      errors[field] ? "border-red-500/60" : "border-white/10 focus:border-[#D4AF37]/50"
    }`;

  return (
    <div className="mt-12">
      {!open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-sm px-10 py-3.5 rounded-full transition-all duration-300 tracking-widest uppercase shadow-lg shadow-[#D4AF37]/20 hover:scale-105"
          >
            Exercer Direito de Titular
          </button>
        </motion.div>
      )}

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0E0E0E] border border-white/5 rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-[#D4AF37] font-semibold text-base mb-1">Exercer Direito de Titular</h2>
          <p className="text-[#BFBFBF] text-sm mb-6">
            Preencha o formulário abaixo para exercer seus direitos conforme a LGPD. Entraremos em contato em até 15 dias úteis.
          </p>

          {status === "success" ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#D4AF37" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold">Solicitação enviada!</p>
              <p className="text-[#BFBFBF] text-sm">Entraremos em contato pelo e-mail informado em até 15 dias úteis.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label className="text-[#BFBFBF] text-sm font-medium block mb-1.5">Nome completo <span className="text-[#D4AF37]">*</span></label>
                <input type="text" value={form.full_name} onChange={set("full_name")} placeholder="Seu nome completo" className={inputClass("full_name")} />
                {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name}</p>}
              </div>

              <div>
                <label className="text-[#BFBFBF] text-sm font-medium block mb-1.5">E-mail <span className="text-[#D4AF37]">*</span></label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" className={inputClass("email")} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-[#BFBFBF] text-sm font-medium block mb-1.5">WhatsApp</label>
                <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder="(11) 99999-9999" className={inputClass("whatsapp")} />
              </div>

              <div>
                <label className="text-[#BFBFBF] text-sm font-medium block mb-1.5">Tipo de solicitação <span className="text-[#D4AF37]">*</span></label>
                <select value={form.request_type} onChange={set("request_type")} className={`${inputClass("request_type")} appearance-none`}>
                  <option value="">Selecione...</option>
                  {REQUEST_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.request_type && <p className="text-red-400 text-xs mt-1">{errors.request_type}</p>}
              </div>

              <div>
                <label className="text-[#BFBFBF] text-sm font-medium block mb-1.5">Sou um(a) <span className="text-[#D4AF37]">*</span></label>
                <select value={form.who_i_am} onChange={set("who_i_am")} className={`${inputClass("who_i_am")} appearance-none`}>
                  <option value="">Selecione...</option>
                  {WHO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.who_i_am && <p className="text-red-400 text-xs mt-1">{errors.who_i_am}</p>}
              </div>

              <div>
                <label className="text-[#BFBFBF] text-sm font-medium block mb-1.5">Mensagem adicional</label>
                <textarea value={form.message} onChange={set("message")} placeholder="Descreva detalhes da sua solicitação..." rows={4} className={`${inputClass("message")} resize-none`} />
              </div>

              {errors.form && <p className="text-red-400 text-sm">{errors.form}</p>}
              <p className="text-[#BFBFBF]/50 text-xs">* Campos obrigatórios</p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#D4AF37] hover:bg-[#B8860B] disabled:opacity-60 text-black font-semibold text-sm py-4 rounded-xl transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20"
              >
                {status === "loading" ? "Enviando..." : "Enviar solicitação →"}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
}
