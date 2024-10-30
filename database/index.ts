import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import mysql from "npm:mysql2@^2.3.3/promise";


const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "mypractice",
  password: "",
});


export default client;