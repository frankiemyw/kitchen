import { cateringTrays } from "@/data/catering";
import { siteConfig } from "@/data/site";
import { cateringSection } from "@/data/content";

export default function Catering() {
  return (
    <section id="catering" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            {cateringSection.heading}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto">
            {cateringSection.description}
          </p>
        </div>

        {/* Catering Gallery Showcase */}
        <div className="mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%20%281%29-0PL7MXSNp0cvDgFZu6szjnHElyfSFA.png"
              alt="Y Kitchen catering services showcasing buffet setups, party trays, and various Filipino dishes for events and celebrations"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
          <p className="text-center text-sm text-charcoal-muted mt-4">
            From corporate events to celebrations, we bring delicious Filipino food to your gatherings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {cateringTrays.map((tray) => (
            <div
              key={tray.name}
              className="bg-warm-white rounded-2xl overflow-hidden border border-warm-border hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <h3 className="text-base font-semibold text-charcoal mb-1">
                  {tray.name}
                </h3>
                <p className="text-xs font-medium text-red-brand mb-2">
                  {tray.serving}
                </p>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {tray.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-charcoal rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {cateringSection.ctaHeading}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm sm:text-base">
            {cateringSection.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-charcoal px-7 py-3.5 rounded-full text-base font-semibold hover:bg-gold-light transition-colors"
            >
              {cateringSection.primaryButton}
            </a>
            <a
              href={`tel:${siteConfig.mobile[0]}`}
              className="bg-white/10 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              {cateringSection.secondaryButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
