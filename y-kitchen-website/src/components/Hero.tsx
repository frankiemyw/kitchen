import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center bg-charcoal pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/80 to-charcoal" />
      {/* Replace with a real hero photo of your food or kitchen */}
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/15 text-gold-light text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Dine-in, takeout, and catering
        </div>

        <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          Affordable Filipino Meals
          <br />
          <span className="text-gold">for Everyday Cravings</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Satisfying Filipino food for busy workers, nearby residents, and group
          orders. From meal sets to party trays, we make good food easy and
          enjoyable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href={`tel:${siteConfig.mobile[0]}`}
            className="bg-red-brand text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-red-dark transition-colors shadow-lg shadow-red-brand/20"
          >
            Order Now
          </a>
          <a
            href="#menu"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            View Menu
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <span>Budget-friendly meals</span>
          <span className="hidden sm:inline text-gray-600">&middot;</span>
          <span>Good for daily lunch</span>
          <span className="hidden sm:inline text-gray-600">&middot;</span>
          <span>Catering available</span>
        </div>
      </div>
    </section>
  );
}
