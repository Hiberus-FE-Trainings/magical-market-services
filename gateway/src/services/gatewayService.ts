import { ENV } from "../../config/env.ts";

const triggerBalanceUpdate = async (mageId: string, balance: number) =>
  await fetch(`${ENV.MAGES_URL}/${mageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ balance }),
  });

const triggerDeleteItem = async (itemId: string) =>
  fetch(`${ENV.ITEMS_URL}/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

const adjustMagesBalance = async ({
  buyerId,
  sellerId,
  itemPrice,
  buyerBalance,
  sellerBalance,
}: {
  buyerId: string;
  sellerId: string;
  itemPrice: number;
  buyerBalance: number;
  sellerBalance: number;
}) => {
  const finalSellerBalance = sellerBalance + itemPrice;
  const finalBuyerBalance = buyerBalance - itemPrice;

  if (finalBuyerBalance < 0)
    throw new Error(`Buyer with ID: ${buyerId} does not have enought balance to proceed with the trade!`);
  await Promise.all([
    triggerBalanceUpdate(sellerId, finalSellerBalance),
    triggerBalanceUpdate(buyerId, finalBuyerBalance),
  ]);
};

export const gatewayService = {
  itemTrade: async (itemId: string, sellerId: string, buyerId: string) => {
    const [item, seller, buyer] = await Promise.all([
      (await fetch(`${ENV.ITEMS_URL}/${itemId}`)).json(),
      (await fetch(`${ENV.MAGES_URL}/${sellerId}`)).json(),
      (await fetch(`${ENV.MAGES_URL}/${buyerId}`)).json(),
    ]);

    await adjustMagesBalance({
      buyerId,
      sellerId,
      itemPrice: item.price,
      sellerBalance: seller.balance,
      buyerBalance: buyer.balance,
    });
    triggerDeleteItem(itemId);
  },
};
