import { WalletLocked, WalletUnlocked } from "fuels";

import BN from "./utils/BN";

export interface OrderbookContracts {
  proxyMarket: string;
  multiAsset: string;
}

export interface Asset {
  assetId: string;
  symbol: string;
  decimals: number;
}

interface BaseOptions {
  contractAddresses: OrderbookContracts;
  gasPrice: string;
  gasLimitMultiplier: string;
}

export interface Options extends BaseOptions {
  wallet: WalletLocked | WalletUnlocked;
}

export interface OptionsSpark extends BaseOptions {
  wallet?: WalletLocked | WalletUnlocked;
}

export interface GraphClientConfig {
  httpUrl: string;
  wsUrl: string;
}

export interface SparkParams {
  networkUrl: string;
  contractAddresses: Omit<OrderbookContracts, "proxyMarket">;
  wallet?: WalletLocked | WalletUnlocked;
  gasPrice?: string;
  gasLimitMultiplier?: string;
}

export interface GraphClientConfig {
  httpUrl: string;
  wsUrl: string;
}

export type WriteTransactionResponse = {
  transactionId: string;
  value: unknown;
};

export interface GraphQLResponse<T> {
  result: T;
  errors?: { message: string }[];
}

export enum OrderType {
  Buy = "Buy",
  Sell = "Sell",
}

export enum AssetType {
  Base = "Base",
  Quote = "Quote",
}

export enum LimitType {
  IOC = "IOC",
  FOK = "FOK",
  GTC = "GTC",
}

export type Status = "Active" | "Canceled" | "Closed";

export interface GetOrdersParams {
  limit: number;
  market?: string[];
  orderType?: OrderType;
  status?: Status[];
  user?: string;
  asset?: string;
  offset?: number;
}

export interface GetActiveOrdersParams {
  limit: number;
  market: string[];
  orderType: OrderType;
  user?: string;
  asset?: string;
  offset?: number;
}

export type ActiveOrderReturn<T extends OrderType> = T extends OrderType.Buy
  ? { ActiveBuyOrder: Order[] }
  : { ActiveSellOrder: Order[] };

export interface GetTradeOrderEventsParams {
  limit: number;
  market: string[];
}

export interface TradeOrderEvent {
  id: string;
  timestamp: string;
  tradePrice: string;
  tradeSize: string;
  sellerIsMaker: boolean;
}

export type Volume = {
  volume24h: string;
  high24h: string;
  low24h: string;
};

export interface UserInfoParams {
  id: string;
}

export interface UserInfo {
  id: string;
  active: number;
  canceled: number;
  closed: number;
  timestamp: string;
}

export enum MarketStatus {
  Opened = "Opened",
  Paused = "Paused",
  Closed = "Closed",
}

export interface Market {
  assetId: string;
  decimal: number;
  priceFeed: string;
  imRatio: BN;
  mmRatio: BN;
  status: MarketStatus;
  pausedIndexPrice: BN;
  pausedTimestamp: BN;
  closedPrice: BN;
}

export interface Order {
  id: string;
  trader: string;
  baseToken: string;
  baseSize: BN;
  price: BN;
}

export interface Twap {
  baseToken: string;
  span: BN;
  currentTwap: BN;
  lastUpdate: BN;
}

export interface Deposit {
  amount: BN;
  token: string;
}
