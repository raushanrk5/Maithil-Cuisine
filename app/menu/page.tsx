import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuTabs from "./MenuTabs";
import CartBar from "../components/CartBar";

export const metadata = {
  title: "Menu — Maithil Cuisine",
  description: "Explore our full menu of authentic Maithili and North Indian dishes.",
};

export default function MenuPage() {
  return (
    <>
      <Navbar />

      {/* Page hero */}
      <section className="bg-brand-navy pt-28 pb-20 relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(139,32,32,0.25) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-brand-gold/40" />
            <span className="text-brand-gold/70 text-[10px] tracking-[0.45em] uppercase">
              Tradition of Taste
            </span>
            <div className="h-px w-12 bg-brand-gold/40" />
          </div>

          <h1 className="text-white text-4xl sm:text-6xl font-bold mb-4 leading-tight">
            Our <span className="text-brand-gold">Menu</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            From morning breakfast to hearty mains — crafted with ancestral
            recipes and the finest ingredients.
          </p>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-brand-gold to-transparent" />
      </section>

      {/* Menu content */}
      <main className="bg-brand-cream min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <MenuTabs />
        </div>
      </main>

      {/* Back to home */}
      <div className="bg-brand-cream pb-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-navy/50 hover:text-brand-crimson text-sm font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <Footer />
      <CartBar />
    </>
  );
}
