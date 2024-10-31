import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

import {
    Application,
    Context,
    helpers,
    Router,
  } from "https://deno.land/x/oak@v12.4.0/mod.ts";
  import key from "../utils/jwtkey.ts";
  import { authorizeMiddleware } from "../middlewares/authorizarionMiddleware.ts";

  const { getQuery } = helpers;


const userRouter = new Router({prefix: "/user"});

userRouter.use(authorizeMiddleware)

userRouter.get("/:userid", async (ctx: Context)=>{
    
   ctx.response.body = {
    message: "valid user found",
    user: ctx.state.user
   }
})

export default  userRouter;
