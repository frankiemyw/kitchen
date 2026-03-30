import { cateringTrays } from "@/data/catering";
import { siteConfig } from "@/data/site";

export default function Catering() {
  return (
    <section id="catering" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            Party Trays and Group Orders
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto">
            Planning a team lunch, office meal, or simple celebration? Our trays
            are practical, delicious, and easy to order for groups of any size.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {cateringTrays.map((tray) => (
            <div
              key={tray.name}
              className="bg-warm-white rounded-2xl overflow-hidden border border-warm-border hover:shadow-md transition-shadow"
            >
              {/* Replace with actual tray photo */}
              <div className="aspect-[5/3] bg-warm-gray flex items-center justify-center">
                <span className="text-sm text-charcoal-muted">
                  [Photo: {tray.name}]
                </span>
              </div>
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
            Need trays for your team or event?
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm sm:text-base">
            We work with offices, agencies, and organizations of all sizes.
            Tell us how many people and we&apos;ll handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-charcoal px-7 py-3.5 rounded-full text-base font-semibold hover:bg-gold-light transition-colors"
            >
              Message Us on Facebook
            </a>
            <a
              href={`tel:${siteConfig.mobile[0]}`}
              className="bg-white/10 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Call for Group Orders
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
