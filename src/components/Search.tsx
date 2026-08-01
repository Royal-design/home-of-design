import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";
import { formatter } from "@/features/formatter";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [term, products]);

  const close = useCallback(() => {
    setOpen(false);
    setTerm("");
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (panelRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const submit = () => {
    dispatch(setLoading(true));
    dispatch(
      setFilterProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(term.trim().toLowerCase())
        )
      )
    );
    dispatch(setLoading(false));
    close();
    navigate("/products");
  };

  const goTo = (id: number) => {
    close();
    navigate(`/products/${id}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-all duration-300 hover:bg-paper-2 hover:text-bronze"
      >
        <SearchIcon size={16} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-paper/95 px-4 pt-[10vh] backdrop-blur-xl sm:pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div
            ref={panelRef}
            className="w-full max-w-2xl border border-line bg-paper shadow-[0_40px_120px_-40px_rgba(27,23,18,0.5)]"
          >
            <div className="flex items-center gap-4 border-b border-line px-6 py-5">
              <SearchIcon size={18} className="text-bronze" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Search chairs, tables, sofas…"
                className="w-full bg-transparent font-display text-2xl text-ink placeholder:text-ink-3 focus:outline-none"
                aria-label="Search products"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="cursor-pointer text-ink-3 transition-colors hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="max-h-[55vh] overflow-y-auto"
              data-lenis-prevent
            >
              {term.trim() === "" ? (
                <div className="px-6 py-6">
                  <p className="eyebrow text-ink-3">Popular searches</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Sofa", "Armchair", "Dining", "Desk", "Lamp"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setTerm(t);
                          inputRef.current?.focus();
                        }}
                        className="cursor-pointer border border-line px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-2 transition-all hover:border-bronze hover:text-bronze"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="px-6 py-8 text-sm text-ink-3">
                  Nothing found for “{term}”. Try a different piece.
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => goTo(p.id)}
                        className="group flex w-full cursor-pointer items-center gap-5 px-6 py-4 text-left transition-colors hover:bg-paper-2"
                      >
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-paper-2">
                          <img
                            src={p.mainImage}
                            alt={p.name}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-ink">
                            {p.name}
                          </span>
                          <span className="eyebrow mt-1 block text-ink-3">
                            {p.category}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-bronze">
                          {formatter.format(p.price.newPrice)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-6 py-3">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
                <kbd>↵</kbd> to view all results in Shop
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
