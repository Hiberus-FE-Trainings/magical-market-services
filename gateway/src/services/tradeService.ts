import { ENV } from "../../config/env.ts"
import DynamodbClient from "../../db/db.ts"
import { PutItemCommand } from "client-dynamodb"
import { v1 } from "uuid"

import { marshall } from "util-dynamodb"
import { Trade } from "../types.ts"

const createTradeEntry = async ({
  buyerId,
  sellerId,
  itemId,
  amount,
}: {
  buyerId: string
  sellerId: string
  itemId: string
  amount: number
}): Promise<Trade> => {
  const newTrade = {
    id: v1.generate(),
    amount,
    buyer_id: buyerId,
    seller_id: sellerId,
    item_id: itemId,
    date: new Date().toISOString().split("T")[0],
  }
  const command = new PutItemCommand({
    TableName: "Trades",
    Item: marshall(newTrade),
    ReturnValues: "NONE",
  })

  await DynamodbClient.send(command)
  return newTrade as Trade
}

const triggerBalanceUpdate = async (mageId: string, balance: number) =>
  await fetch(`${ENV.MAGES_URL}/${mageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ balance }),
  })

const triggerDeleteItem = async (itemId: string) =>
  await fetch(`${ENV.ITEMS_URL}/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

const adjustMagesBalance = async ({
  buyerId,
  sellerId,
  itemPrice,
  buyerBalance,
  sellerBalance,
}: {
  buyerId: string
  sellerId: string
  itemPrice: number
  buyerBalance: number
  sellerBalance: number
}) => {
  const finalSellerBalance = sellerBalance + itemPrice
  const finalBuyerBalance = buyerBalance - itemPrice

  if (finalBuyerBalance < 0) {
    throw new Error(
      `Buyer with ID: ${buyerId} does not have enought balance to proceed with the trade!`
    )
  }
  await Promise.all([
    triggerBalanceUpdate(sellerId, finalSellerBalance),
    triggerBalanceUpdate(buyerId, finalBuyerBalance),
  ])
}

export const tradeService = {
  itemTrade: async (
    itemId: string,
    sellerId: string,
    buyerId: string
  ): Promise<Trade> => {
    const [item, seller, buyer] = await Promise.all([
      fetch(`${ENV.ITEMS_URL}/${itemId}`),
      fetch(`${ENV.MAGES_URL}/${sellerId}`),
      fetch(`${ENV.MAGES_URL}/${buyerId}`),
    ]).then(async ([item, seller, buyer]) => {
      if (!item.ok) {
        throw new Error(`Item with ID: ${itemId} was not found!`)
      }
      if (!seller.ok) {
        throw new Error(`Seller with ID: ${sellerId} was not found!`)
      }
      if (!buyer.ok) {
        throw new Error(`Buyer with ID: ${buyerId} was not found!`)
      }
      return await Promise.all([item.json(), seller.json(), buyer.json()])
    })

    await adjustMagesBalance({
      buyerId,
      sellerId,
      itemPrice: item.price,
      sellerBalance: seller.balance,
      buyerBalance: buyer.balance,
    })
    await triggerDeleteItem(itemId)

    return await createTradeEntry({
      buyerId,
      sellerId,
      amount: item.price,
      itemId: item.id,
    })
  },
}
