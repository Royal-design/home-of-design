const WORDS = [
  "Solid Oak",
  "Honest Joints",
  "Bouclé",
  "Tanned Leather",
  "Powder-Coated Steel",
  "Hand-Finished",
  "Linen Blend",
  "FSC Timber",
  "Sculpted Ash",
  "Designed In-House"
];

export function Marquee() {
  const row = [...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden border-y border-line bg-paper py-5">
      <div className="marquee-track items-center" aria-hidden="true">
        {row.map((word, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="font-display text-2xl italic text-ink sm:text-3xl">
              {word}
            </span>
            <span className="mx-6 h-2 w-2 rounded-full bg-bronze sm:mx-8" />
          </span>
        ))}
      </div>
      <span className="sr-only">
        Our materials: solid oak, honest joints, bouclé, tanned leather,
        powder-coated steel, hand-finished, linen blend, FSC timber, sculpted
        ash, designed in-house.
      </span>
    </div>
  );
}
