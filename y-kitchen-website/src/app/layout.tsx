import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [
    "Y Kitchen",
    "affordable Filipino meals",
    "Filipino food Mandaluyong",
    "catering Mandaluyong",
    "party trays",
    "dine-in restaurant",
    "takeout Filipino food",
    "office lunch Mandaluyong",
    "budget meals",
    "group orders",
  ],
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    type: "website",
    locale: "en_PH",
    siteName: siteConfig.businessName,
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
              name: siteConfig.businessName,
              description: siteConfig.seo.description,
              servesCuisine: "Filipino",
              priceRange: "₱",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Units CS 01 to 04, IT Center 2, EDSA cor. United St.",
                addressLocality: "Mandaluyong City",
                addressRegion: "Metro Manila",
                addressCountry: "PH",
              },
              telephone: siteConfig.telephone[0],
              email: siteConfig.email,
              url: siteConfig.facebook,
              menu: "#menu",
              hasMenu: {
                "@type": "Menu",
                hasMenuSection: [
                  {
                    "@type": "MenuSection",
                    name: "Dine-In Meal Sets",
                    description:
                      "Affordable Filipino meal sets from ₱90 to ₱180",
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
