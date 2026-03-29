import { getPlaceData } from "../lib/google-places";

const highlights = [
  { icon: "🐟", text: "मिथिलाक माछ (Fish Curry) — सरसों के पारंपरिक मसालों के साथ" },
  { icon: "🥛", text: "दही-चूड़ा-चीनी — मिथिला का गौरव और शुद्ध जलपान" },
  { icon: "🍱", text: "सकपैता, तरुआ और ओल क चटनी — पूर्ण पारंपरिक थाली" },
  { icon: "🍮", text: "मखानक खीर — ताजे मखानों से बनी मखमली मिठास" },
  { icon: "🌿", text: "Separate floors for Veg & Non-Veg dining" },
  { icon: "🛵", text: "Free home delivery within 5 km radius" },
];

export default async function AboutSection() {
  const placeData = await getPlaceData();
  const rating = placeData ? `${placeData.rating.toFixed(1)}★` : "5★";

  const stats = [
    { value: "50+", label: "Authentic Dishes" },
    { value: rating, label: "Customer Rating" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text side */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-brand-gold" />
              <span className="text-brand-gold text-xs tracking-[0.35em] uppercase font-medium">
                Our Story
              </span>
            </div>
            <p className="text-brand-gold/80 text-lg sm:text-xl font-semibold mb-3 tracking-wide">
              अतिथि देवों भव 🙏
            </p>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Taste of{" "}
              <span className="text-brand-gold">Mithila</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-5">
              आउ, मिथिलाक माटि क स्वाद आ परंपरा क एक संग उत्सव मनाबी। मैथिल Cuisine
              आपके लिए लेकर आया है मिथिला की मिट्टी की खुशबू और वही पुराना घर जैसा स्वाद।
            </p>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-5">
              पग-पग पोखर, माखान, सरव सरस योल — Mithila&apos;s rich culinary soul lives in
              every dish we serve. From mustard-spiced fish curries to velvety makhana
              kheer, each plate tells a story passed down through generations.
            </p>
            <blockquote className="border-l-2 border-brand-gold pl-4 mb-10">
              <p className="text-brand-gold/90 italic text-base sm:text-lg leading-relaxed">
                &ldquo;भोजन मात्र पेट भरब नै, एकटा संस्कार थिक।&rdquo;
              </p>
              <p className="text-white/40 text-sm mt-1">
                Food is not just nourishment — it is a culture.
              </p>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-brand-gold text-2xl sm:text-3xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-[11px] sm:text-xs tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card — with padding to show corner accents */}
          <div className="relative p-4">
            <div className="absolute top-1 left-1 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
            <div className="absolute top-1 right-1 w-8 h-8 border-t-2 border-r-2 border-brand-gold" />
            <div className="absolute bottom-1 left-1 w-8 h-8 border-b-2 border-l-2 border-brand-gold" />
            <div className="absolute bottom-1 right-1 w-8 h-8 border-b-2 border-r-2 border-brand-gold" />

            <div className="bg-brand-crimson rounded-2xl p-6 sm:p-8 border border-brand-gold/25">
              <h3 className="text-brand-gold text-xl font-bold mb-6 text-center tracking-wide">
                Why Maithil Cuisine?
              </h3>
              <ul className="space-y-4 sm:space-y-5">
                {highlights.map((item) => (
                  <li key={item.text} className="flex items-start gap-4">
                    <span className="text-xl sm:text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <span className="text-white/80 text-sm leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
