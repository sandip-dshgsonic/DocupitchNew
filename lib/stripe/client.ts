// Stripe Client SDK
import { Stripe as StripeProps, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<StripeProps | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
        "pk_test_51Q9lX9SD9qBlotOwYH0s9lmYPRAYHQoN0JzijZsDRxO0jfEVwKM0CUPvtW8IqLfbdWTUdmo2wYCnkxPz4AoRdjYo00jikf0pS1",
    );
  }

  return stripePromise;
};
