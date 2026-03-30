import { menuCategories } from "@/data/menu";

export default function Menu() {
  return (
    <section id="menu" className="py-20 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Simple, Satisfying, and Budget-Friendly
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Whether you want a quick solo meal or something more filling,
            Y Kitchen offers practical food choices that are easy to enjoy.
          </p>
        </div>

        <div className="space-y-12">
          {menuCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-2xl font-bold text-charcoal mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white rounded-xl p-4 flex gap-4 items-center border border-gray-100"
                  >
                    {/* Replace with actual food photo */}
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
      </div>
    </section>
  );
}
