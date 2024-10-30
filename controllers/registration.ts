import {
    Application,
    Context,
    helpers,
    Router,
} from "https://deno.land/x/oak@v12.4.0/mod.ts";

import client from "../database/index.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { hashPassword } from "../utils/hash.ts";

export default async function UserRegistration(ctx: Context) {
    try {
        const { username, email, password } = await ctx.request.body().value;
         console.log({username, email, password})
        // Check if the username or email is already taken
        const [existingUser] = await client.query(
            "SELECT id FROM chatusers WHERE username = ? OR email = ?",
            [username, email],
        );

        console.log('after check user in DB')

        if (existingUser) {
            ctx.response.status = 409;
            ctx.response.body = { error: "Username or email already taken" };
            return;
        }

        // Hash the password
        const hashedPassword = await hashPassword(password)

        // Save the new user in the database
        try{
            console.log('Inside try before  insert')

            await client.execute(
                "INSERT INTO chatusers(username, email, password) VALUES(?, ?, ?)",
                [username, email, hashedPassword],
            );
    
            ctx.response.status = 201;
            ctx.response.body = { message: "User registered successfully" };
        }catch(error){
            ctx.response.status = 403;
            ctx.response.body = {error: error}
        }
        
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: "Failed to register user" };
        console.error("Registration error:", error);
    }
}
