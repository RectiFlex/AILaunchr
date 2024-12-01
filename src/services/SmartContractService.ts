import { Contract, ContractFactory, JsonRpcProvider, Wallet } from 'ethers';
import { chainConfigs } from '../config/chains';
import type { ChainId } from '../types';

export class SmartContractService {
  private provider: JsonRpcProvider;
  private wallet: Wallet;
  private chainId: ChainId;

  constructor(chainId: ChainId, privateKey: string) {
    const config = chainConfigs[chainId];
    if (!config) throw new Error('Unsupported chain');

    this.chainId = chainId;
    this.provider = new JsonRpcProvider(config.rpcUrl);
    this.wallet = new Wallet(privateKey, this.provider);
  }

  async deployContract(
    contractName: string,
    abi: any[],
    bytecode: string,
    args: any[] = []
  ) {
    try {
      const factory = new ContractFactory(abi, bytecode, this.wallet);
      const contract = await factory.deploy(...args);
      await contract.waitForDeployment();

      const address = await contract.getAddress();
      
      // Verify contract on block explorer
      await this.verifyContract(address, {
        contractName,
        sourceCode: '', // Add source code here
        compiler: 'v0.8.19+commit.7dd6d404',
        optimization: true,
        arguments: args
      });

      return { address, contract };
    } catch (error) {
      console.error('Contract deployment failed:', error);
      throw error;
    }
  }

  async verifyContract(address: string, params: VerificationParams) {
    const config = chainConfigs[this.chainId];
    const apiUrl = `${config.explorerUrl}/api`;
    
    try {
      const response = await fetch(`${apiUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apikey: process.env.EXPLORER_API_KEY,
          module: 'contract',
          action: 'verify',
          contractaddress: address,
          sourceCode: params.sourceCode,
          codeformat: 'solidity-single-file',
          contractname: params.contractName,
          compilerversion: params.compiler,
          optimizationUsed: params.optimization ? 1 : 0,
          constructorArguments: params.arguments
        })
      });

      const result = await response.json();
      if (!result.status) throw new Error(result.message);
      
      return result;
    } catch (error) {
      console.error('Contract verification failed:', error);
      throw error;
    }
  }

  async getContract(address: string, abi: any[]) {
    return new Contract(address, abi, this.wallet);
  }

  // Token specific methods
  async mint(contractAddress: string, to: string, amount: string) {
    const contract = await this.getContract(contractAddress, ERC20_ABI);
    const tx = await contract.mint(to, amount);
    return tx.wait();
  }

  async burn(contractAddress: string, amount: string) {
    const contract = await this.getContract(contractAddress, ERC20_ABI);
    const tx = await contract.burn(amount);
    return tx.wait();
  }

  async transfer(contractAddress: string, to: string, amount: string) {
    const contract = await this.getContract(contractAddress, ERC20_ABI);
    const tx = await contract.transfer(to, amount);
    return tx.wait();
  }

  async createLiquidityPool(
    tokenAddress: string,
    routerAddress: string,
    amount: string,
    ethAmount: string
  ) {
    const router = await this.getContract(routerAddress, ROUTER_ABI);
    const tx = await router.addLiquidityETH(
      tokenAddress,
      amount,
      0, // slippage handled by frontend
      0, // slippage handled by frontend
      this.wallet.address,
      Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes deadline
      { value: ethAmount }
    );
    return tx.wait();
  }
}

interface VerificationParams {
  contractName: string;
  sourceCode: string;
  compiler: string;
  optimization: boolean;
  arguments: any[];
}

// Basic ERC20 ABI
const ERC20_ABI = [
  'function mint(address to, uint256 amount) public',
  'function burn(uint256 amount) public',
  'function transfer(address to, uint256 amount) public returns (bool)',
  'function balanceOf(address account) public view returns (uint256)',
  'function totalSupply() public view returns (uint256)'
];

// Basic Router ABI for DEX interactions
const ROUTER_ABI = [
  'function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)'
];