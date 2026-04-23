export default function AurumLogo({ className = "h-12", variant = "auto" }) {
  const useSelo = variant === "selo" || (variant === "auto" && className.includes("h-8"));

  if (useSelo) {
    return (
      <img
        src="/aurum-selo.png"
        alt="Aurum"
        className={`${className} w-auto object-contain block`}
      />
    );
  }

  return (
    <img
      src="/aurum-logo.png"
      alt="Aurum — Grupo Fundado em Valor"
      className={`${className} w-auto object-contain block`}
    />
  );
}