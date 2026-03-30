import { siteConfig } from "@/data/site";

export default function CTAFooter() {
  return (
    <footer className="bg-charcoal text-white">
      {/* CTA */}
      <div className="py-16 border-b border-charcoal-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Good Food, Fair Prices, Easy Ordering
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Whether you need a quick everyday meal or food for a group,
            Y Kitchen is ready to serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              className="bg-red-brand text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-red-dark transition-colors"
            >
              View Menu
            </a>
            <a
              href="#contact"
              className="bg-gold text-charcoal px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gold mb-3">
                {siteConfig.businessName}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Affordable Filipino meals for everyday dining, takeout, and
                group orders in Mandaluyong.
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
                Contact
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  <a href={`tel:${siteConfig.mobile[0]}`} className="hover:text-white transition-colors">
                    {siteConfig.mobile[0]}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-charcoal-light pt-6">
            <p className="text-xs text-gray-500 text-center mb-2">
              Please follow us or message us for menu updates, daily
              availability, and catering inquiries.
            </p>
            <p className="text-xs text-gray-500 text-center">
              &copy; {new Date().getFullYear()} {siteConfig.businessName}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
