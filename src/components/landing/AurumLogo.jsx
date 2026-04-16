export default function AurumLogo({ className = "h-12" }) {
  return (
    <span className={`${className} flex items-center`} style={{ minWidth: "80px" }}>
      <img
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg"
        alt="Aurum"
        className="h-full w-auto object-contain"
        style={{ mixBlendMode: "lighten" }}
        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
      />
      <span style={{ display: "none" }} className="text-[#D4AF37] font-bold text-xl tracking-widest">AURUM</span>
    </span>
  );
}