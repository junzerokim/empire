import Link from "next/link";

type FooterDict = {
  tagline: string;
  quick_links: string;
  contact: string;
  rights: string;
};

type NavDict = {
  home: string;
  rooms: string;
  facilities: string;
  contact: string;
};

type ContactDict = {
  address_val: string;
  phone_val: string;
  email_val: string;
};

export default function Footer({
  dict,
  nav,
  contact,
  lang,
}: {
  dict: FooterDict;
  nav: NavDict;
  contact: ContactDict;
  lang: string;
}) {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-[#c9a84c] font-bold text-2xl tracking-widest uppercase block">
                Empire
              </span>
              <span className="text-white text-sm tracking-[0.3em] uppercase">
                Hotel
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">{dict.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm tracking-widest uppercase mb-6">
              {dict.quick_links}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}`} className="text-sm hover:text-[#c9a84c] transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/rooms`} className="text-sm hover:text-[#c9a84c] transition-colors">
                  {nav.rooms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/facilities`} className="text-sm hover:text-[#c9a84c] transition-colors">
                  {nav.facilities}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-sm hover:text-[#c9a84c] transition-colors">
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm tracking-widest uppercase mb-6">
              {dict.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] mt-0.5">📍</span>
                <span>
                  {contact.address_val.slice(0, contact.address_val.lastIndexOf(",") + 1)}
                  <br />
                  {contact.address_val.slice(contact.address_val.lastIndexOf(",") + 1).trim()}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c9a84c]">📞</span>
                <a href={`tel:${contact.phone_val}`} className="hover:text-[#c9a84c] transition-colors">
                  {contact.phone_val}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c9a84c]">✉️</span>
                <a href={`mailto:${contact.email_val}`} className="hover:text-[#c9a84c] transition-colors">
                  {contact.email_val}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Empire Hotel. {dict.rights}
        </div>
      </div>
    </footer>
  );
}
