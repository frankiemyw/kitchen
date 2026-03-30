import { featuredMeals } from "@/data/menu";
import { featuredSection } from "@/data/content";

export default function FeaturedMeals() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            {featuredSection.heading}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto">
            {featuredSection.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredMeals.map((meal) => (
            <div
              key={meal.name}
              className="group rounded-2xl overflow-hidden border border-warm-border hover:shadow-lg transition-shadow bg-white"
            >
              {/* Replace with actual food photo */}
              <div className="aspect-[4/3] bg-warm-gray flex items-center justify-center relative">
                <span className="text-charcoal-muted text-sm">
                  [Photo: {meal.name}]
                </span>
                <span className="absolute bottom-3 right-3 bg-charcoal text-white text-sm font-bold px-3 py-1 rounded-full">
                  {meal.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-charcoal mb-1.5">
                  {meal.name}
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {meal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
