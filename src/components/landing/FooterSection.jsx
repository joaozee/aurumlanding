import AurumLogo from "./AurumLogo";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/grupoaurum1/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com/company/grupo-aurum1/", label: "LinkedIn", Icon: LinkedInIcon },
];

export default function FooterSection() {
  return (
    <footer className="bg-black border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <AurumLogo className="h-8" variant="selo" loading="lazy" />

          {/* Links sociais */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#BFBFBF]/40 hover:text-[#D4AF37] transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Direitos + voltar ao topo */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[#D4AF37]/50 hover:text-[#D4AF37] text-xs transition-colors duration-200 outline-none"
            >
              ↑ Voltar ao topo
            </button>
            <p className="text-[#BFBFBF]/30 text-xs">
              © 2026 Aurum. Todos os direitos reservados.
            </p>
            <a
              href="/politica-de-privacidade"
              className="text-[#D4AF37]/40 hover:text-[#D4AF37] text-xs underline underline-offset-2 transition-colors"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}