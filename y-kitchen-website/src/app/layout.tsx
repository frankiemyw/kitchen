import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Y Kitchen — Freshly-Cooked Filipino Meals, Catering & Party Trays",
  description:
    "Y Kitchen serves freshly-cooked, affordable Filipino meals for dine-in, canteen service, catering, and party trays. Trusted by government agencies, LGUs, corporations, and organizations. Starting at ₱90.",
  keywords: [
    "Filipino food",
    "freshly-cooked meals",
    "affordable meals",
    "catering",
    "party trays",
    "canteen food",
    "dine-in restaurant",
    "Y Kitchen",
    "office lunch",
    "government catering",
    "corporate meals",
    "group orders",
    "LGU catering",
  ],
  openGraph: {
    title: "Y Kitchen — Freshly-Cooked Filipino Meals, Catering & Party Trays",
    description:
      "Freshly-cooked Filipino meals starting at ₱90. Dine-in, canteen service, catering, and party trays for government agencies, corporations, and organizations.",
    type: "website",
    locale: "en_PH",
    siteName: "Y Kitchen",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Y Kitchen",
              description:
                "Freshly-cooked, affordable Filipino meals for dine-in, canteen service, catering, and party trays.",
              servesCuisine: "Filipino",
              priceRange: "₱",
              address: {
                "@type": "PostalAddress",
                streetAddress: "[Your Street Address]",
                addressLocality: "[City]",
                addressRegion: "[Province]",
                addressCountry: "PH",
              },
              telephone: "[Your Phone Number]",
              url: "[Your Website URL]",
              menu: "[Your Website URL]/#menu",
              hasMenu: {
                "@type": "Menu",
                hasMenuSection: [
                  {
                    "@type": "MenuSection",
                    name: "Chicken or Pork Meals",
                    description:
                      "₱109–₱170. Freshly-cooked chicken or pork with rice, free soup and water",
                  },
                  {
                    "@type": "MenuSection",
                    name: "Beef Meals",
                    description:
                      "₱129–₱180. Freshly-cooked beef dishes with rice, free soup and water",
                  },
                  {
                    "@type": "MenuSection",
                    name: "Vegetable Meals",
                    description:
                      "₱90. Vegetable dish with rice, free soup and water",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
