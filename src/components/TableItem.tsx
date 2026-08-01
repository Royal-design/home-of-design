import { TableCell, TableRow } from "@/components/ui/table";
import { X, Minus, Plus } from "lucide-react";
import { CartItem, removeFromCart, updateCart } from "@/redux/slice/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatter } from "@/features/formatter";
import { Link } from "react-router-dom";

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
    <TableRow className="group border-b border-line">
      <TableCell className="w-[22rem] py-6">
        <Link to={`/products/${item.id}`} className="flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center bg-paper-2">
            <img
              src={item.mainImage}
              alt={item.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-ink transition-colors hover:text-bronze">
              {item.name}
            </span>
            <span className="eyebrow mt-1 block text-ink-3">
              {item.category}
            </span>
          </span>
        </Link>
      </TableCell>
      <TableCell className="font-mono text-sm text-ink">
        {formatter.format(item.price.newPrice)}
      </TableCell>
      <TableCell>
        <div className="flex items-center border border-line">
          <button
            type="button"
            onClick={(e) => handleDecrement(e, item.id)}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-ink-2 transition-colors hover:text-bronze"
          >
            <Minus size={13} />
          </button>
          <span className="min-w-8 text-center font-mono text-xs text-ink">
            {updateQuantity}
          </span>
          <button
            type="button"
            onClick={(e) => handleIncrement(e, item.id)}
            aria-label="Increase quantity"
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-ink-2 transition-colors hover:text-bronze"
          >
            <Plus size={13} />
          </button>
        </div>
      </TableCell>
      <TableCell className="font-mono text-sm text-ink">
        {formatter.format(item.totalPrice)}
      </TableCell>
      <TableCell className="text-right">
        <button
          type="button"
          onClick={() => handleRemoveFromCart(item.id)}
          aria-label={`Remove ${item.name}`}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center text-ink-3 transition-colors hover:text-destructive"
        >
          <X size={16} />
        </button>
      </TableCell>
    </TableRow>
  );
};
