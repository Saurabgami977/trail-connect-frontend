import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import RegionsSection from "@/components/home/RegionsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedGuidesSection from "@/components/home/FeaturedGuidesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import LiveNotificationBanner from "@/components/home/LiveNotificationBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <RegionsSection />
        <HowItWorksSection />
        <FeaturedGuidesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <LiveNotificationBanner />
    </div>
  );
};

export default Index;
