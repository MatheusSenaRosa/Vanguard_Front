type GetSignatureResponse = {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  product: string;
  recurring: {
    interval: string;
    interval_count: number;
    usage_type: string;
  };
  tax_behavior: string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

type GetSignature = () => Promise<GetSignatureResponse>;

type CreateCustomer = () => Promise<void>;

export interface IUseStripe {
  getSignature: GetSignature;
  createCustomer: CreateCustomer;
}
