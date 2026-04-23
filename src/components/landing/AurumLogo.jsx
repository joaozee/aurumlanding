export default function AurumLogo({ className = "h-12" }) {
  return (
    <img
      src="/aurum-logo.png"
      alt="Aurum - Grupo Fundado em Valor"
      className={`${className} w-auto object-contain block`}
    />
  );
}