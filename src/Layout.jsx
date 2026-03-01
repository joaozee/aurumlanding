import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const META = {
  Home: {
    title: "Aurum — Organize suas finanças e invista com inteligência",
    description:
      "Aurum é o app que vai organizar suas finanças e guiar seus investimentos com inteligência, tudo em um só lugar. Entre para a lista de espera e garanta acesso antecipado.",
  },
  Obrigado: {
    title: "Obrigado! Você está na lista — Aurum",
    description:
      "Você entrou para a lista de espera do Aurum. Em breve você receberá novidades e acesso antecipado ao app.",
  },
  default: {
    title: "Aurum — Finanças Pessoais e Investimentos",
    description:
      "Construa sua liberdade financeira com clareza e segurança usando o Aurum.",
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
    setMeta("robots", "index, follow");
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:locale", "pt_BR", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);

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