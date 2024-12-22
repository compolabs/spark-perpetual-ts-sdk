import { Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";

import { NETWORK_ERROR, NetworkError } from "./utils/NetworkError";
import { DEFAULT_GAS_LIMIT_MULTIPLIER, DEFAULT_GAS_PRICE } from "./constants";
import { IndexerApi } from "./IndexerApi";
import {
  GraphClientConfig,
  Options,
  OptionsSpark,
  SparkParams,
} from "./interface";

export class SparkPerpetual {
  private providerPromise: Promise<Provider>;
  private provider?: Provider;
  private options: OptionsSpark;
  private indexerApi?: IndexerApi;

  constructor(params: SparkParams) {
    this.options = {
      contractAddresses: {
        proxyMarket: "",
        ...params.contractAddresses,
      },
      wallet: params.wallet,
      gasPrice: params.gasPrice ?? DEFAULT_GAS_PRICE,
      gasLimitMultiplier:
        params.gasLimitMultiplier ?? DEFAULT_GAS_LIMIT_MULTIPLIER,
    };

    this.providerPromise = Provider.create(params.networkUrl);
  }

  private get activeIndexerApi(): IndexerApi {
    if (!this.indexerApi) {
      throw new Error("Please set the correct active indexer.");
    }
    return this.indexerApi;
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

  private getWriteOptions(): Options {
    if (!this.options.wallet) {
      throw new NetworkError(NETWORK_ERROR.UNKNOWN_WALLET);
    }
    return this.options as Options;
  }

  setActiveWallet(wallet?: WalletLocked | WalletUnlocked): void {
    this.options.wallet = wallet;
  }

  setActiveMarket(contractAddress: string, indexer: GraphClientConfig): void {
    this.options.contractAddresses.proxyMarket = contractAddress;

    if (this.indexerApi) {
      this.indexerApi.close();
    }

    this.indexerApi = new IndexerApi(indexer);
  }

  // async fetchOrders(
  //   params: GetOrdersParams,
  // ): Promise<ApolloQueryResult<{ Order: Order[] }>> {
  //   return this.activeIndexerApi.getOrders(params);
  // }

  // async fetchActiveOrders<T extends OrderType>(
  //   params: GetActiveOrdersParams,
  // ): Promise<ApolloQueryResult<ActiveOrderReturn<T>>> {
  //   return this.activeIndexerApi.getActiveOrders<T>(params);
  // }

  // subscribeOrders(
  //   params: GetOrdersParams,
  // ): Observable<FetchResult<{ Order: Order[] }>> {
  //   return this.activeIndexerApi.subscribeOrders(params);
  // }

  // subscribeActiveOrders<T extends OrderType>(
  //   params: GetActiveOrdersParams,
  // ): Observable<FetchResult<ActiveOrderReturn<T>>> {
  //   return this.activeIndexerApi.subscribeActiveOrders<T>(params);
  // }

  // subscribeTradeOrderEvents(
  //   params: GetTradeOrderEventsParams,
  // ): Observable<FetchResult<{ TradeOrderEvent: TradeOrderEvent[] }>> {
  //   return this.activeIndexerApi.subscribeTradeOrderEvents(params);
  // }

  // async fetchVolume(params: GetTradeOrderEventsParams): Promise<Volume> {
  //   return this.activeIndexerApi.getVolume(params);
  // }

  // subscribeUserInfo(
  //   params: UserInfoParams,
  // ): Observable<FetchResult<{ User: UserInfo[] }>> {
  //   return this.activeIndexerApi.subscribeUserInfo(params);
  // }
}
