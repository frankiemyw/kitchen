const menuCategories = [
  {
    name: "Budget Meals — ₱99",
    description: "One dish + rice with free soup and water",
    items: [
      { name: "Chicken Adobo", description: "Classic soy-vinegar braised chicken" },
      { name: "Pork Sinigang", description: "Tangy tamarind pork soup with vegetables" },
      { name: "Giniling", description: "Savory ground pork with potatoes and carrots" },
      { name: "Tortang Talong", description: "Grilled eggplant omelette" },
      { name: "Bangus Belly", description: "Pan-fried milkfish belly, crispy and flavorful" },
      { name: "Chicken Curry", description: "Creamy coconut curry with tender chicken" },
    ],
  },
  {
    name: "Value Meals — ₱129",
    description: "Two dishes + rice with free soup and water",
    items: [
      {
        name: "Bistek Tagalog + Pinakbet",
        description: "Soy-citrus beef with sautéed mixed vegetables",
      },
      {
        name: "Pork Adobo + Chopsuey",
        description: "Braised pork with stir-fried mixed veggies",
      },
      {
        name: "Chicken Inasal + Ensalada",
        description: "Grilled marinated chicken with fresh side salad",
      },
      {
        name: "Fried Tilapia + Sinigang na Hipon",
        description: "Crispy fried fish with shrimp sour soup",
      },
      {
        name: "Menudo + Lumpia",
        description: "Pork stew with spring rolls",
      },
      {
        name: "Caldereta + Gulay",
        description: "Rich beef stew with sautéed greens",
      },
    ],
  },
  {
    name: "Extras",
    description: "Add-ons and drinks",
    items: [
      { name: "Extra Rice", description: "₱15" },
      { name: "Softdrinks", description: "₱25" },
      { name: "Iced Tea", description: "₱30" },
      { name: "Bottled Water", description: "Free with any meal" },
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
            Simple, satisfying meals made fresh every day. All prices include
            rice, soup, and water.
          </p>
        </div>

        <div className="space-y-12">
          {menuCategories.map((category) => (
            <div key={category.name}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-charcoal">
                  {category.name}
                </h3>
                <p className="text-charcoal-light mt-1">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white rounded-xl p-4 flex gap-4 items-start border border-gray-100"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="w-16 h-16 rounded-lg bg-warm-gray flex-shrink-0 flex items-center justify-center">
                      <span className="text-[10px] text-charcoal-light text-center leading-tight">
                        Photo
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-charcoal-light mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-charcoal-light">
            Menu items may vary daily. Prices are subject to change.
          </p>
        </div>
      </div>
    </section>
  );
}
