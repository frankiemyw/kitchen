import { siteConfig } from "@/data/site";

export default function Location() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Visit or Contact Us
          </h2>
          <p className="text-lg text-charcoal-light">
            Want to dine in, ask about today&apos;s dishes, or place a catering
            inquiry? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Replace with embedded Google Map */}
          <div className="aspect-[4/3] lg:aspect-auto bg-warm-gray rounded-2xl flex items-center justify-center min-h-[300px]">
            <div className="text-center text-charcoal-light">
              <p className="text-sm mb-2">[Embed Google Map here]</p>
              <p className="text-xs">
                Replace with an iframe from Google Maps
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-red-brand uppercase tracking-wider mb-2">
                Address
              </h3>
              <p className="text-charcoal-light leading-relaxed">
                {siteConfig.address}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-brand uppercase tracking-wider mb-2">
                Business Hours
              </h3>
              <p className="text-charcoal-light">{siteConfig.hours}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-brand uppercase tracking-wider mb-2">
                Contact
              </h3>
              <div className="text-charcoal-light space-y-1">
                <p>
                  Tel:{" "}
                  {siteConfig.telephone.map((num, i) => (
                    <span key={num}>
                      {i > 0 && " / "}
                      <a
                        href={`tel:${num}`}
                        className="text-charcoal hover:text-red-brand transition-colors"
                      >
                        {num}
                      </a>
                    </span>
                  ))}
                </p>
                <p>
                  Mobile:{" "}
                  {siteConfig.mobile.map((num, i) => (
                    <span key={num}>
                      {i > 0 && " / "}
                      <a
                        href={`tel:${num}`}
                        className="text-charcoal hover:text-red-brand transition-colors"
                      >
                        {num}
                      </a>
                    </span>
                  ))}
                </p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  Facebook:{" "}
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    {siteConfig.facebookLabel}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.mobile[0]}`}
                className="bg-red-brand text-white px-6 py-3 rounded-full font-semibold hover:bg-red-dark transition-colors text-center"
              >
                Call Now
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-charcoal text-white px-6 py-3 rounded-full font-semibold hover:bg-charcoal-light transition-colors text-center"
              >
                Message Us
              </a>
              <a
                href="#contact"
                className="border-2 border-charcoal text-charcoal px-6 py-3 rounded-full font-semibold hover:bg-charcoal hover:text-white transition-colors text-center"
              >
                Find Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
