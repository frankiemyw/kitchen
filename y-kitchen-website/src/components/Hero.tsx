import { siteConfig } from "@/data/site";
import { hero } from "@/data/content";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center bg-charcoal pt-16"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czpEq6x1iULaikgOlfkVHbv73exwmT.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/80" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/15 text-gold-light text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          {hero.badge}
        </div>

        <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          {hero.headline}
          <br />
          <span className="text-gold">{hero.headlineAccent}</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href={`tel:${siteConfig.mobile[0]}`}
            className="bg-red-brand text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-red-dark transition-colors shadow-lg shadow-red-brand/20"
          >
            {hero.primaryButton}
          </a>
          <a
            href="#menu"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            {hero.secondaryButton}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          {hero.highlights.map((text, i) => (
            <span key={text}>
              {i > 0 && (
                <span className="hidden sm:inline text-gray-600 mr-6">
                  &middot;
                </span>
              )}
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
