export interface Deployment {
  name: string;
  chainId: number;
  AUTO_LOOP: `0x${string}`;
  AUTO_LOOP_REGISTRY: `0x${string}`;
  AUTO_LOOP_REGISTRAR: `0x${string}`;
}

export const DEPLOYMENTS: Record<number, Deployment> = {
  1: {
    name: "Mainnet",
    chainId: 1,
    AUTO_LOOP: "0x6748415BcE63c0FBf1E50ceB2128BfeAC977224F",
    AUTO_LOOP_REGISTRY: "0xC1b9241DE87108EffF5caAf0340CcEbD05A5425f",
    AUTO_LOOP_REGISTRAR: "0x202d73Ac243907A6e81B5FF55E4c316567e4fF80",
  },
  11155111: {
    name: "Sepolia",
    chainId: 11155111,
    AUTO_LOOP: "0x311eB21A1f7C0f12Ea7995cd6c02855b1bDa2132",
    AUTO_LOOP_REGISTRY: "0xAC905aF2e40404D06317911beb03317Bd1bc5858",
    AUTO_LOOP_REGISTRAR: "0xDA2867844F77768451c2b5f208b4f78571fd82C1",
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
