export interface Deployment {
    name: string;
    chainId: number;
    AUTO_LOOP: `0x${string}`;
    AUTO_LOOP_REGISTRY: `0x${string}`;
    AUTO_LOOP_REGISTRAR: `0x${string}`;
}
export declare const DEPLOYMENTS: Record<number, Deployment>;
export declare function getDeployment(chainId: number): Deployment;
