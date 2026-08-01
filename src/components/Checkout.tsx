import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Lock } from "lucide-react";

interface CheckoutProps {
  totalPrice: number;
  handleToken: (token: Token) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ totalPrice, handleToken }) => {
  return (
    <div>
      <div className="hidden">
        <StripeCheckout
          token={handleToken}
          stripeKey={import.meta.env.VITE_PUBLISHABLE_KEY}
          amount={totalPrice * 100}
          name="Home of Design"
          description="Secure checkout"
          allowRememberMe
        />
      </div>

      <button
        type="button"
        onClick={() =>
          (document.querySelector(".StripeCheckout") as HTMLElement)?.click()
        }
        className="btn-primary w-full"
      >
        <Lock size={14} />
        Checkout securely
      </button>
    </div>
  );
};

export default Checkout;
