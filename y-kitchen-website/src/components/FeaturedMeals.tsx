const featured = [
  {
    name: "Chicken Adobo",
    description: "Classic braised chicken in soy-vinegar sauce, served with steamed rice.",
    price: "₱99",
    tag: "Best Seller",
  },
  {
    name: "Pork Sinigang",
    description: "Tangy tamarind soup with tender pork and fresh vegetables.",
    price: "₱99",
    tag: "Customer Favorite",
  },
  {
    name: "Bistek Tagalog + Pinakbet",
    description: "Soy-citrus beef with sautéed mixed vegetables. Two dishes, one great meal.",
    price: "₱129",
    tag: "Value Meal",
  },
];

export default function FeaturedMeals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Featured Meals
          </h2>
          <p className="text-lg text-charcoal-light">
            A taste of what&apos;s waiting for you at Y Kitchen.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((meal) => (
            <div
              key={meal.name}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-warm-gray flex items-center justify-center relative">
                <span className="text-charcoal-light text-sm">
                  [Food photo: {meal.name}]
                </span>
                {meal.tag && (
                  <span className="absolute top-3 left-3 bg-red-brand text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {meal.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-charcoal">
                    {meal.name}
                  </h3>
                  <span className="text-lg font-bold text-red-brand whitespace-nowrap ml-3">
                    {meal.price}
                  </span>
                </div>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {meal.description}
                </p>
                <p className="text-xs text-gold mt-3 font-medium">
                  Includes rice + free soup & water
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
