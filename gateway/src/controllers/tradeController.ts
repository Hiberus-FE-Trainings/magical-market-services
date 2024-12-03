import { Context } from "oak/mod.ts"
import { tradeService } from "../services/tradeService.ts"

export const tradeController = {
  tradeItem: async (ctx: Context) => {
    try {
      const body = ctx.request.body()
      const { buyerId, sellerId, itemId } = await body.value
      const trade = await tradeService.itemTrade(itemId, sellerId, buyerId)

      ctx.response.status = 201
      ctx.response.body = trade
    } catch (error) {
      ctx.response.status = 400
      ctx.response.body = `${error}`
    }
  },
}
