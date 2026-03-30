import { siteConfig } from "@/data/site";
import { footer } from "@/data/content";

export default function CTAFooter() {
  return (
    <footer className="bg-charcoal text-white">
      {/* CTA */}
      <div className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            {footer.ctaHeading}
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            {footer.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#menu"
              className="bg-red-brand text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-red-dark transition-colors"
            >
              {footer.primaryButton}
            </a>
            <a
              href="#contact"
              className="bg-white/10 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              {footer.secondaryButton}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                {siteConfig.businessName}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {footer.footerDescription}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#menu" className="hover:text-white transition-colors">Menu</a>
                </li>
                <li>
                  <a href="#catering" className="hover:text-white transition-colors">Catering</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Contact
              </h4>
              <div className="text-sm text-gray-400 space-y-2">
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
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-gray-600 mb-1">
              {footer.followNote}
            </p>
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} {siteConfig.businessName}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
