"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation, NavItem } from "@/lib/navigation";
import { Phone, Menu, X, ChevronDown, SquareCheckBig, MapPin } from "lucide-react";

function SubMenu({
  items,
  visible,
}: {
  items: NavItem[];
  visible: boolean;
}) {
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string) => {
    if (timeout.current) clearTimeout(timeout.current);
    setSubOpen(label);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setSubOpen(null), 150);
  };

  return (
    <div
      className={`absolute left-full top-0 min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-200 ${
        visible
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 -translate-x-2 pointer-events-none"
      }`}
    >
      {items.map((item) => (
        <div
          key={item.href + item.label}
          className="relative"
          onMouseEnter={() => handleEnter(item.label)}
          onMouseLeave={handleLeave}
        >
          <Link
            href={item.href}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-navy-800 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            {item.label}
            {item.children && <ChevronDown className="w-3 h-3 -rotate-90 shrink-0" />}
          </Link>

          {item.children && (
            <SubMenu items={item.children} visible={subOpen === item.label} />
          )}
        </div>
      ))}
    </div>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => {
      setOpen(false);
      setSubOpen(null);
    }, 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={item.href}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-800 hover:text-orange-500 transition-colors"
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute top-full left-0 min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-200 origin-top ${
          open
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
      >
        {item.children?.map((child) => (
          <div
            key={child.href + child.label}
            className="relative"
            onMouseEnter={() => setSubOpen(child.label)}
            onMouseLeave={() => setSubOpen(null)}
          >
            <Link
              href={child.href}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-navy-800 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              {child.label}
              {child.children && <ChevronDown className="w-3 h-3 -rotate-90 shrink-0" />}
            </Link>

            {child.children && (
              <SubMenu items={child.children} visible={subOpen === child.label} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const [subSubExpanded, setSubSubExpanded] = useState<string | null>(null);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Image src="/images/logo-transparent.png" alt="Cosello Construction" width={150} height={50} />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          {navigation.map((item) => (
            <div key={item.label} className="border-b border-gray-50">
              {item.children ? (
                <>
                  <button
                    onClick={() => {
                      setExpanded(expanded === item.label ? null : item.label);
                      setSubExpanded(null);
                    }}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-navy-800"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expanded === item.label ? "max-h-[2000px] pb-2" : "max-h-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <div key={child.href + child.label}>
                        {child.children ? (
                          <>
                            <button
                              onClick={() =>
                                setSubExpanded(subExpanded === child.label ? null : child.label)
                              }
                              className="flex items-center justify-between w-full py-2 pl-4 text-sm text-navy-700 font-medium"
                            >
                              {child.label}
                              <ChevronDown
                                className={`w-3.5 h-3.5 mr-1 transition-transform duration-200 ${
                                  subExpanded === child.label ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                subExpanded === child.label ? "max-h-[1000px]" : "max-h-0"
                              }`}
                            >
                             {child.children.map((sub) => (
                              <div key={sub.href + sub.label}>
                                {sub.children ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        setSubSubExpanded(subSubExpanded === sub.label ? null : sub.label)
                                      }
                                      className="flex items-center justify-between w-full py-2 pl-12 text-sm text-navy-600 font-medium"
                                    >
                                      {sub.label}
                                      <ChevronDown
                                        className={`w-3.5 h-3.5 mr-1 transition-transform duration-200 ${
                                          subSubExpanded === sub.label ? "rotate-180" : ""
                                        }`}
                                      />
                                    </button>

                                    <div
                                      className={`overflow-hidden transition-all duration-300 ${
                                        subSubExpanded === sub.label ? "max-h-[1000px]" : "max-h-0"
                                      }`}
                                    >
                                      {sub.children.map((deepSub) => (
                                        <Link
                                          key={deepSub.href + deepSub.label}
                                          href={deepSub.href}
                                          onClick={onClose}
                                          className="block py-2 pl-16 text-sm text-navy-400 hover:text-orange-500"
                                        >
                                          {deepSub.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block py-2 pl-8 text-sm text-navy-500 hover:text-orange-500"
                                  >
                                    {sub.label}
                                  </Link>
                                )}
                              </div>
                            ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block py-2 pl-4 text-sm text-navy-600 hover:text-orange-500"
                          >
                            {child.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-sm font-medium text-navy-800"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <a
            href="tel:8563171770"
            className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            CALL US TODAY
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-950 text-white text-xs py-3 px-4">
        <div className="container-max flex items-center justify-between">
          <div className="flex items-center gap-1 w-full flex-col lg:flex-row justify-center lg:w-auto lg:gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={10} color="currentColor" className="fill-[#e87722] stroke-[#e87722]" />
              Serving New Jersey, Philadelphia &amp; the Tri-State Area
            </span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-white/70">4.9 (61 Reviews)</span>
            </span>
          </div>
          <a href="tel:8563171770" className="flex items-center gap-1.5 font-semibold hover:text-orange-300 transition-colors hidden lg:flex">
            <Phone className="w-3 h-3" />
            CALL US TODAY
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white"
        }`}
      >
        <div className="container-max flex items-center justify-between h-16 lg:h-20 px-4 z-30 relative">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-transparent.png"
              alt="Cosello Construction Inc"
              width={180}
              height={60}
              className="h-10 lg:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {navigation.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-navy-800 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 hover:scale-105 transition-all duration-200 shadow-lg shadow-orange-500/25 uppercase"
            >
              <div className="flex gap-2 items-center">
                <SquareCheckBig className="w-5 h-5 text-white" />
                Free Quote
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-navy-800 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-[3px]"
          style={{ background: "linear-gradient(90deg, #0b1a2e 0%, #e8701a 60%, #c95e10 100%)" }}
        />
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}