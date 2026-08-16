import { type PublicClient, type WalletClient } from "viem";
/**
 * Get a viem Contract instance for the AutoLoop core contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
export declare function getAutoLoopContract(client: PublicClient | WalletClient, chainId?: number): any;
/**
 * Get a viem Contract instance for the AutoLoopRegistry contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
export declare function getRegistryContract(client: PublicClient | WalletClient, chainId?: number): any;
/**
 * Get a viem Contract instance for the AutoLoopRegistrar contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
export declare function getRegistrarContract(client: PublicClient | WalletClient, chainId?: number): any;
