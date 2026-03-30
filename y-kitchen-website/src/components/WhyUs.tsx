const reasons = [
  {
    icon: "🔥",
    title: "Freshly-Cooked Daily",
    description:
      "Every dish is cooked fresh — never reheated, never leftover. You get honest, home-style Filipino food every time.",
  },
  {
    icon: "💰",
    title: "Affordable Meals",
    description:
      "Complete meals starting at ₱90 with rice, soup, and water. Real value with no hidden charges.",
  },
  {
    icon: "🏛️",
    title: "Trusted by Organizations",
    description:
      "We serve government agencies, LGUs, corporations, and offices. Reliable food for meetings, events, and daily canteen needs.",
  },
  {
    icon: "🍱",
    title: "Catering & Party Trays",
    description:
      "From small office lunches to large group orders — our catering trays are ready for any occasion.",
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
            Good food doesn&apos;t have to be expensive. We keep things fresh,
            affordable, and satisfying — every single day.
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
