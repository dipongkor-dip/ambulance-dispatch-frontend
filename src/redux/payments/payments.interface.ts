export interface PaymentInitialization {
  message: string;
  payment_id: number;
  transaction_id: string;
  payment_url: string;
}

export interface PaymentRecord {
  id: number;
  trip_id: number;
  amount: number;
  status: string;
  payment_method?: string;
  transaction_id?: string;
  receipt_url?: string | null;
}

export interface PaymentListResponse {
  message: string;
  payments: PaymentRecord[];
}
