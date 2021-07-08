import { ethers } from "ethers";
import { ALCHEMY_MAINNET } from "../env";

export const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET);
