// import { Application, Context, Router } from "@oak/oak";
import {
  Application,
  Context,
  helpers,
  Router,
} from "https://deno.land/x/oak@v12.4.0/mod.ts";

import ChatServer from "./servers/ChatServer.ts";
import UserRegistration from "./controllers/registration.ts";
import { registerMiddleware } from "./middlewares/registration.ts";
import { loginMiddleware } from "./middlewares/login.ts";
import { login } from "./controllers/login.ts";

const app = new Application();
const port = 3000;
const router = new Router();
const server = new ChatServer();

router.post("/register", registerMiddleware, async (ctx: Context) => {
  await UserRegistration(ctx);
});
router.post("/login", loginMiddleware, async (ctx: Context) => {
  await login(ctx);
});

router.get("/start_web_socket", (ctx: Context) => server.handleConnection(ctx));

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({
    root: Deno.cwd(),
    index: "public/index.html",
  });
});

console.log("Listening at http://localhost:" + port);
await app.listen({ port });
