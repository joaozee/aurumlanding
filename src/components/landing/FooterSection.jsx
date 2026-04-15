export default function FooterSection() {
  return (
    <footer className="bg-black border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg" alt="Aurum" className="h-8 w-auto object-contain" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#BFBFBF]/40 text-xs text-center">
            © 2026 Aurum. Todos os direitos reservados.
          </p>
          <a href="/politica-de-privacidade" className="text-[#D4AF37]/60 hover:text-[#D4AF37] text-xs underline underline-offset-2 transition-colors">
            Política de Privacidade
          </a>
        </div>
        <p className="text-[#BFBFBF]/40 text-xs">
          Construindo liberdade financeira.
        </p>
      </div>
    </footer>
  );
}