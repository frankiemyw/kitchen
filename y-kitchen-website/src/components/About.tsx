export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Replace with photo of Y Kitchen interior, food spread, or team */}
          <div className="aspect-[4/3] bg-warm-gray rounded-2xl flex items-center justify-center order-2 lg:order-1">
            <span className="text-charcoal-muted text-sm">
              [Photo: Y Kitchen interior or team]
            </span>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-red-brand uppercase tracking-wider mb-3">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6 tracking-tight">
              About Y Kitchen
            </h2>
            <div className="space-y-4 text-charcoal-muted leading-relaxed">
              <p>
                Y Kitchen is built for people who want good Filipino food at
                reasonable prices. We serve everyday meals that are practical,
                satisfying, and easy to enjoy — whether you are dining in,
                picking up a quick lunch, or ordering food for a group.
              </p>
              <p>
                Our goal is simple: honest food, fair prices, and a reliable
                experience for the community we serve. We believe everyday
                dining should feel easy, enjoyable, and worth coming back for.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-warm-border">
              <p className="text-lg font-semibold text-charcoal tracking-tight">
                Good food. Fair prices. Easy ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
