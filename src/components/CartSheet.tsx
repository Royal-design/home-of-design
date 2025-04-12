import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Separator } from "@radix-ui/react-separator";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { removeFromCart } from "@/redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { formatter } from "@/features/formatter";
import { clearFavourite, removeFavorite } from "@/redux/slice/favouriteSlice";

const CartSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const favourite = useAppSelector((state) => state.favourite.items);
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalFavourite = useAppSelector(
    (state) => state.favourite.totalFavourite
  );

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFavorite(id));
  };
  const handleClear = () => {
    dispatch(clearFavourite());
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <ShoppingCart size={20} strokeWidth={1.5} />
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-l border-border-line  overflow-auto scrollbar-hidden"
      >
        <SheetTitle />
        <SheetDescription />
        <Tabs defaultValue="cart" className="w-full mt-8">
          <TabsList className="bg-button">
            <TabsTrigger value="cart" className="w-full ">
              Shopping Cart
              <div className="rounded-full ml-2 text-primary bg-button flex items-center justify-center p-[10px] h-[1rem] w-[1rem]">
                {totalQuantity}
              </div>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="w-full">
              Wishlist
              <div className="rounded-full ml-2 text-primary bg-button flex items-center justify-center p-[10px] h-[1rem] w-[1rem]">
                {totalFavourite}
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart">
            <div className="flex flex-col gap-2 mt-4 h-screen justify-between">
              <div>
                {totalQuantity === 0 && (
                  <p className="text-center text-primary">The cart is empty</p>
                )}
                {cartItems.map((item) => (
                  <div className="font-rajdhani p-2" key={item.id}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.mainImage}
                          className="h-[2rem] w-[2rem] rounded-full"
                          alt={item.name}
                        />
                        <div className="flex gap-2">
                          <p>{item.qty}</p>
                          <p>x</p>
                          <p>{formatter.format(item.price.newPrice)}</p>
                        </div>
                      </div>

                      <X
                        size={22}
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-button text-primary cursor-pointer hover:bg-button-hover duration-200 rounded-full p-1"
                      />
                    </div>
                    <Separator className="border-[1px]" />
                  </div>
                ))}
              </div>

              <div className="w-full">
                <div className="flex justify-between">
                  <p>Sub Total</p>
                  <p>{formatter.format(totalPrice)}</p>
                </div>
                <Link
                  to={user ? "/shopping-cart" : "/login"}
                  onClick={() => setOpen(false)}
                >
                  <Button className="w-full text-primary bg-button hover:bg-button-hover duration-200 mt-2">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className=" flex flex-col gap-2 mt-4 h-screen justify-between">
              <div>
                {totalFavourite === 0 && (
                  <p className="text-center">No wishlist added</p>
                )}
                {favourite.map((item) => (
                  <div className="font-rajdhani p-2" key={item.id}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.mainImage}
                          className="h-[2rem] w-[2rem] rounded-full"
                          alt="image"
                        />
                        <div className="flex gap-2">
                          <p>{item.name}</p>
                        </div>
                      </div>

                      <X
                        size={22}
                        onClick={() => handleRemove(item.id)}
                        className="bg-button text-primary cursor-pointer hover:bg-button-hover duration-200 rounded-full p-1 "
                      />
                    </div>
                    <Separator className="border-[1px]" />
                  </div>
                ))}
              </div>
              <Button
                onClick={handleClear}
                className="bg-button hover:bg-button-hover duration-200 w-full"
              >
                Clear Wishlist
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
