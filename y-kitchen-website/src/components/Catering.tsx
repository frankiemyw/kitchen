import { cateringTrays } from "@/data/catering";
import { siteConfig } from "@/data/site";

export default function Catering() {
  return (
    <section id="catering" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Party Trays and Group Orders
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Planning a team lunch, office meal, meeting, or simple celebration?
            Y Kitchen offers practical and delicious tray options that are easy
            to order and good for sharing.
          </p>
        </div>
        <p className="text-base text-charcoal-light max-w-2xl mx-auto text-center mb-14">
          Our party trays are a convenient choice for offices, family
          gatherings, and small events. We focus on dishes that are familiar,
          satisfying, and easy to enjoy as a group.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cateringTrays.map((tray) => (
            <div
              key={tray.name}
              className="bg-warm-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Replace with actual tray photo */}
              <div className="aspect-[3/2] bg-warm-gray rounded-xl mb-4 flex items-center justify-center">
                <span className="text-sm text-charcoal-light">
                  [Photo: {tray.name}]
                </span>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-1">
                {tray.name}
              </h3>
              <p className="text-sm text-charcoal-light mb-2">{tray.serving}</p>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {tray.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-charcoal rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Interested in Party Trays or Group Orders?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-charcoal px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Message Us for Catering Inquiries
            </a>
            <a
              href={`tel:${siteConfig.mobile[0]}`}
              className="border-2 border-white text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-white hover:text-charcoal transition-colors"
            >
              Ask About Group Orders
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
