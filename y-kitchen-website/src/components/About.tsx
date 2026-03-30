export default function About() {
  return (
    <section id="about" className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Replace with photo of Y Kitchen interior, food spread, or team */}
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
                Y Kitchen is built for people who want good Filipino food at
                reasonable prices. We serve everyday meals that are practical,
                satisfying, and easy to enjoy — whether you are dining in,
                picking up a quick lunch, or ordering food for a group. Our goal
                is simple: to offer honest food, fair prices, and a reliable
                experience for the community we serve.
              </p>
              <p>
                We believe that everyday dining should feel easy, enjoyable, and
                worth coming back for. That is why we focus on familiar flavors,
                convenient meal options, and service that helps customers get
                what they need without hassle.
              </p>
            </div>
            <p className="mt-6 text-lg font-semibold text-charcoal">
              Good food. Fair prices. Easy ordering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
