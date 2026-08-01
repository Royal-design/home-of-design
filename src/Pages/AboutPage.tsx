import aboutCraft from "@/assets/about/about-craft.webp";
import aboutHero from "@/assets/about/about-hero.webp";
import aboutStory from "@/assets/about/about-story.webp";
import team1 from "@/assets/about/team-1.webp";
import team2 from "@/assets/about/team-2.webp";
import team3 from "@/assets/about/team-3.webp";
import team4 from "@/assets/about/team-4.webp";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArrowRight, Hammer, HeartHandshake, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: <Hammer size={20} strokeWidth={1.25} />,
    title: "Material honesty",
    body: "Solid timber, natural fibres, honest finishes. Nothing veneered for appearance, nothing engineered to fail quietly.",
  },
  {
    icon: <Leaf size={20} strokeWidth={1.25} />,
    title: "Sustainability",
    body: "FSC-certified timber, low-waste cutting, and finishes chosen for people and planet alike.",
  },
  {
    icon: <HeartHandshake size={20} strokeWidth={1.25} />,
    title: "Built to repair",
    body: "Replaceable parts and serviceable joints mean our pieces are meant to outlive the room — and the house.",
  },
];

const team = [
  { image: team1, name: "Jane Doe", role: "Creative Director" },
  { image: team2, name: "John Smith", role: "Head Carpenter" },
  { image: team3, name: "Alice Brown", role: "Interior Designer" },
  { image: team4, name: "Michael Green", role: "Project Manager" },
];

export const AboutPage = () => {
  return (
    <div className="bg-paper">
      <section className="relative flex h-[55vh] min-h-[26rem] items-end overflow-hidden">
        <img
          src={aboutHero}
          alt="A warm, sunlit living room furnished by Home of Design"
          className="fade-img absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="page-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-white">The House</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-[#f9d171] sm:text-7xl">
              Craft, considered.
            </h1>
            <div className="mt-6 text-paper/70">
              <BreadCrumbs />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <p className="max-w-4xl font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.18] tracking-tight text-ink">
            Home of Design began as a small workshop with a simple conviction:{" "}
            <em className="italic text-bronze">
              that furniture should be built for the life it leads
            </em>{" "}
            — joined by hand, measured against the human body, and designed to
            age with grace.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-shell gap-10 px-5 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="card-media relative aspect-[4/5] overflow-hidden">
              <img
                src={aboutCraft}
                alt="A craftsman working wood in the Home of Design workshop"
                loading="lazy"
                decoding="async"
                className="fade-img h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-ink-3">Our mission</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                Made slowly, <em className="italic text-bronze">on purpose.</em>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-2">
                Every piece leaves our workshop with a maker’s mark and a
                promise. We design in-house, build in small batches, and stand
                behind what we make for years after it leaves the floor.
              </p>
              <Link to="/products" className="btn-outline mt-10 inline-flex">
                See the collection <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-shell px-5 py-24 sm:px-6 sm:py-28">
          <Reveal>
            <p className="eyebrow text-ink-3">What we stand for</p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="card-surface p-8 sm:p-10">
                  <span className="flex h-12 w-12 items-center justify-center border border-bronze text-bronze">
                    {v.icon}
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-shell items-center gap-10 px-5 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-ink-3">Our story</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                From workbench to living room
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-2">
                What began as a two-person workshop now furnishes homes across
                the country — but the process hasn’t changed. Pieces are drawn,
                prototyped, and built in-house, by the same hands that sign
                them. Growth changed the scale, never the standard.
              </p>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <div className="card-media relative aspect-[4/3] overflow-hidden">
              <img
                src={aboutStory}
                alt="The Home of Design showroom in natural light"
                loading="lazy"
                decoding="async"
                className="fade-img h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-shell px-5 sm:px-6">
          <Reveal>
            <div className="border-b border-line pb-10">
              <p className="eyebrow text-ink-3">The people</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                Behind every piece
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="card-media aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    className="fade-img h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">
                  {member.name}
                </h3>
                <p className="eyebrow mt-1 text-ink-3">{member.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-20 text-center text-paper sm:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-3xl px-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Ready to live with pieces{" "}
            <em className="italic text-bronze">made to last?</em>
          </h2>
          <Link
            to="/products"
            className="mt-10 inline-flex items-center gap-3 bg-paper px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-all duration-500 ease-expo-out hover:bg-bronze hover:text-paper"
          >
            Shop the collection <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};
