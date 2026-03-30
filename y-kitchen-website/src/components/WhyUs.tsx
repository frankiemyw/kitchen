const reasons = [
  {
    icon: "🍚",
    title: "Affordable Meals",
    description:
      "Complete meals starting at ₱99 with rice, soup, and water. No hidden charges.",
  },
  {
    icon: "🔥",
    title: "Cooked Fresh Daily",
    description:
      "We prepare everything fresh each morning. No reheated leftovers — just honest, home-style cooking.",
  },
  {
    icon: "🏢",
    title: "Great for Groups",
    description:
      "Feeding your team or hosting a small event? Our catering trays make group ordering easy.",
  },
  {
    icon: "✨",
    title: "Clean & Comfortable",
    description:
      "A well-kept space where you can sit down, relax, and enjoy a proper meal.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Why Choose Y Kitchen?
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Good food doesn&apos;t have to be expensive. We keep things simple,
            fresh, and satisfying — every single day.
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
