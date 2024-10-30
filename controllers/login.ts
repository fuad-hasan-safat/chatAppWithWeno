import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.2/mod.ts";
import { encode } from "@gz/jwt";
import client from "../database/index.ts";
import { comparePassword, hashPassword } from "../utils/hash.ts"; // Assume hash utility

const SECRET_KEY = Deno.env.get("HASH_SECRET") as string;

export async function login(ctx: Context) {
    if (!ctx.request.hasBody) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request body is required" };
        return;
    }

    const { email, password } = await ctx.request.body().value;

    const [user] = await client.query(
        "SELECT * FROM chatusers WHERE email = ?",
        [email],
    );

    console.log("User of email -->", user);

    if (!user) {
        ctx.response.status = 401;
        ctx.response.body = { error: "User not found" };
        return;
    }

    const ispassOk = await comparePassword(password, user.password);

    if (!ispassOk) {
        ctx.response.status = 401;
        ctx.response.body = { error: "Wrong Password" };
        return;
    }

    console.log({ ispassOk });

    const payload = { id: user.id, username: user.username, email: user.email };

    const token = await encode(payload, "secret", { algorithm: "HS256" });

    ctx.response.status = 200;
    ctx.response.body = {
        username: user.username,
        email: user.email,
        token: token,
    };
}
