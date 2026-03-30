import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center bg-charcoal pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-90" />
      {/* Replace with a real hero photo of your food or kitchen */}
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Affordable Filipino Meals
          <br />
          <span className="text-gold">for Everyday Cravings</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Y Kitchen serves satisfying Filipino food for busy workers, nearby
          residents, and group orders. From dine-in meal sets to party trays
          for sharing, we make good food easy, practical, and enjoyable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href={`tel:${siteConfig.mobile[0]}`}
            className="bg-red-brand text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-red-dark transition-colors"
          >
            Order Now
          </a>
          <a
            href="#menu"
            className="border-2 border-gold text-gold px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold hover:text-charcoal transition-colors"
          >
            View Menu
          </a>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Dine-in, takeout, and catering made simple.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-white/10 text-gray-300 text-xs font-medium px-4 py-2 rounded-full">
            Budget-friendly meals
          </span>
          <span className="bg-white/10 text-gray-300 text-xs font-medium px-4 py-2 rounded-full">
            Good for daily lunch
          </span>
          <span className="bg-white/10 text-gray-300 text-xs font-medium px-4 py-2 rounded-full">
            Catering available
          </span>
        </div>
      </div>
    </section>
  );
}
