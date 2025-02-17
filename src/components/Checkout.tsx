import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { Button } from "./ui/button";

interface CheckoutProps {
  totalPrice: number;
  handleToken: (token: Token) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ totalPrice, handleToken }) => {
  return (
    <div className="">
      <div className="hidden">
        <StripeCheckout
          token={handleToken}
          stripeKey={import.meta.env.VITE_PUBLISHABLE_KEY}
          amount={totalPrice * 100}
          name="Home of Designs"
          email="hd@gmail.com"
          description="Payment test using Stripe"
          allowRememberMe
          image="https://media.istockphoto.com/id/2078490118/photo/businessman-using-laptop-to-online-payment-banking-and-online-shopping-financial-transaction.jpg?s=612x612&w=0&k=20&c=1x2G24ANsWxG4YW6ZaoeFPEzjmKFE4ZlohVQSwbjGj8="
        />
      </div>

      <Button
        onClick={() =>
          (document.querySelector(".StripeCheckout") as HTMLElement)?.click()
        }
        className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Checkout;
