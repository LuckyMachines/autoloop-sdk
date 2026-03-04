import {
  getContract,
  type PublicClient,
  type WalletClient,
} from "viem";
import {
  autoLoopABI,
  autoLoopRegistryABI,
  autoLoopRegistrarABI,
} from "./abis";
import { getDeployment } from "./addresses";

/**
 * Get a viem Contract instance for the AutoLoop core contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
export function getAutoLoopContract(
  client: PublicClient | WalletClient,
  chainId?: number
) {
  const chain = chainId ?? (client as any).chain?.id;
  if (!chain) throw new Error("Chain ID required");
  const deployment = getDeployment(chain);
  return getContract({
    address: deployment.AUTO_LOOP,
    abi: autoLoopABI,
    client,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Get a viem Contract instance for the AutoLoopRegistry contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
export function getRegistryContract(
  client: PublicClient | WalletClient,
  chainId?: number
) {
  const chain = chainId ?? (client as any).chain?.id;
  if (!chain) throw new Error("Chain ID required");
  const deployment = getDeployment(chain);
  return getContract({
    address: deployment.AUTO_LOOP_REGISTRY,
    abi: autoLoopRegistryABI,
    client,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Get a viem Contract instance for the AutoLoopRegistrar contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
export function getRegistrarContract(
  client: PublicClient | WalletClient,
  chainId?: number
) {
  const chain = chainId ?? (client as any).chain?.id;
  if (!chain) throw new Error("Chain ID required");
  const deployment = getDeployment(chain);
  return getContract({
    address: deployment.AUTO_LOOP_REGISTRAR,
    abi: autoLoopRegistrarABI,
    client,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
