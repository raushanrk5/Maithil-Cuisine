export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy pt-24 sm:pt-28">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,32,32,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="h-px w-8 sm:w-16 bg-brand-gold/60" />
          <span className="text-brand-gold text-sm sm:text-base font-medium">
            मिथिलाक शुद्ध आ सात्विक स्वाद, अब झंझारपुर मे!
          </span>
          <div className="h-px w-8 sm:w-16 bg-brand-gold/60" />
        </div>

        {/* Main title */}
        <h1
          className="text-brand-gold font-bold leading-none mb-3"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
        >
          मैथिल
        </h1>
        <h2 className="text-white text-xl sm:text-3xl md:text-4xl font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-8">
          Cuisine
        </h2>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="h-px w-8 sm:w-10 bg-brand-gold/50" />
          <p className="text-white text-sm sm:text-base font-medium">
            मिथिला क स्वाद, अब नये अंदाज मे!
          </p>
          <div className="h-px w-8 sm:w-10 bg-brand-gold/50" />
        </div>

        <p className="text-white/75 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed">
          क्या आप मिथिला की पारंपरिक स्वाद की तलाश में हैं? मैथिल Cuisine लेकर आया है मिथिला की मिट्टी की खुशबू और वही पुराना घर जैसा स्वाद।
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <a
            href="#menu"
            className="w-full sm:w-auto bg-brand-gold text-brand-navy px-8 sm:px-9 py-4 rounded-full font-bold text-base tracking-wide hover:bg-brand-gold-light transition-colors shadow-lg text-center"
          >
            Explore Our Menu
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto border border-white/30 text-white px-8 sm:px-9 py-4 rounded-full font-medium text-base tracking-wide hover:bg-white/10 transition-colors text-center"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-brand-gold to-transparent" />
    </section>
  );
}
