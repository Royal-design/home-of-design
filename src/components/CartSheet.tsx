import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeFromCart, updateCart } from "@/redux/slice/cartSlice";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatter } from "@/features/formatter";

const CartSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  const changeQty = (id: number, qty: number) => {
    if (qty < 1) return;
    dispatch(updateCart({ id, qty }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Shopping cart, ${totalQuantity} items`}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-all duration-300 hover:bg-paper-2 hover:text-bronze"
        >
          <ShoppingBag size={16} strokeWidth={1.5} />
          {totalQuantity > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bronze font-mono text-[0.55rem] text-paper">
              {totalQuantity}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        hideClose
        className="w-full border-line bg-paper p-0 sm:max-w-md"
      >
        <SheetTitle className="sr-only">Shopping cart</SheetTitle>
        <SheetDescription className="sr-only">
          Your selected pieces
        </SheetDescription>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.26em] text-ink">
                Your Cart
              </h2>
              <span className="bg-bronze px-2 py-0.5 font-mono text-[0.6rem] text-paper">
                {totalQuantity}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="cursor-pointer text-ink-3 transition-colors hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
              <ShoppingBag size={28} strokeWidth={1} className="text-ink-3" />
              <p className="font-display text-xl text-ink">
                Your cart is empty
              </p>
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="btn-outline"
              >
                Explore pieces
              </Link>
            </div>
          ) : (
            <>
              <ul
                className="flex-1 divide-y divide-line overflow-y-auto px-6"
                data-lenis-prevent
              >
                {cartItems.map((item) => (
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
                          onClick={() => dispatch(removeFromCart(item.id))}
                          aria-label={`Remove ${item.name}`}
                          className="cursor-pointer text-ink-3 transition-colors hover:text-destructive"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            onClick={() => changeQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="cursor-pointer px-3 py-1.5 font-mono text-xs text-ink-2 transition-colors hover:text-bronze"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center font-mono text-xs text-ink">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="cursor-pointer px-3 py-1.5 font-mono text-xs text-ink-2 transition-colors hover:text-bronze"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-mono text-sm text-ink">
                          {formatter.format(item.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line px-6 py-5">
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="eyebrow text-ink-3">Subtotal</span>
                  <span className="font-mono text-lg text-ink">
                    {formatter.format(totalPrice)}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    to={user ? "/shopping-cart" : "/login"}
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    View cart & checkout
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-bronze"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
