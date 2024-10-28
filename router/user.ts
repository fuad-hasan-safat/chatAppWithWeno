import { Router } from "@oak/oak/router";

const userRouter = new Router({prefix:'user'});

userRouter.get("/", (ctx)=>{
    ctx.response.body = "Hello, user!";
})
userRouter.get("/data",  (ctx) => {
    ctx.response.body = { message: "Hello, World!" };
    });
    

export default  userRouter;
