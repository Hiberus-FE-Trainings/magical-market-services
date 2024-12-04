export type Trade = {
  id: string;
  amount: number;
  buyer_id: string;
  date: string;
  item_id: string;
  seller_id: string;
};

export type LoginResponse =
  | {
      success: true;
      token: string;
      email: string;
    }
  | {
      success: false;
      errorMessage: string;
    };
export type ContextWithParams = {
  params: { [key: string]: string | undefined };
};
