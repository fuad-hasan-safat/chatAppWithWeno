import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";

export async function registerMiddleware(ctx: Context, next: () => Promise<unknown>) {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Request body is required" };
    return;
  }

  const body = await ctx.request.body().value;
  const { username, email, password } = body;

  // Validate presence of fields
  if (!username || !email || !password) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Username, email, and password are required" };
    return;
  }

  // Simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid email format" };
    return;
  }

  // Password length check
  if (password.length < 6) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Password must be at least 6 characters long" };
    return;
  }

  // If all validations pass, proceed to the next middleware or handler
  await next();
}
