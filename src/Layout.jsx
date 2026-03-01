import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const META = {
  Home: {
    title: "Aurum — App de Finanças Pessoais e Investimentos | Lista de Espera",
    description:
      "Aurum é o app brasileiro de finanças pessoais e investimentos que organiza seu dinheiro e guia seus investimentos com inteligência. Entre na lista de espera e garanta acesso antecipado e benefícios exclusivos.",
    keywords: "app financeiro, finanças pessoais, investimentos, controle financeiro, liberdade financeira, app de investimentos, gestão financeira, lista de espera",
  },
  Obrigado: {
    title: "Cadastro Confirmado — Você está na lista de espera do Aurum",
    description:
      "Parabéns! Você garantiu seu lugar na lista de espera do Aurum. Fique atento ao seu e-mail para receber acesso antecipado e benefícios exclusivos do app de finanças.",
    keywords: "aurum app, lista de espera, acesso antecipado, finanças pessoais",
  },
  default: {
    title: "Aurum — Finanças Pessoais e Investimentos Inteligentes",
    description:
      "Construa sua liberdade financeira com clareza e segurança usando o Aurum, o app de finanças pessoais e investimentos.",
    keywords: "aurum, finanças pessoais, investimentos, app financeiro",
  },
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  useEffect(() => {
    const meta = META[currentPageName] || META.default;

    document.title = meta.title;
    document.documentElement.lang = "pt-BR";

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", meta.description);
    setMeta("keywords", meta.keywords || "");
    setMeta("robots", "index, follow");
    setMeta("author", "Aurum");
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:locale", "pt_BR", "property");
    setMeta("og:site_name", "Aurum", "property");
    setMeta("og:image", "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + location.pathname);

    // JSON-LD only on Home
    const existingLd = document.querySelector('script[type="application/ld+json"]');
    if (existingLd) existingLd.remove();
    if (currentPageName === "Home") {
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Aurum",
        description: "App de finanças pessoais e investimentos com inteligência.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "iOS, Android, Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        inLanguage: "pt-BR",
      });
      document.head.appendChild(ld);
    }
  }, [currentPageName, location.pathname]);

  return (
    <div className="bg-black min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
      `}</style>
      {children}
    </div>
  );
}