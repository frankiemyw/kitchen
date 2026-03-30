const reasons = [
  {
    icon: "🔥",
    title: "Cooked Fresh, Every Day",
    description:
      "Nothing sits around. We start cooking early each morning so every plate that goes out is freshly made — the way it should be.",
  },
  {
    icon: "💰",
    title: "Real Food, Real Prices",
    description:
      "A full meal with rice, soup, and water starts at ₱90. No tricks, no tiny portions. Just honest food at a price that makes sense.",
  },
  {
    icon: "🏢",
    title: "Built for Groups",
    description:
      "We regularly handle orders for offices, government teams, and corporate groups. Whether it's 10 people or 100, we've got the kitchen for it.",
  },
  {
    icon: "🍱",
    title: "Party Trays Ready to Go",
    description:
      "Hosting something? Our catering trays are packed with the same dishes our regulars love — just in bigger servings.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Why People Keep Coming Back
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            It&apos;s pretty simple — we cook good food, we don&apos;t overcharge,
            and we show up every day. That&apos;s it.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
