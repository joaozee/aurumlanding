export default function FooterSection() {
  return (
    <footer className="bg-black border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-lg">AURUM</span>
        <p className="text-[#BFBFBF]/40 text-xs text-center">
          © 2026 Aurum. Todos os direitos reservados.
        </p>
        <p className="text-[#BFBFBF]/40 text-xs">
          Construindo liberdade financeira.
        </p>
      </div>
    </footer>
  );
}