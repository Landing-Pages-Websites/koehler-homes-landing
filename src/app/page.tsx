import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhyChoose from "@/components/home/WhyChoose";
import Services from "@/components/home/Services";
import Gallery from "@/components/home/Gallery";
import Promo from "@/components/home/Promo";
import Reviews from "@/components/home/Reviews";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "Window & Door Replacement Services | Cosello Construction",
  description: "Professional window and door installation in NJ, PA, & DE. Call (856) 317-1770 today for premium replacements from Cosello Construction.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cosello Construction Inc",
  "url": "https://www.coselloconstruction.pro",
  "telephone": "+1-856-317-1770",
  "image": "https://www.coselloconstruction.pro/images/logo-transparent.png",
  "priceRange": "$$",
  "foundingDate": "2003",
  "description": "Professional window and door installation in NJ, PA, & DE. Andersen certified contractor serving South Jersey, Philadelphia, and Delaware since 2003.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 S Center St Unit E",
    "addressLocality": "Merchantville",
    "addressRegion": "NJ",
    "postalCode": "08109",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "State", "name": "New Jersey" },
    { "@type": "State", "name": "Pennsylvania" },
    { "@type": "State", "name": "Delaware" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "19:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "31",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://facebook.com/104838361235971",
    "https://instagram.com/coselloconstructioninc"
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cosello Construction Inc",
  "url": "https://www.coselloconstruction.pro",
  "logo": "https://www.coselloconstruction.pro/images/logo-transparent.png",
  "foundingDate": "2003",
  "description": "Professional window and door installation in NJ, PA, & DE. Andersen certified contractor serving South Jersey, Philadelphia, and Delaware since 2003.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 S Center St Unit E",
    "addressLocality": "Merchantville",
    "addressRegion": "NJ",
    "postalCode": "08109",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-856-317-1770",
    "contactType": "customer service",
    "areaServed": ["NJ", "PA", "DE"],
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://facebook.com/104838361235971",
    "https://instagram.com/coselloconstructioninc"
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <About />
      <WhyChoose />
      <Services />
      <Gallery />
      <Promo />
      <Reviews />
      <ServiceAreaSection />
      <CTA />
    </>
  );
}
