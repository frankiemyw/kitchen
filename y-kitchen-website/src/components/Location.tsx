export default function Location() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Come Visit Us
          </h2>
          <p className="text-lg text-charcoal-light">
            Drop by for a meal, or get in touch if you need catering.
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map placeholder — replace with a Google Maps embed */}
          <div className="aspect-[4/3] lg:aspect-auto bg-warm-gray rounded-2xl flex items-center justify-center min-h-[300px]">
            <div className="text-center text-charcoal-light">
              <p className="text-sm mb-2">
                [Embed Google Map here]
              </p>
              <p className="text-xs">
                Replace with an iframe from Google Maps
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-red-brand uppercase tracking-wider mb-2">
                Where We Are
              </h3>
              <p className="text-charcoal-light leading-relaxed">
                {/* REPLACE: Put your actual address here */}
                [Your Street Address]
                <br />
                [Barangay, City, Province]
                <br />
                Philippines
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-brand uppercase tracking-wider mb-2">
                When We&apos;re Open
              </h3>
              <div className="text-charcoal-light space-y-1">
                <p>Monday – Saturday: 7:00 AM – 7:00 PM</p>
                <p>Sunday: 8:00 AM – 5:00 PM</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-brand uppercase tracking-wider mb-2">
                Get in Touch
              </h3>
              <div className="text-charcoal-light space-y-1">
                {/* REPLACE: Put your real contact details here */}
                <p>
                  Phone:{" "}
                  <a
                    href="tel:[YOUR-PHONE-NUMBER]"
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    [Your Phone Number]
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:[YOUR-EMAIL]"
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    [your@email.com]
                  </a>
                </p>
                <p>
                  Facebook:{" "}
                  <a
                    href="#"
                    className="text-charcoal hover:text-red-brand transition-colors"
                  >
                    [Your Facebook Page]
                  </a>
                </p>
              </div>
            </div>

            <a
              href="tel:[YOUR-PHONE-NUMBER]"
              className="inline-block bg-red-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-red-dark transition-colors"
            >
              Call to Order
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
