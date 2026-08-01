import { CartItem, removeFromCart, updateCart } from "@/redux/slice/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { X, Minus, Plus } from "lucide-react";
import { formatter } from "@/features/formatter";
import { Link } from "react-router-dom";

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
    <div className="flex gap-4 border-b border-line pb-5">
      <Link
        to={`/products/${item.id}`}
        className="card-media flex h-24 w-24 shrink-0 items-center justify-center"
      >
        <img
          src={item.mainImage}
          alt={item.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/products/${item.id}`}
              className="block truncate text-sm font-medium text-ink"
            >
              {item.name}
            </Link>
            <p className="eyebrow mt-1 text-ink-3">{item.category}</p>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveFromCart(item.id)}
            aria-label={`Remove ${item.name}`}
            className="cursor-pointer text-ink-3 transition-colors hover:text-destructive"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-line">
            <button
              type="button"
              onClick={(e) => handleDecrement(e, item.id)}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-ink-2 hover:text-bronze"
            >
              <Minus size={12} />
            </button>
            <span className="min-w-7 text-center font-mono text-xs text-ink">
              {updateQuantity}
            </span>
            <button
              type="button"
              onClick={(e) => handleIncrement(e, item.id)}
              aria-label="Increase quantity"
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-ink-2 hover:text-bronze"
            >
              <Plus size={12} />
            </button>
          </div>
          <p className="font-mono text-sm text-ink">
            {formatter.format(item.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};
