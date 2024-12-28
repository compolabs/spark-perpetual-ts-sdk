import {
  AbstractAddress,
  Account,
  Provider,
  Wallet,
  WalletLocked,
  WalletUnlocked,
} from "fuels";

import { NETWORK_ERROR, NetworkError } from "./utils/NetworkError";
import {
  AccountBalanceContract,
  ClearingHouseContract,
  PerpMarketContract,
  VaultContract,
} from "./contracts";
import { Options, OptionsSpark, SparkParams } from "./interface";

export class SparkPerpetual {
  private providerPromise: Promise<Provider>;
  private provider?: Provider;
  private options: OptionsSpark;

  constructor(params: SparkParams) {
    this.options = {
      wallet: params.wallet,
    };

    this.providerPromise = Provider.create(params.networkUrl);
  }

  async getProvider(): Promise<Provider> {
    if (!this.provider) {
      this.provider = await this.providerPromise;
    }
    return this.provider;
  }

  async getProviderWallet(): Promise<WalletUnlocked> {
    const provider = await this.getProvider();
    return Wallet.generate({ provider });
  }

  private async getReadOptions(): Promise<Options> {
    const providerWallet = await this.getProviderWallet();
    return { ...this.options, wallet: providerWallet };
  }

  setActiveWallet(wallet?: WalletLocked | WalletUnlocked): void {
    this.options.wallet = wallet;
  }

  private getWriteOptions(): Options {
    if (!this.options.wallet) {
      throw new NetworkError(NETWORK_ERROR.UNKNOWN_WALLET);
    }
    return this.options as Options;
  }

  private async getContract<T>(
    ContractClass: new (
      address: string | AbstractAddress,
      provider: Account | Provider,
    ) => T,
    address: string | AbstractAddress,
    readonly = false,
  ): Promise<T> {
    const opts = readonly
      ? await this.getReadOptions()
      : this.getWriteOptions();

    return new ContractClass(address, opts.wallet);
  }

  async getAccountBalanceContract(
    address: string | AbstractAddress,
    readonly = false,
  ): Promise<AccountBalanceContract> {
    return this.getContract(AccountBalanceContract, address, readonly);
  }

  async getClearingHouseContract(
    address: string | AbstractAddress,
    readonly = false,
  ): Promise<ClearingHouseContract> {
    return this.getContract(ClearingHouseContract, address, readonly);
  }

  async getPerpMarketContract(
    address: string | AbstractAddress,
    readonly = false,
  ): Promise<PerpMarketContract> {
    return this.getContract(PerpMarketContract, address, readonly);
  }

  async getVaultContract(
    address: string | AbstractAddress,
    readonly = false,
  ): Promise<VaultContract> {
    return this.getContract(VaultContract, address, readonly);
  }
}
