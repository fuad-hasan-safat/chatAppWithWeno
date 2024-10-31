import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import type { Context, helpers } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import key from "../utils/jwtkey.ts";

export async function authorizeMiddleware(ctx: Context, next: ()=> Promise<unknown>) {

    const headers: Headers = ctx.request.headers;
    console.log({headers})
    const authorization = headers.get('Authorization') as string
    console.log({authorization})

    if(!authorization){
        ctx.response.body = {
            error: "Please add Authorization token in header"
        }

        return;
    }

    const jwt = authorization.split(' ')[1];

    try{
        const payload = await verify(jwt, key); 
        if(payload){

            ctx.state.user = payload
            await next();
        }
    }catch(_error){
        ctx.response.body = {
            error:  "Unauthorized user",
            tips: "Login please, and use token on your hearder Authorizition section"
        };
    }

}