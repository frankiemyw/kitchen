export default function About() {
  return (
    <section id="about" className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder — replace with photo of kitchen, team, or food spread */}
          <div className="aspect-[4/3] bg-warm-gray rounded-2xl flex items-center justify-center order-2 lg:order-1">
            <span className="text-charcoal-light text-sm">
              [Photo: Y Kitchen interior or team]
            </span>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              The Story Behind Y Kitchen
            </h2>
            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                We started Y Kitchen because we noticed something: a lot of
                people around here — office workers, government employees,
                busy professionals — just wanted a decent, home-cooked meal
                at lunchtime. Not fast food. Not overpriced. Just good Filipino
                food, served fresh.
              </p>
              <p>
                So that&apos;s what we do. We wake up early, prep our
                ingredients, and cook everything from scratch each morning.
                Adobo, sinigang, caldereta, pinakbet — the dishes you already
                know and love, made the way they&apos;re supposed to taste.
              </p>
              <p>
                Over time, offices started calling us for meetings. Then
                agencies and corporations. Now we handle everything from daily
                canteen setups to party trays for 100+ people. But the food is
                still the same — honest, freshly-cooked, and never overpriced.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-brand">Fresh</div>
                <div className="text-xs text-charcoal-light mt-1">
                  Every Morning
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-brand">₱90</div>
                <div className="text-xs text-charcoal-light mt-1">
                  Starts Here
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-brand">100%</div>
                <div className="text-xs text-charcoal-light mt-1">
                  Lutong Pinoy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
