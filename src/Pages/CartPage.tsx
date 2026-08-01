import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { clearCart, order } from "@/redux/slice/cartSlice";
import { RootState, useAppSelector } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { formatter } from "@/features/formatter";
import { db } from "@/firebase/firebaseConfig";
import { TableItem } from "@/components/TableItem";
import { CartListMobile } from "@/components/CartListMobile";
import Checkout from "@/components/Checkout";
import { ShoppingBag } from "lucide-react";

export const CartPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const dispatch = useDispatch();
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleToken = async () => {
    try {
      const docRef = collection(db, "orders");
      if (user) {
        await addDoc(docRef, {
          userId: user.id,
          orders: cartItems,
          createdAt: serverTimestamp()
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    dispatch(order());
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-shell px-5 pb-16 pt-28 sm:px-6 sm:pt-32">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ink-3">Your cart</p>
              <h1 className="mt-4 font-display text-5xl tracking-tight text-ink sm:text-6xl">
                Shopping cart
              </h1>
              <div className="mt-5 text-ink-3">
                <BreadCrumbs />
              </div>
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3">
              {totalQuantity} {totalQuantity === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </Reveal>

        {totalQuantity === 0 ? (
          <div className="flex flex-col items-center gap-5 py-28 text-center">
            <ShoppingBag size={30} strokeWidth={1} className="text-ink-3" />
            <p className="font-display text-3xl text-ink">Your cart is empty</p>
            <p className="max-w-sm text-sm text-ink-2">
              The collection is waiting — find the piece your room has been
              missing.
            </p>
            <Link to="/products" className="btn-primary mt-2">
              Explore pieces
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
            <div>
              <div className="hidden overflow-x-auto sm:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-line">
                      <TableHead className="eyebrow text-ink-3">Piece</TableHead>
                      <TableHead className="eyebrow text-ink-3">Price</TableHead>
                      <TableHead className="eyebrow text-ink-3">Qty</TableHead>
                      <TableHead className="eyebrow text-ink-3">Subtotal</TableHead>
                      <TableHead className="eyebrow text-right text-ink-3">
                        Remove
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableItem item={item} key={item.id} />
                    ))}
                  </TableBody>
                </Table>
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="mt-6 cursor-pointer font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-destructive"
                >
                  Clear cart
                </button>
              </div>

              <div className="flex flex-col gap-5 sm:hidden">
                {cartItems.map((item) => (
                  <CartListMobile item={item} key={item.id} />
                ))}
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="cursor-pointer self-start font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-destructive"
                >
                  Clear cart
                </button>
              </div>
            </div>

            <div>
              <div className="card-surface sticky top-28 p-7">
                <h2 className="font-display text-2xl text-ink">Order summary</h2>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-ink-2">Subtotal</dt>
                    <dd className="font-mono text-sm text-ink">
                      {formatter.format(totalPrice)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-ink-2">Delivery</dt>
                    <dd className="font-mono text-sm text-bronze">White-glove, free</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-line pt-4">
                    <dt className="text-sm font-medium text-ink">Total</dt>
                    <dd className="font-mono text-lg text-ink">
                      {formatter.format(totalPrice)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-7">
                  <Checkout totalPrice={totalPrice} handleToken={handleToken} />
                </div>
                <p className="mt-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-3">
                  Secure payment · Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};
