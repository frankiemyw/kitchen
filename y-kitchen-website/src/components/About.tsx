import { siteConfig } from "@/data/site";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dCT7ikxFnabUGrPMfknvAnR3Z5VDVu.png"
              alt="Y Kitchen chef cooking with flames in professional kitchen"
              className="w-full h-full object-cover"
            />
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
