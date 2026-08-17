"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavDict = {
  home: string;
  rooms: string;
  facilities: string;
  contact: string;
};

export default function Navbar({ dict, lang }: { dict: NavDict; lang: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const links = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/rooms`, label: dict.rooms },
    { href: `/${lang}/facilities`, label: dict.facilities },
    { href: `/${lang}/contact`, label: dict.contact },
  ];

  const langLabels: Record<string, string> = { en: "English", ko: "한국어", cz: "Čeština" };
  const langFlags: Record<string, string> = { en: "🇬🇧", ko: "🇰🇷", cz: "🇨🇿" };
  const otherLangs = ["en", "ko", "cz"].filter((l) => l !== lang);

  const toOtherLang = (targetLang: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex flex-col leading-tight">
            <span className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">
              Empire
            </span>
            <span className="text-white text-xs tracking-[0.3em] uppercase">
              Hotel
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wider uppercase transition-colors ${
                  pathname === link.href
                    ? "text-[#c9a84c]"
                    : "text-gray-300 hover:text-[#c9a84c]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Lang switcher + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              {otherLangs.map((l) => (
                <Link
                  key={l}
                  href={toOtherLang(l)}
                  title={langLabels[l]}
                  aria-label={langLabels[l]}
                  className="text-2xl opacity-70 hover:opacity-100 transition-opacity"
                >
                  {langFlags[l]}
                </Link>
              ))}
            </div>
            <button
              className="md:hidden text-gray-300 hover:text-[#c9a84c] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm tracking-wider uppercase py-2 transition-colors ${
                  pathname === link.href
                    ? "text-[#c9a84c]"
                    : "text-gray-300 hover:text-[#c9a84c]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-gray-700">
              {otherLangs.map((l) => (
                <Link
                  key={l}
                  href={toOtherLang(l)}
                  onClick={() => setMenuOpen(false)}
                  title={langLabels[l]}
                  aria-label={langLabels[l]}
                  className="text-2xl"
                >
                  {langFlags[l]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
