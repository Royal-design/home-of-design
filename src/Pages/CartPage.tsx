import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { clearCart, order } from "@/redux/slice/cartSlice";
import { RootState, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { formatter } from "@/features/formatter";
import { db } from "@/firebase/firebaseConfig";
import { TableItem } from "@/components/TableItem";
import { CartListMobile } from "@/components/CartListMobile";
import Checkout from "@/components/Checkout";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
    console.log("=================");
    console.log("Payment success");
    console.log("=================");
  };

  return (
    <main className="">
      <div className="mb-12">
        {totalQuantity === 0 ? (
          <p className="p-8">Cart is empty</p>
        ) : (
          <section className="h-auto">
            <div className="flex flex-col gap-4 my-4 bg-background-card max-sm:p-4 px-8 py-4">
              <BreadCrumbs />
              <h2 className="font-bold">Shopping Cart</h2>
            </div>

            <div className="flex max-sm:flex-col gap-[2rem] max-sm:gap-[4rem] ">
              <div className="hidden max-sm:flex max-sm:flex-col max-sm:gap-2 px-4">
                {cartItems.map((item) => (
                  <CartListMobile item={item} key={item.id} />
                ))}
                <Button
                  className="mt-4 dark:bg-slate-700 w-[6rem] dark:text-white dark:hover:bg-slate-600"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </div>
              <div className="w-full max-sm:hidden px-8">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Products</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableItem item={item} key={item.id} />
                    ))}
                  </TableBody>
                </Table>
                <Button
                  className="mt-4 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </div>

              <div className="flex w-[20rem] max-sm:w-full max-sm:px-4 px-8 flex-col gap-5">
                <article className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatter.format(totalPrice)}</p>
                </article>
                <article className="flex justify-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </article>
                <article className="flex justify-between">
                  <p>Total</p>
                  <p>{formatter.format(totalPrice)}</p>
                </article>
                <Checkout totalPrice={totalPrice} handleToken={handleToken} />
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
};
