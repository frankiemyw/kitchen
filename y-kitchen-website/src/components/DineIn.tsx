export default function DineIn() {
  return (
    <section id="dine-in" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            Dine-In
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto">
            Enjoy affordable and freshly prepared meals at Y Kitchen in a clean,
            comfortable, and welcoming dine-in space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-warm-white rounded-xl p-6 border border-warm-border">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Affordable Meals
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Budget-friendly meal options for workers, residents, and students.
            </p>
          </div>

          <div className="bg-warm-white rounded-xl p-6 border border-warm-border">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Freshly Prepared
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Daily dishes made to serve satisfying Filipino comfort food.
            </p>
          </div>

          <div className="bg-warm-white rounded-xl p-6 border border-warm-border">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Convenient Location
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Easy to visit for lunch, dinner, and casual meetups in Mandaluyong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
