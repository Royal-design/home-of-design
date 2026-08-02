import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearFavourite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { addToCart } from "@/redux/slice/cartSlice";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatter } from "@/features/formatter";

const WishlistSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const favourite = useAppSelector((state) => state.favourite.items);
  const totalFavourite = useAppSelector(
    (state) => state.favourite.totalFavourite
  );
  const dispatch = useAppDispatch();

  const moveToCart = (item: (typeof favourite)[number]) => {
    dispatch(addToCart({ ...item, qty: 1 }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Wishlist, ${totalFavourite} items`}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-all duration-300 hover:bg-paper-2 hover:text-bronze"
        >
          <Heart size={16} strokeWidth={1.5} />
          {totalFavourite > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bronze font-mono text-[0.55rem] text-paper">
              {totalFavourite}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        hideClose
        className="w-full border-line bg-paper p-0 sm:max-w-md"
      >
        <SheetTitle className="sr-only">Wishlist</SheetTitle>
        <SheetDescription className="sr-only">
          Saved pieces you love
        </SheetDescription>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.26em] text-ink">
                Wishlist
              </h2>
              <span className="bg-bronze px-2 py-0.5 font-mono text-[0.6rem] text-paper">
                {totalFavourite}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close wishlist"
              className="cursor-pointer text-ink-3 transition-colors hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>

          {favourite.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
              <Heart size={28} strokeWidth={1} className="text-ink-3" />
              <p className="font-display text-xl text-ink">
                Nothing saved yet
              </p>
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="btn-outline"
              >
                Find your pieces
              </Link>
            </div>
          ) : (
            <>
              <ul
                className="flex-1 divide-y divide-line overflow-y-auto px-6"
                data-lenis-prevent
              >
                {favourite.map((item) => (
                  <li key={item.id} className="flex gap-4 py-5">
                    <Link
                      to={`/products/${item.id}`}
                      onClick={() => setOpen(false)}
                      className="card-media flex h-20 w-20 shrink-0 items-center justify-center"
                    >
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">
                            {item.name}
                          </p>
                          <p className="eyebrow mt-1 text-ink-3">
                            {item.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFavorite(item.id))}
                          aria-label={`Remove ${item.name}`}
                          className="cursor-pointer text-ink-3 transition-colors hover:text-destructive"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-ink">
                          {formatter.format(item.price.newPrice)}
                        </p>
                        <button
                          type="button"
                          onClick={() => moveToCart(item)}
                          className="flex cursor-pointer items-center gap-2 border border-line px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink transition-all hover:border-bronze hover:text-bronze"
                        >
                          <ShoppingBag size={12} />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line px-6 py-5">
                <button
                  type="button"
                  onClick={() => dispatch(clearFavourite())}
                  className="w-full cursor-pointer text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-destructive"
                >
                  Clear wishlist
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSheet;
