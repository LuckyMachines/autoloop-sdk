export interface Deployment {
  name: string;
  chainId: number;
  AUTO_LOOP: `0x${string}`;
  AUTO_LOOP_REGISTRY: `0x${string}`;
  AUTO_LOOP_REGISTRAR: `0x${string}`;
}

export const DEPLOYMENTS: Record<number, Deployment> = {
  11155111: {
    name: "Sepolia",
    chainId: 11155111,
    AUTO_LOOP: "0xB5F4cF500daE3162A4A4F5D2f3569bE1d5BE5238",
    AUTO_LOOP_REGISTRY: "0xAE63c1071020964e61f668De95cA1c90ad5695A7",
    AUTO_LOOP_REGISTRAR: "0xAE473527893bbf687D93cFD0e447d13202054ef0",
  },
  31337: {
    name: "Anvil",
    chainId: 31337,
    AUTO_LOOP: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    AUTO_LOOP_REGISTRY: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    AUTO_LOOP_REGISTRAR: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  },
};

export function getDeployment(chainId: number): Deployment {
  const deployment = DEPLOYMENTS[chainId];
  if (!deployment) {
    throw new Error(
      `No deployment found for chain ID ${chainId}. Supported: ${Object.keys(DEPLOYMENTS).join(", ")}`
    );
  }
  return deployment;
}
