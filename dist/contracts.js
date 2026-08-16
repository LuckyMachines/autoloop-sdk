"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutoLoopContract = getAutoLoopContract;
exports.getRegistryContract = getRegistryContract;
exports.getRegistrarContract = getRegistrarContract;
const viem_1 = require("viem");
const abis_1 = require("./abis");
const addresses_1 = require("./addresses");
/**
 * Get a viem Contract instance for the AutoLoop core contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
function getAutoLoopContract(client, chainId) {
    const chain = chainId ?? client.chain?.id;
    if (!chain)
        throw new Error("Chain ID required");
    const deployment = (0, addresses_1.getDeployment)(chain);
    return (0, viem_1.getContract)({
        address: deployment.AUTO_LOOP,
        abi: abis_1.autoLoopABI,
        client,
    }); // eslint-disable-line @typescript-eslint/no-explicit-any
}
/**
 * Get a viem Contract instance for the AutoLoopRegistry contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
function getRegistryContract(client, chainId) {
    const chain = chainId ?? client.chain?.id;
    if (!chain)
        throw new Error("Chain ID required");
    const deployment = (0, addresses_1.getDeployment)(chain);
    return (0, viem_1.getContract)({
        address: deployment.AUTO_LOOP_REGISTRY,
        abi: abis_1.autoLoopRegistryABI,
        client,
    }); // eslint-disable-line @typescript-eslint/no-explicit-any
}
/**
 * Get a viem Contract instance for the AutoLoopRegistrar contract.
 * The client's chain ID is used by default, or pass an explicit chainId.
 */
function getRegistrarContract(client, chainId) {
    const chain = chainId ?? client.chain?.id;
    if (!chain)
        throw new Error("Chain ID required");
    const deployment = (0, addresses_1.getDeployment)(chain);
    return (0, viem_1.getContract)({
        address: deployment.AUTO_LOOP_REGISTRAR,
        abi: abis_1.autoLoopRegistrarABI,
        client,
    }); // eslint-disable-line @typescript-eslint/no-explicit-any
}
