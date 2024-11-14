import { getStripeJs } from "@libs";

import { api } from "../config";
import { IUseStripe } from "./types";

export const useStripeServices = (): IUseStripe => {
  const baseUrl = "/stripe";

  return {
    getSignature: async () => {
      const { data } = await api.get(baseUrl);

      return data;
    },
    createCustomer: async () => {
      const { data } = await api.post(baseUrl);

      const { sessionId } = data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    },
  };
};
