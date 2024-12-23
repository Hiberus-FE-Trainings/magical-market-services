export type Item = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  approval_status: "Pending" | "Approved" | "Rejected";
  image_url: string;
  seller_id: number;
  seller_name: string;
};

export const ITEM_KEYS: (keyof Item)[] = [
  "name",
  "description",
  "category",
  "price",
  "approval_status",
  "image_url",
  "seller_id",
];

export type ContextWithParams = {
  params: { [key: string]: string | undefined };
};
