

import { ethers } from "ethers";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

const { MUMBAI_ALCHEMY_KEY, 
        PRIVATE_KEY
      } = process.env;


function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array: any[] = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function checkBalance(signer: ethers.Wallet): Promise<boolean> {
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    console.log("INSUFFICIENT ETH BALANCE");
    return false;
  }
  return true;
}

function getSigner(): ethers.Wallet {
  const wallet =
    process.env.ADMIN_WALLET_SEED && process.env.ADMIN_WALLET_SEED.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.ADMIN_WALLET_SEED)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  console.log(`Using address: ${wallet.address}`);

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    MUMBAI_ALCHEMY_KEY
  );

  return wallet.connect(provider);
}

export { checkBalance, getSigner, convertStringArrayToBytes32, EXPOSED_KEY };