import { BookingSection } from "../components/home/BookingSection";
import { FinalCtaSection } from "../components/home/FinalCtaSection";
import { HeroSection } from "../components/home/HeroSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { TrustSection } from "../components/home/TrustSection";

const Home = () => {
  return (
    <main className="overflow-hidden bg-[#f6f9fb] text-[#102a43]">
      <HeroSection />
      <BookingSection />
      <HowItWorksSection />
      <TrustSection />
      <FinalCtaSection />
    </main>
  );
};

export default Home;