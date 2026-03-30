export default function CTAFooter() {
  return (
    <footer className="bg-charcoal text-white">
      {/* CTA Section */}
      <div className="py-16 border-b border-charcoal-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Gutom na? Tara, kain.
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Swing by for a freshly-cooked meal, or let us know if you need
            catering for your next event. We&apos;re just a call or message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              className="bg-red-brand text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-red-dark transition-colors"
            >
              Check the Menu
            </a>
            <a
              href="#catering"
              className="bg-gold text-charcoal px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Order Party Trays
            </a>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gold mb-3">Y Kitchen</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Freshly-cooked Filipino meals, every day. Dine-in, canteen
                service, catering, and party trays — for everyone from solo
                lunchers to 100-person events.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#menu" className="hover:text-white transition-colors">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#catering" className="hover:text-white transition-colors">
                    Catering
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
                Hours
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Mon–Sat: 7:00 AM – 7:00 PM</p>
                <p>Sun: 8:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-charcoal-light pt-6 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Y Kitchen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
