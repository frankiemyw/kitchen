import { whyUs } from "@/data/content";

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            {whyUs.heading}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto">
            {whyUs.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUs.reasons.map((item) => (
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
