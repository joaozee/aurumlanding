export default function AurumLogo({ className = "h-12", variant = "auto", loading = "lazy" }) {
  const useSelo = variant === "selo" || (variant === "auto" && className.includes("h-8"));

  if (useSelo) {
    return (
      <img
        src="/aurum-selo.png"
        alt="Aurum"
        loading={loading}
        className={`${className} w-auto object-contain block`}
      />
    );
  }

  return (
    <img
      src="/aurum-logo.png"
      alt="Aurum — Grupo Fundado em Valor"
      loading={loading}
      className={`${className} w-auto object-contain block`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}