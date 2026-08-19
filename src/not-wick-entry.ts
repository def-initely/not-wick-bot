import "dotenv/config";
import { startNotWick } from "./bot";

const client = startNotWick();

if (!client) {
  process.exitCode = 1;
}