import { Context } from "oak/mod.ts"
import { itemsService } from "../services/itemService.ts"

export const itemController = {
  getAllItems: (ctx: Context) => {
    const items = itemsService.getAllItems()
    ctx.response.body = items
  },
}
