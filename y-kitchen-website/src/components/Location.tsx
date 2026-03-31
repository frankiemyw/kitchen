import { siteConfig } from "@/data/site";
import { contactSection } from "@/data/content";

export default function Location() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            {contactSection.heading}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto">
            {contactSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[4/3] lg:aspect-auto bg-warm-gray rounded-2xl overflow-hidden min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.346202388079!2d121.05027827509689!3d14.579338177596894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9063fc7ca09%3A0xc8578c23a7e2b191!2sY%20Kitchen!5e0!3m2!1sen!2sph!4v1774922878997!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Y Kitchen Location Map"
              className="w-full h-full min-h-[320px]"
            />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-warm-white rounded-xl p-5 border border-warm-border">
                <h3 className="text-xs font-semibold text-red-brand uppercase tracking-wider mb-2">
                  Address
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>
              <div className="bg-warm-white rounded-xl p-5 border border-warm-border">
                <h3 className="text-xs font-semibold text-red-brand uppercase tracking-wider mb-2">
                  Business Hours
                </h3>
                <p className="text-sm text-charcoal-muted">{siteConfig.hours}</p>
              </div>
            </div>

            <div className="bg-warm-white rounded-xl p-5 border border-warm-border">
              <h3 className="text-xs font-semibold text-red-brand uppercase tracking-wider mb-3">
                Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-charcoal-muted text-xs block mb-0.5">Telephone</span>
                  {siteConfig.telephone.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num}`}
                      className="block text-charcoal hover:text-red-brand transition-colors"
                    >
                      {num}
                    </a>
                  ))}
                </div>
                <div>
                  <span className="text-charcoal-muted text-xs block mb-0.5">Mobile</span>
                  {siteConfig.mobile.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num}`}
                      className="block text-charcoal hover:text-red-brand transition-colors"
                    >
                      {num}
                    </a>
                  ))}
                </div>
                <div>
                  <span className="text-charcoal-muted text-xs block mb-0.5">Email</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <span className="text-charcoal-muted text-xs block mb-0.5">Facebook</span>
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    {siteConfig.facebookLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.mobile[0]}`}
                className="flex-1 bg-red-brand text-white px-6 py-3 rounded-full font-semibold hover:bg-red-dark transition-colors text-center text-sm"
              >
                Call Now
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-charcoal text-white px-6 py-3 rounded-full font-semibold hover:bg-charcoal-light transition-colors text-center text-sm"
              >
                Message Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
