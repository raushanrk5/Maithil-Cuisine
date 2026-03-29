export default function FeaturesSection() {
  return (
    <section className="bg-brand-cream py-20 sm:py-28 relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-brand-gold/50" />
            <span className="text-brand-gold text-xs tracking-[0.35em] uppercase font-medium">
              Why Choose Us
            </span>
            <div className="h-px w-12 bg-brand-gold/50" />
          </div>
          <h2 className="text-brand-navy text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What Makes Us <span className="text-brand-gold">Special</span>
          </h2>
          <p className="text-brand-navy/50 text-base sm:text-lg max-w-xl mx-auto">
            Two promises we make to every guest who walks through our door.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {/* Card 1 — Separate Floors */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-brand-cream-dark group">
            {/* Top accent — split green and red */}
            <div className="flex h-2">
              <div className="flex-1 bg-green-500" />
              <div className="flex-1 bg-brand-crimson" />
            </div>

            <div className="p-8 sm:p-10">
              {/* Icons */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">🌿</span>
                <div className="w-px h-10 bg-brand-navy/10" />
                <span className="text-5xl">🍗</span>
              </div>

              {/* Big stat */}
              <div className="mb-4">
                <span
                  className="font-black text-brand-navy leading-none"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
                >
                  2
                </span>
                <span className="text-brand-navy/40 font-bold text-xl sm:text-2xl ml-3 align-bottom">
                  Dedicated Floors
                </span>
              </div>

              {/* Title */}
              <h3 className="text-brand-navy font-bold text-xl sm:text-2xl mb-2 leading-snug">
                Separate Floors for<br />Veg &amp; Non-Veg Dining
              </h3>

              {/* Hindi */}
              <p className="text-brand-crimson font-medium text-base sm:text-lg mb-5">
                शाकाहारी और मांसाहारी के लिए अलग-अलग फ्लोर
              </p>

              <div className="h-px bg-brand-navy/8 mb-5" />

              {/* Description */}
              <p className="text-brand-navy/60 text-sm sm:text-base leading-relaxed">
                We respect every diner&apos;s preference. Dedicated floors for pure
                vegetarian and non-vegetarian dining — so you always eat with
                complete peace of mind.
              </p>

              {/* Badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-brand-navy/5 border border-brand-navy/10 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-brand-navy/70 text-xs font-semibold tracking-wide uppercase">
                  Unique in Jhanjharpur
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 — Free Delivery */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-brand-cream-dark group">
            {/* Top accent — gold */}
            <div className="h-2 bg-brand-gold" />

            <div className="p-8 sm:p-10">
              {/* Icon */}
              <div className="text-5xl mb-6">🛵</div>

              {/* Big stat */}
              <div className="mb-4">
                <span
                  className="font-black text-brand-navy leading-none"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
                >
                  5
                </span>
                <span className="text-brand-navy/40 font-bold text-xl sm:text-2xl ml-3 align-bottom">
                  KM Free Delivery
                </span>
              </div>

              {/* Title */}
              <h3 className="text-brand-navy font-bold text-xl sm:text-2xl mb-2 leading-snug">
                Free Home Delivery<br />to Your Doorstep
              </h3>

              {/* Hindi */}
              <p className="text-brand-crimson font-medium text-base sm:text-lg mb-5">
                5 किमी के दायरे में मुफ्त होम डिलीवरी
              </p>

              <div className="h-px bg-brand-navy/8 mb-5" />

              {/* Description */}
              <p className="text-brand-navy/60 text-sm sm:text-base leading-relaxed">
                Hot, fresh Maithili food delivered right to your doorstep —
                absolutely free within a 5 km radius. Call or WhatsApp us to
                place your order.
              </p>

              {/* CTA */}
              <a
                href="tel:+917563042905"
                className="mt-6 inline-flex items-center gap-2 bg-brand-crimson text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-crimson-light transition-colors"
              >
                📞 Order Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
