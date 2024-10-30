import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";

export async function loginMiddleware(ctx: Context, next: () => Promise<unknown>) {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Request body is required" };
    return;
  }

  const { email, password } = await ctx.request.body().value;

  if (!email || !password) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Email and password are required" };
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid email format" };
    return;
  }

  await next();
}
