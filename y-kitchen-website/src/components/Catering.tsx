const partyTrays = [
  {
    name: "Chicken Adobo Tray",
    serves: "Good for 8–10 pax",
    price: "₱650",
  },
  {
    name: "Pork Sinigang Tray",
    serves: "Good for 8–10 pax",
    price: "₱700",
  },
  {
    name: "Pancit Canton Tray",
    serves: "Good for 10–12 pax",
    price: "₱550",
  },
  {
    name: "Lumpiang Shanghai Tray",
    serves: "50 pieces",
    price: "₱500",
  },
  {
    name: "Beef Caldereta Tray",
    serves: "Good for 8–10 pax",
    price: "₱850",
  },
  {
    name: "Mixed Fruit Salad",
    serves: "Good for 10–12 pax",
    price: "₱450",
  },
];

export default function Catering() {
  return (
    <section id="catering" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Catering &amp; Party Trays
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Feeding a team, a department, or an entire event? Our freshly-cooked
            party trays are trusted by government agencies, corporations, LGUs,
            and organizations of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partyTrays.map((tray) => (
            <div
              key={tray.name}
              className="bg-warm-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Tray image placeholder */}
              <div className="aspect-[3/2] bg-warm-gray rounded-xl mb-4 flex items-center justify-center">
                <span className="text-sm text-charcoal-light">
                  [Photo: {tray.name}]
                </span>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-1">
                {tray.name}
              </h3>
              <p className="text-sm text-charcoal-light mb-2">{tray.serves}</p>
              <p className="text-xl font-bold text-red-brand">{tray.price}</p>
            </div>
          ))}
        </div>

        <div className="bg-charcoal rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need Catering for Your Organization?
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            We cater for government offices, corporate meetings, LGU events,
            team lunches, and private celebrations. Let us handle the food
            so you can focus on what matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gold text-charcoal px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Send an Inquiry
            </a>
            <a
              href="tel:[YOUR-PHONE-NUMBER]"
              className="border-2 border-white text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-white hover:text-charcoal transition-colors"
            >
              Call Us Now
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            We accept orders at least 2 days in advance. Custom tray
            combinations and bulk orders available upon request.
          </p>
        </div>
      </div>
    </section>
  );
}
