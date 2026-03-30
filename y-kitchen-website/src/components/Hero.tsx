export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center bg-charcoal pt-16"
    >
      {/* Background overlay — replace with real hero image */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-90" />
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <span className="inline-block bg-gold/20 text-gold-light text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Filipino Comfort Food
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Masarap, Mura, at
          <br />
          <span className="text-gold">Laging Fresh</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Everyday Filipino meals starting at just{" "}
          <strong className="text-white">₱99</strong> — with free soup and
          water. Perfect for lunch, merienda, or your next office meeting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-red-brand text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-red-dark transition-colors"
          >
            View Our Menu
          </a>
          <a
            href="#catering"
            className="border-2 border-gold text-gold px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold hover:text-charcoal transition-colors"
          >
            Inquire for Catering
          </a>
        </div>
      </div>
    </section>
  );
}
