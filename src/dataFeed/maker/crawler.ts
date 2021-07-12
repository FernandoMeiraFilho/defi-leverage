import { ethers } from "ethers";
import { ilkRegistryAddress } from "src/constants";
import { provider } from "src/rpc_client/client";
import ilkRegistryABI from "../../ethereum/ABIs/IlkRegistry.json";

export default async () => {
  const ilkRegistry = new ethers.Contract(
    ilkRegistryAddress,
    ilkRegistryABI,
    provider
  );

  const testAddress = await ilkRegistry.ilkData(
    ethers.utils.formatBytes32String("ETH-A")
  );
  console.log(testAddress.gem);
};
