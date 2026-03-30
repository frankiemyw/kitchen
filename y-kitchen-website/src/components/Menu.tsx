const menuCategories = [
  {
    name: "Chicken or Pork Meals",
    items: [
      {
        name: "1 Entree + Rice",
        description: "Choice of chicken or pork dish with steamed rice",
        price: "₱109",
      },
      {
        name: "1 Entree + Rice + Veggies",
        description: "Chicken or pork dish with vegetables and steamed rice",
        price: "₱139",
      },
      {
        name: "2 Entrees + Rice",
        description: "Two chicken or pork dishes with steamed rice",
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
        name: "1 Beef + Rice + Veggies",
        description: "Beef dish with vegetables and steamed rice",
        price: "₱150",
      },
      {
        name: "2 Entrees + Rice (w/ Beef)",
        description: "Two entrees including a beef dish, with steamed rice",
        price: "₱180",
      },
    ],
  },
  {
    name: "Vegetable Meals",
    items: [
      {
        name: "1 Vegetables + Rice",
        description: "Choice of vegetable dish with steamed rice",
        price: "₱90",
      },
    ],
  },
  {
    name: "Sample Dishes",
    subtitle: "Available dishes rotate daily. Here are some favorites:",
    items: [
      { name: "Chicken Adobo", description: "Classic soy-vinegar braised chicken", price: "" },
      { name: "Pork Sinigang", description: "Tangy tamarind pork soup with vegetables", price: "" },
      { name: "Giniling", description: "Savory ground pork with potatoes and carrots", price: "" },
      { name: "Chicken Curry", description: "Creamy coconut curry with tender chicken", price: "" },
      { name: "Beef Caldereta", description: "Rich tomato-based beef stew", price: "" },
      { name: "Bistek Tagalog", description: "Soy-citrus marinated beef with onions", price: "" },
      { name: "Pinakbet", description: "Sautéed mixed vegetables with shrimp paste", price: "" },
      { name: "Chopsuey", description: "Stir-fried mixed vegetables", price: "" },
      { name: "Tortang Talong", description: "Grilled eggplant omelette", price: "" },
      { name: "Bangus Belly", description: "Pan-fried milkfish belly, crispy and flavorful", price: "" },
      { name: "Menudo", description: "Pork and liver stew with potatoes and carrots", price: "" },
      { name: "Pork Adobo", description: "Braised pork in soy-vinegar sauce", price: "" },
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
            Freshly-cooked Filipino meals every day. All meals include free
            soup and water.
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
            Dishes rotate daily. Prices are subject to change.
          </p>
        </div>
      </div>
    </section>
  );
}
