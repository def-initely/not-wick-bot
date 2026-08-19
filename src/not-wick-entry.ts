import "dotenv/config";
import { startNotWick } from "./not-wick/bot";

const client = startNotWick();

if (!client) {
  process.exitCode = 1;
}