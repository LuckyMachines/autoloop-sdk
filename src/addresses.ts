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
    AUTO_LOOP: "0x6742F258121bf616a581e9E773e33DEaAe07E2e1",
    AUTO_LOOP_REGISTRY: "0x7a87279cD828954C8b7f9Bbe547b51e59E587d20",
    AUTO_LOOP_REGISTRAR: "0x475609997112897E492311A0A27D1f95F808921A",
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
