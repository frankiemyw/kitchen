import { menuCategories } from "@/data/menu";

export default function Menu() {
  return (
    <section id="menu" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            Simple, Satisfying, and Budget-Friendly
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto">
            Whether you want a quick solo meal or something more filling,
            Y Kitchen offers practical food choices that are easy to enjoy.
          </p>
        </div>

        <div className="space-y-10">
          {menuCategories.map((category) => {
            const hasPrices = category.items.some((item) => item.price);

            return (
              <div key={category.title}>
                <h3 className="text-xl font-bold text-charcoal mb-4 pb-2 border-b-2 border-red-brand/20">
                  {category.title}
                </h3>

                {hasPrices ? (
                  <div className="divide-y divide-warm-border">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-baseline justify-between py-3.5 gap-4"
                      >
                        <div className="min-w-0">
                          <span className="font-medium text-charcoal">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="text-sm text-charcoal-muted ml-2">
                              — {item.description}
                            </span>
                          )}
                        </div>
                        <span className="text-base font-bold text-red-brand whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.items.map((item) => (
                      <span
                        key={item.name}
                        className="bg-white text-charcoal-muted text-sm font-medium px-4 py-2 rounded-full border border-warm-border"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-warm-border text-center">
          <p className="text-sm text-charcoal-muted">
            All meals come with free soup and water. Dishes rotate daily.
          </p>
        </div>
      </div>
    </section>
  );
}
