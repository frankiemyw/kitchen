export default function About() {
  return (
    <section id="about" className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="aspect-[4/3] bg-warm-gray rounded-2xl flex items-center justify-center order-2 lg:order-1">
            <span className="text-charcoal-light text-sm">
              [Photo: Y Kitchen interior or team]
            </span>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              About Y Kitchen
            </h2>
            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                Y Kitchen was built on a simple belief: everyone deserves a
                freshly-cooked, honest meal without breaking the bank. We serve
                the everyday Filipino favorites you grew up with — the kind of
                food that feels like home.
              </p>
              <p>
                Our kitchen opens early and cooks everything fresh, every day.
                From classic adobo to comforting sinigang and hearty caldereta,
                every dish is prepared with care using quality ingredients. No
                shortcuts, no compromises.
              </p>
              <p>
                We proudly serve government agencies, LGUs, corporations, office
                workers, and condo residents. Whether it&apos;s a daily canteen
                setup, a corporate meeting, or party trays for a weekend
                celebration — Y Kitchen delivers.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-brand">Fresh</div>
                <div className="text-xs text-charcoal-light mt-1">
                  Cooked Daily
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-brand">₱90</div>
                <div className="text-xs text-charcoal-light mt-1">
                  Starting Price
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-brand">100%</div>
                <div className="text-xs text-charcoal-light mt-1">
                  Filipino Flavors
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
