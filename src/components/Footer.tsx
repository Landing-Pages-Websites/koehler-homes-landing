import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const serviceLinks = [
  { label: "Residential Windows and Doors", href: "/residential-windows-and-doors" },
  { label: "Commercial Windows", href: "/commercial-windows" },
  { label: "Commercial Doors", href: "/commercial-doors" },
  { label: "Modular Home Installation", href: "/modular-home-installation" },
  { label: "Shower and Bath replacement", href: "/shower-and-bath-replacement"},
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
];

const areaLinks = [
  { label: "South Jersey", href: "/window-door-installation-south-jersey" },
  { label: "Philadelphia", href: "/philadelphia-windows-doors" },
  { label: "Delaware", href: "/window-door-installation-delaware" },
  { label: "Cherry Hill", href: "/cherry-hill-windows-doors" },
  { label: "Mount Laurel", href: "/mount-laurel-windows-doors" },
  { label: "Camden County", href: "/camden-county-windows-doors" },
  { label: "Burlington County", href: "/burlington-county-windows-doors" },
  { label: "Delaware County", href: "/delaware-county-windows-doors" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company info */}
          <div>
            <Image src="/images/logo.png" alt="Cosello Construction" width={180} height={60} className="h-12 w-auto mb-5" />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Serving New Jersey, Philadelphia, and the Tri-State area since 2003. Licensed, insured, and Andersen certified.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:8563171770" className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition-colors">
                <Phone className="w-4 h-4 text-orange-500" /> (856) 317-1770
              </a>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4 text-orange-500" /> Mon–Sat: 7AM–7PM
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-orange-500" /> South Jersey &amp; Philadelphia
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="https://facebook.com/104838361235971" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-orange-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/coselloconstructioninc" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-orange-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-5">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-5">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-5">Service Areas</h3>
            <ul className="space-y-2.5">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-4">
        <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Cosello Construction Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
