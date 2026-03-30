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
            Need to feed a crowd? We prepare the same dishes our regulars love
            — packed in generous trays, ready for your team, your office,
            or your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partyTrays.map((tray) => (
            <div
              key={tray.name}
              className="bg-warm-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Tray image placeholder — replace with actual photo */}
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
            Let Us Handle the Food
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            We work with government offices, LGUs, corporations, and all kinds
            of organizations — big and small. Tell us how many people,
            pick your dishes, and we&apos;ll take care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gold text-charcoal px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Send Us a Message
            </a>
            <a
              href="tel:[YOUR-PHONE-NUMBER]"
              className="border-2 border-white text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-white hover:text-charcoal transition-colors"
            >
              Call Us Directly
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Just give us at least 2 days&apos; notice. We can also customize
            trays and handle bulk orders — just ask.
          </p>
        </div>
      </div>
    </section>
  );
}
