import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import MenuSection from "./components/MenuSection";
import AboutSection from "./components/AboutSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <MenuSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
