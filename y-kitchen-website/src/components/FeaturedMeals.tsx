import { featuredMeals } from "@/data/menu";

export default function FeaturedMeals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Customer Favorites
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            From Filipino classics to practical set meals, these are some of the
            options customers can enjoy at Y Kitchen.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMeals.map((meal) => (
            <div
              key={meal.name}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Replace with actual food photo */}
              <div className="aspect-[4/3] bg-warm-gray flex items-center justify-center">
                <span className="text-charcoal-light text-sm">
                  [Photo: {meal.name}]
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-charcoal">
                    {meal.name}
                  </h3>
                  <span className="text-base font-bold text-red-brand whitespace-nowrap ml-3">
                    {meal.price}
                  </span>
                </div>
                <p className="text-sm text-charcoal-light leading-relaxed">
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
