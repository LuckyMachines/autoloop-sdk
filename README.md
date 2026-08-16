# @luckymachines/autoloop-sdk

TypeScript SDK for interacting with AutoLoop smart contracts. Built on [viem](https://viem.sh).

## Installation

```bash
npm install @luckymachines/autoloop-sdk viem
```

The SDK is published to the Lucky Machines registry at `packages.luckymachines.io`.

## Quick Start

```typescript
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { getAutoLoopContract, getRegistryContract } from "@luckymachines/autoloop-sdk";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Get a typed contract instance
const autoLoop = getAutoLoopContract(client);

// Read contract balance
const balance = await autoLoop.read.balance(["0xYourContract..."]);
console.log("Balance:", balance);

// Get all registered contracts
const registry = getRegistryContract(client);
const contracts = await registry.read.getRegisteredAutoLoops();
console.log("Registered:", contracts);
```

## API Reference

### Contract Factories

#### `getAutoLoopContract(client, chainId?)`
Returns a viem contract instance for the AutoLoop core contract.

```typescript
const autoLoop = getAutoLoopContract(publicClient);

// Read operations
await autoLoop.read.balance([contractAddress]);
await autoLoop.read.maxGasFor([contractAddress]);
await autoLoop.read.maxGasPriceFor([contractAddress]);
await autoLoop.read.gasBuffer();
await autoLoop.read.baseFee();
```

#### `getRegistryContract(client, chainId?)`
Returns a viem contract instance for the AutoLoopRegistry.

```typescript
const registry = getRegistryContract(publicClient);

// Read operations
await registry.read.getRegisteredAutoLoops();
await registry.read.getRegisteredAutoLoopsFor([ownerAddress]);
await registry.read.getRegisteredControllers();
await registry.read.isRegisteredAutoLoop([contractAddress]);
await registry.read.isRegisteredController([controllerAddress]);
await registry.read.primaryAdmin([contractAddress]);
```

#### `getRegistrarContract(client, chainId?)`
Returns a viem contract instance for the AutoLoopRegistrar.

```typescript
const registrar = getRegistrarContract(walletClient);

// Write operations
await registrar.write.registerAutoLoopFor([contractAddress, maxGas]);
await registrar.write.deposit([contractAddress], { value: parseEther("0.1") });
await registrar.write.requestRefundFor([contractAddress]);
await registrar.write.registerController([], { value: parseEther("0.001") });
```

### Deployment Addresses

#### `getDeployment(chainId)`
Returns contract addresses for a specific chain.

```typescript
import { getDeployment, DEPLOYMENTS } from "@luckymachines/autoloop-sdk";

const sepolia = getDeployment(11155111);
console.log(sepolia.AUTO_LOOP);      // "0xB5F4cF..."
console.log(sepolia.AUTO_LOOP_REGISTRY);  // "0xAE63c1..."
console.log(sepolia.AUTO_LOOP_REGISTRAR); // "0xAE473..."

// Or access the full map
console.log(Object.keys(DEPLOYMENTS)); // [11155111, 31337]
```

Supported chains:
| Chain | ID | Status |
|-------|-----|--------|
| Sepolia | 11155111 | Deployed |
| Anvil (local) | 31337 | Development |

### ABIs

All ABIs are exported as `const` arrays for full type inference:

```typescript
import {
  autoLoopABI,
  autoLoopRegistryABI,
  autoLoopRegistrarABI,
  autoLoopCompatibleInterfaceABI,
} from "@luckymachines/autoloop-sdk";
```

## Examples

### Listen for Loop Events

```typescript
import { createPublicClient, http, parseAbiItem } from "viem";
import { sepolia } from "viem/chains";
import { getDeployment } from "@luckymachines/autoloop-sdk";

const client = createPublicClient({ chain: sepolia, transport: http() });
const deployment = getDeployment(11155111);

const unwatch = client.watchEvent({
  address: deployment.AUTO_LOOP,
  event: parseAbiItem(
    "event AutoLoopProgressed(address indexed autoLoopAddress, uint256 indexed timestamp, address controller, uint256 gasUsed, uint256 gasPrice, uint256 gasCost, uint256 fee)"
  ),
  onLogs: (logs) => {
    for (const log of logs) {
      console.log("Loop progressed:", log.args);
    }
  },
});
```

### Check if Contract Needs Update

```typescript
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { autoLoopCompatibleInterfaceABI } from "@luckymachines/autoloop-sdk";

const client = createPublicClient({ chain: sepolia, transport: http() });

const [loopIsReady, data] = await client.readContract({
  address: "0xYourContract...",
  abi: autoLoopCompatibleInterfaceABI,
  functionName: "shouldProgressLoop",
});

console.log("Ready:", loopIsReady);
```

### Register & Fund a Contract

```typescript
import { createWalletClient, http, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { getRegistrarContract } from "@luckymachines/autoloop-sdk";

const wallet = createWalletClient({ chain: sepolia, transport: http() });
const registrar = getRegistrarContract(wallet);

// Register with 500k max gas
await registrar.write.registerAutoLoopFor(["0xYourContract...", 500000n]);

// Fund with 0.5 ETH
await registrar.write.deposit(["0xYourContract..."], {
  value: parseEther("0.5"),
});
```

## Building

```bash
npm run build      # Compile TypeScript to dist/
```

## Publishing

```bash
npm run registry:prod    # Point to packages.luckymachines.io
npm run publish:registry # Publish to Verdaccio
```

## License

MIT
