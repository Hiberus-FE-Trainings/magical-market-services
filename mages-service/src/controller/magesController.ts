import { Context } from 'oak/mod.ts';
import { ContextWithParams } from "../types.ts";
import { magesService } from "../services/magesService.ts";


export const magesController = {

    getAllMages: (ctx: Context) =>  {

        const mages = magesService.getMages()

        ctx.response.body= mages
    },

    getMage: (ctx:Context & ContextWithParams) => {
        const mageId= ctx.params.id ? parseInt(ctx.params.id) : 0;

        const mage = magesService.getMageById(mageId)

        if (!mage) {
            ctx.response.status = 404;  
            ctx.response.body = { message: "mage not found" }; 
            return;  
        }
    
        
        ctx.response.body = mage;

    }
}