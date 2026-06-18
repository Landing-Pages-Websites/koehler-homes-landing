import Hero from "@/components/sections/Hero";
import OfferBar from "@/components/sections/OfferBar";
import Services from "@/components/sections/Services";
import WhyKoehler from "@/components/sections/WhyKoehler";
import Financing from "@/components/sections/Financing";
import Process from "@/components/sections/Process";
import ServiceArea from "@/components/sections/ServiceArea";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import ContactCTA from "@/components/sections/ContactCTA";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Koehler Home Improvement",
  url: "https://book.koehlerhomesinc.com",
  telephone: "+1-904-746-4003",
  image: "https://book.koehlerhomesinc.com/images/koehler/project-a22.webp",
  priceRange: "$$",
  foundingDate: "2003",
  description:
    "Family-owned Jacksonville home improvement company since 2003. Energy-efficient, hurricane-rated replacement windows, doors, and James Hardie siding installed by employee crews. Florida Certified Building Contractor CBC056153.",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Duval County, FL" },
    { "@type": "AdministrativeArea", name: "St. Johns County, FL" },
    { "@type": "AdministrativeArea", name: "Clay County, FL" },
    { "@type": "AdministrativeArea", name: "Nassau County, FL" },
    { "@type": "AdministrativeArea", name: "Flagler County, FL" },
    { "@type": "AdministrativeArea", name: "Camden County, GA" },
    { "@type": "AdministrativeArea", name: "Charlton County, GA" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jacksonville",
    addressRegion: "FL",
    addressCountry: "US",
  },
};

export default function Home(): React.JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <OfferBar />
      <Services />
      <WhyKoehler />
      <Financing />
      <Process />
      <ServiceArea />
      <Testimonials />
      <Faq />
      <ContactCTA />
    </>
  );
}
