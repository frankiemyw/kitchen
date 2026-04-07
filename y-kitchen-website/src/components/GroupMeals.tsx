import { cateringTrays } from "@/data/catering";

export default function GroupMeals() {
  return (
    <section id="group-meals" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Group Meals
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto">
            Convenient meal solutions for teams, office groups, and special
            gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border border-warm-border bg-white p-6">
            <h3 className="font-semibold text-charcoal mb-2">Office Orders</h3>
            <p className="text-sm text-charcoal-muted">
              Packed meals for office teams and departments.
            </p>
          </div>
          <div className="rounded-2xl border border-warm-border bg-white p-6">
            <h3 className="font-semibold text-charcoal mb-2">Party Trays</h3>
            <p className="text-sm text-charcoal-muted">
              Shareable trays for birthdays, meetings, and celebrations.
            </p>
          </div>
          <div className="rounded-2xl border border-warm-border bg-white p-6">
            <h3 className="font-semibold text-charcoal mb-2">Custom Orders</h3>
            <p className="text-sm text-charcoal-muted">
              Flexible food packages based on your group size and budget.
            </p>
          </div>
        </div>

        {/* Party Trays */}
        <h3 className="text-2xl font-bold text-charcoal mb-6 text-center">Party Trays</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cateringTrays.map((tray) => (
            <div
              key={tray.name}
              className="bg-white rounded-2xl overflow-hidden border border-warm-border hover:shadow-md transition-shadow"
            >
              {tray.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={tray.image}
                    alt={tray.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-base font-semibold text-charcoal mb-1">
                  {tray.name}
                </h3>
                <p className="text-xs font-medium text-red-brand mb-2">
                  {tray.serving}
                </p>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {tray.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
