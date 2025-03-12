import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section";
import ProductList from "@/components/ui/product-list";
import VerificationDemo from "@/components/ui/verification-demo";
import FarmerList from "@/components/ui/farmer-list";
import Testimonials from "@/components/ui/testimonials";
import CallToAction from "@/components/ui/call-to-action";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ProductList />
        <VerificationDemo />
        <FarmerList />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
