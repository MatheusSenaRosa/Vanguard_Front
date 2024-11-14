import { loadStripe } from "@stripe/stripe-js";

export const getStripeJs = async () => {
  const publicStripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY as string;
  const stripeJs = await loadStripe(publicStripeKey);

  return stripeJs;
};
