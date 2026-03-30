const menuCategories = [
  {
    name: "Chicken or Pork Meals",
    items: [
      {
        name: "1 Ulam + Rice",
        description: "Pick any chicken or pork dish, served with steamed rice",
        price: "₱109",
      },
      {
        name: "1 Ulam + Rice + Gulay",
        description: "Chicken or pork with a side of vegetables and rice",
        price: "₱139",
      },
      {
        name: "2 Ulam + Rice",
        description: "Two dishes, one rice — for the extra-hungry",
        price: "₱170",
      },
    ],
  },
  {
    name: "Beef Meals",
    items: [
      {
        name: "1 Beef + Rice",
        description: "Choice of beef dish with steamed rice",
        price: "₱129",
      },
      {
        name: "1 Beef + Rice + Gulay",
        description: "Beef with a side of vegetables and rice",
        price: "₱150",
      },
      {
        name: "2 Ulam + Rice (with Beef)",
        description: "Two dishes including beef, with rice",
        price: "₱180",
      },
    ],
  },
  {
    name: "Vegetable Meals",
    items: [
      {
        name: "1 Gulay + Rice",
        description: "A vegetable dish with steamed rice — light and satisfying",
        price: "₱90",
      },
    ],
  },
  {
    name: "What We Cook",
    subtitle: "Our dishes change daily, but these are the ones you'll find most often:",
    items: [
      { name: "Chicken Adobo", description: "The classic — soy, vinegar, garlic", price: "" },
      { name: "Pork Sinigang", description: "Sour tamarind soup with pork and veggies", price: "" },
      { name: "Giniling", description: "Ground pork with potatoes and carrots", price: "" },
      { name: "Chicken Curry", description: "Coconut milk curry, mildly spiced", price: "" },
      { name: "Beef Caldereta", description: "Tomato-based beef stew, rich and hearty", price: "" },
      { name: "Bistek Tagalog", description: "Beef marinated in soy and calamansi, topped with onions", price: "" },
      { name: "Pinakbet", description: "Mixed vegetables with bagoong", price: "" },
      { name: "Chopsuey", description: "Stir-fried veggies in a savory sauce", price: "" },
      { name: "Tortang Talong", description: "Eggplant omelette, crispy on the outside", price: "" },
      { name: "Bangus Belly", description: "Pan-fried milkfish — crispy, flaky, perfect", price: "" },
      { name: "Menudo", description: "Pork and liver stew with potatoes", price: "" },
      { name: "Pork Adobo", description: "Same classic flavor, pork version", price: "" },
    ],
  },
  {
    name: "Extras",
    items: [
      { name: "Extra Rice", description: "", price: "₱15" },
      { name: "Softdrinks", description: "", price: "₱25" },
      { name: "Iced Tea", description: "", price: "₱30" },
      { name: "Bottled Water", description: "Free with any meal", price: "—" },
      { name: "Soup", description: "Free with any meal", price: "—" },
    ],
  },
];

export default function Menu() {
  return (
    <section id="menu" className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Everything is cooked fresh each day. Every meal comes with
            free soup and water — walang dagdag na bayad.
          </p>
        </div>

        <div className="space-y-12">
          {menuCategories.map((category) => (
            <div key={category.name}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-charcoal">
                  {category.name}
                </h3>
                {"subtitle" in category && category.subtitle && (
                  <p className="text-charcoal-light mt-1 text-sm">
                    {category.subtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white rounded-xl p-4 flex gap-4 items-center border border-gray-100"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="w-14 h-14 rounded-lg bg-warm-gray flex-shrink-0 flex items-center justify-center">
                      <span className="text-[10px] text-charcoal-light text-center leading-tight">
                        Photo
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-charcoal text-sm">
                        {item.name}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-charcoal-light mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.price && (
                      <span className="text-sm font-bold text-red-brand whitespace-nowrap">
                        {item.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-charcoal-light">
            Dishes rotate daily depending on what&apos;s fresh. Prices may change without notice.
          </p>
        </div>
      </div>
    </section>
  );
}
