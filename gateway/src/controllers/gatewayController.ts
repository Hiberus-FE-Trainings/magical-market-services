import { Context } from "oak/mod.ts";
import { gatewayService } from "../services/gatewayService.ts";

export const gatewayController = {
  tradeItem: async (ctx: Context) => {
    try {
      const body = ctx.request.body();
      const { buyerId, sellerId, itemId } = await body.value;
      gatewayService.itemTrade(itemId, sellerId, buyerId);
    } catch (error) {
      console.log(error);
    }
  },
};
