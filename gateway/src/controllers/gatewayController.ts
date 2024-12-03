import { Context } from "oak/mod.ts";
import { gatewayService } from "../services/gatewayService.ts";

export const gatewayController = {
  tradeItem: async (ctx: Context) => {
    try {
      const body = ctx.request.body();
      const { buyerId, sellerId, itemId } = await body.value;
      const trade = await gatewayService.itemTrade(itemId, sellerId, buyerId);

      ctx.response.status= 201
      ctx.response.body = trade

    } catch (error) {
      ctx.response.status= 400
      ctx.response.body = `${error}`
    }
  },
};
