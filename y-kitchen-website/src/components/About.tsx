import { siteConfig } from "@/data/site";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Replace with photo of Y Kitchen interior, food spread, or team */}
          <div className="aspect-[4/3] bg-warm-gray rounded-2xl flex items-center justify-center order-2 lg:order-1">
            <span className="text-charcoal-muted text-sm">
              [Photo: {siteConfig.businessName} interior or team]
            </span>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-red-brand uppercase tracking-wider mb-3">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6 tracking-tight">
              {about.heading}
            </h2>
            <div className="space-y-4 text-charcoal-muted leading-relaxed">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-warm-border">
              <p className="text-lg font-semibold text-charcoal tracking-tight">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
