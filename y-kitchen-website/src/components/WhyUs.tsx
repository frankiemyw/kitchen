const reasons = [
  {
    icon: "💰",
    title: "Affordable Every Day",
    description:
      "Our meal options are designed to be satisfying and budget-friendly, making Y Kitchen a practical choice for lunch, dinner, or takeout.",
  },
  {
    icon: "🍛",
    title: "Comforting Filipino Favorites",
    description:
      "We serve familiar dishes people enjoy again and again — simple, hearty meals that feel reliable and enjoyable any day of the week.",
  },
  {
    icon: "⏱️",
    title: "Great for Busy Schedules",
    description:
      "Whether you are on a lunch break, ordering for the office, or bringing home food after work, we make ordering easy and convenient.",
  },
  {
    icon: "🍱",
    title: "Group Orders Made Easy",
    description:
      "Need food for a meeting, office lunch, or simple celebration? Our catering trays are practical, delicious, and easy to arrange.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            Why People Choose Y Kitchen
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto">
            Good food, fair prices, and a convenient experience for everyday
            customers and group orders.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-warm-border hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-base font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
