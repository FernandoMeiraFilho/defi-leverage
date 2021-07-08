import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "src/.env") });

export const ALCHEMY_MAINNET = process.env["ALCHEMY_MAINNET"];
