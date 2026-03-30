const featured = [
  {
    name: "Chicken Adobo + Rice",
    description:
      "The one everybody orders. Tender chicken slow-cooked in soy, vinegar, and garlic — salty, savory, and just right with hot rice.",
    price: "₱109",
    tag: "Best Seller",
  },
  {
    name: "Pork Sinigang + Rice + Veggies",
    description:
      "Sour, warm, and comforting. Pork ribs simmered in tamarind broth with kangkong, sitaw, and gabi. The kind of soup that fixes your day.",
    price: "₱139",
    tag: "Crowd Favorite",
  },
  {
    name: "Beef Caldereta + Rice + Veggies",
    description:
      "Rich tomato-based beef stew with potatoes, carrots, and bell peppers. Hearty enough to keep you going all afternoon.",
    price: "₱150",
    tag: "Premium Pick",
  },
];

export default function FeaturedMeals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            What&apos;s Good Today
          </h2>
          <p className="text-lg text-charcoal-light">
            Here are a few favorites our regulars keep ordering.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((meal) => (
            <div
              key={meal.name}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Image placeholder — replace with actual food photo */}
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
                  Comes with free soup &amp; water
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
