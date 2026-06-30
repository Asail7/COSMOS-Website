import { Link, useLocation } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const navLinks = [
    { href: "/solar-system", label: t.nav.solarSystem },
    { href: "/galaxies", label: t.nav.galaxies },
    { href: "/stars", label: t.nav.stars },
    { href: "/black-holes", label: t.nav.blackHoles },
    { href: "/missions", label: t.nav.missions },
    { href: "/universe-timeline", label: t.nav.timeline },
    { href: "/quiz", label: t.nav.quiz },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.3em] text-white hover:text-accent transition-colors"
        >
          COSMOS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wider hover:text-accent transition-colors ${
                location === link.href ? "text-accent font-medium" : "text-gray-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            {language === "en" ? "عربي" : "EN"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav border-t border-white/10 py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg py-2 border-b border-white/5 text-gray-300 hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleLanguage();
              setMobileMenuOpen(false);
            }}
            className="text-lg py-2 text-left rtl:text-right font-medium text-accent"
          >
            {language === "en" ? "Switch to Arabic (عربي)" : "Switch to English"}
          </button>
        </div>
      )}
    </nav>
  );
}
