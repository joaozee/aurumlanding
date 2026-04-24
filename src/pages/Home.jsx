import { useRef } from "react";
import HeroSection from "../components/landing/HeroSection";
import ProblemSection from "../components/landing/ProblemSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import AudienceSection from "../components/landing/AudienceSection";
import CTABanner from "../components/landing/CTABanner";
import WaitlistForm from "../components/landing/WaitlistForm";
import FooterSection from "../components/landing/FooterSection";
import NavBar from "../components/landing/NavBar";

export default function Home() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-black min-h-screen font-sans antialiased">
      <NavBar onCTAClick={scrollToForm} />
      <div style={{ position: "relative", zIndex: 0, isolation: "isolate" }}>
        <HeroSection onCTAClick={scrollToForm} />
        <ProblemSection />
        <FeaturesSection />
        <AudienceSection />
        <CTABanner onCTAClick={scrollToForm} />
        <WaitlistForm formRef={formRef} />
        <FooterSection />
      </div>
    </div>
  );
}
