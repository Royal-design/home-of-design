import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CartItem, removeFromCart, updateCart } from "@/redux/slice/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import React from "react";
import { formatter } from "@/features/formatter";
interface ItemType {
  item: CartItem;
}
export const CartListMobile = ({ item }: ItemType) => {
  const [updateQuantity, setupdateQuantity] = useState<number>(item.qty);
  const dispatch = useDispatch();

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    const newQuantity = updateQuantity + 1;
    setupdateQuantity(newQuantity);
    dispatch(updateCart({ id, qty: newQuantity }));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    if (updateQuantity > 1) {
      const newQuantity = updateQuantity - 1;
      setupdateQuantity(newQuantity);
      dispatch(updateCart({ id, qty: newQuantity }));
    }
  };
  return (
    <Card className="w-full border-border-line p-0 bg-banner">
      <CardHeader className="p-0">
        <CardTitle />
      </CardHeader>
      <CardContent className=" h-full flex w-full  gap-2 p-2">
        <figure className="h-[4rem] w-[4rem]  rounded-sm bg-gray-500">
          <img
            src={item.mainImage}
            alt={item.name}
            className="w-full h-full "
          />
        </figure>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-bold">{item.name}</p>
            <X
              onClick={() => handleRemoveFromCart(item.id)}
              className="w-[1.3rem] bg-button hover:bg-button-hover cursor-pointer h-[1.3rem] text-primary border-border-line border rounded-full p-1"
            />
          </div>

          <p className="text-slate-500 text-xs">{item.category}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm">{item.price.newPrice}</p>
            <div className="flex items-center gap-2">
              <Button
                onClick={(e) => handleDecrement(e, item.id)}
                className="h-6 cursor-pointer bg-button hover:bg-button-hover text-primary border border-border-line rounded-full p-2 flex items-center justify-center"
              >
                -
              </Button>
              <p>{updateQuantity}</p>
              <Button
                onClick={(e) => handleIncrement(e, item.id)}
                className="h-6 cursor-pointer bg-button hover:bg-button-hover text-primary border border-border-line rounded-full p-2 flex items-center justify-center"
              >
                +
              </Button>
            </div>
            <p>{formatter.format(item.totalPrice)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
