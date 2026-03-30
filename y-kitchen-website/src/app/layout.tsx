import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Y Kitchen — Affordable Filipino Meals, Catering & Party Trays",
  description:
    "Y Kitchen serves delicious, affordable Filipino meals for dine-in, catering, and party trays. Perfect for office workers, condo residents, and group orders. Starting at ₱99.",
  keywords: [
    "Filipino food",
    "affordable meals",
    "catering",
    "party trays",
    "dine-in restaurant",
    "Y Kitchen",
    "office lunch",
    "group orders",
  ],
  openGraph: {
    title: "Y Kitchen — Affordable Filipino Meals, Catering & Party Trays",
    description:
      "Delicious Filipino meals starting at ₱99. Dine-in, catering, and party trays for every occasion.",
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
                "Affordable Filipino meals for dine-in, catering, and party trays.",
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
                    name: "Budget Meals",
                    description: "One dish + rice with free soup and water",
                  },
                  {
                    "@type": "MenuSection",
                    name: "Value Meals",
                    description: "Two dishes + rice with free soup and water",
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
