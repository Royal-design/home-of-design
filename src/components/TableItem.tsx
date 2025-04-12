import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem, removeFromCart, updateCart } from "@/redux/slice/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatter } from "@/features/formatter";
interface ItemType {
  item: CartItem;
}
export const TableItem = ({ item }: ItemType) => {
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
    <TableRow className="h-[1rem] border-t border-border-line hover:bg-button">
      <TableCell className="font-medium  w-[20rem]">
        <figure className="flex items-center  gap-3">
          <img
            src={item.mainImage}
            alt="image"
            className="w-[3rem] h-[3rem] "
          />
          <p className="max-sm:text-xs w-full">{item.name}</p>
        </figure>
      </TableCell>
      <TableCell className="max-sm:text-xs">{item.price.newPrice}</TableCell>
      <TableCell>
        <div className="w-[5rem]  max-sm:h-[2rem] dark:bg-transparent flex h-[3rem] justify-around items-center bg-white border-border-line border">
          <Button
            onClick={(e) => handleDecrement(e, item.id)}
            variant="ghost"
            className="cursor-pointer  dark:hover:bg-transparent hover:bg-transparent"
          >
            -
          </Button>

          <p>{updateQuantity}</p>
          <Button
            onClick={(e) => handleIncrement(e, item.id)}
            variant="ghost"
            className="cursor-pointer  dark:hover:bg-transparent hover:bg-transparent"
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell>{formatter.format(item.totalPrice)}</TableCell>
      <TableCell className="flex justify-end items-center h-[4rem] ">
        <X
          onClick={() => handleRemoveFromCart(item.id)}
          className="w-[1.3rem] cursor-pointer h-[1.3rem] bg-button hover:bg-button-hover text-primary rounded-full p-1"
        />
      </TableCell>
    </TableRow>
  );
};
