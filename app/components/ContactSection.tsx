// Paste your Google Maps embed src URL here
// How to get it: Google Maps → your listing → Share → "Embed a map" → copy src="..."
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.728741877938!2d86.28459757634171!3d26.270465777035746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee796a4f3b665d%3A0xe39c2326ac394cc3!2sMAITHIL%20CUISINE!5e0!3m2!1sen!2sin!4v1774668339659!5m2!1sen!2sin";

const info = [
  {
    icon: "📍",
    title: "Location",
    lines: ["Mohna Road, Jhanjharpur", "Mahespura, Bihar — 847404"],
  },
  {
    icon: "🕐",
    title: "Hours",
    lines: ["Mon – Sat: 11am – 10pm", "Sunday: 11am – 11pm"],
  },
  {
    icon: "📞",
    title: "Contact",
    lines: ["+91 7563042905", "@therealtasteofmithila"],
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-[0.35em] uppercase font-medium">
              Find Us
            </span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h2 className="text-brand-crimson text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Visit Us
          </h2>
          <p className="text-brand-navy/65 text-base sm:text-lg max-w-md mx-auto">
            Come experience the warmth of a Maithili home — right here in your city.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Left — info + CTA */}
          <div className="flex flex-col gap-4">
            {info.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-brand-cream-dark flex items-center gap-5"
              >
                <div className="text-3xl shrink-0">{card.icon}</div>
                <div>
                  <h3 className="text-brand-navy font-bold text-base mb-1">
                    {card.title}
                  </h3>
                  {card.lines.map((line) => (
                    <p key={line} className="text-brand-navy/60 text-sm leading-6">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <a
              href="tel:+917563042905"
              className="mt-2 flex items-center justify-center gap-3 bg-brand-crimson text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-brand-crimson-light transition-colors shadow-lg"
            >
              📞 Reserve a Table
            </a>
          </div>

          {/* Right — Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-brand-cream-dark min-h-90 lg:min-h-0">
            {GOOGLE_MAPS_EMBED_URL ? (
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maithil Cuisine Location"
              />
            ) : (
              // Placeholder shown until embed URL is added
              <div className="w-full h-full min-h-90 bg-brand-navy flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div
                  className="absolute inset-0 opacity-[0.06] rounded-2xl"
                  style={{
                    backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <span className="text-5xl relative">📍</span>
                <div className="relative">
                  <p className="text-white font-semibold text-lg mb-1">Map coming soon</p>
                  <p className="text-white/40 text-sm">
                    Add your Google Maps embed URL in ContactSection.tsx
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
