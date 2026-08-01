import { Link } from "react-router-dom";
import { data } from "@/assets/data/data";
import { Reveal } from "./Reveal";

const shopLinks = [
  { to: "/products", label: "All pieces" },
  ...data.categories.slice(0, 4).map((c) => ({
    to: "/products",
    label: c.name
  }))
];

const houseLinks = [
  { to: "/about", label: "The House" },
  { to: "/blogs", label: "Journal" },
  { to: "/contact", label: "Contact" },
  { to: "/profile", label: "My account" }
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-line bg-paper">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-bronze font-display text-sm text-ink">
                H·D
              </span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-ink-2">
                Home of Design
              </span>
            </div>
            <h2 className="mt-8 max-w-sm font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              Objects for living, made with material honesty.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-2">
              {data.storeDetails.description} Each piece is designed in-house,
              built to outlive trends, and finished to age beautifully.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <p className="eyebrow text-ink-3">Shop</p>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-2 transition-colors duration-300 hover:text-bronze"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <p className="eyebrow text-ink-3">The House</p>
            <ul className="mt-5 space-y-3">
              {houseLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-2 transition-colors duration-300 hover:text-bronze"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-3">
            <p className="eyebrow text-ink-3">Studio</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-ink-2">
              <p>1 Design District, Lagos</p>
              <p>
                <a href="tel:+2341234567890" className="transition-colors hover:text-bronze">
                  +234 123 456 7890
                </a>
              </p>
              <p>
                <a
                  href="mailto:atelier@homeofdesign.com"
                  className="transition-colors hover:text-bronze"
                >
                  atelier@homeofdesign.com
                </a>
              </p>
            </address>
            <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
              Tues — Sat, 10:00 — 18:00
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
            © {year} Home of Design
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
            Furniture & objects for living
          </p>
        </div>
      </div>
    </footer>
  );
};
