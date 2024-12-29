import { AbstractAddress, Account, Provider } from "fuels";
import { Undefinable } from "tsdef";

import {
  Market,
  MarketStatus,
  Order,
  Twap,
  WriteTransactionResponse,
} from "@src/interface";
import { PerpMarket } from "@src/types/perp-market";
import {
  createAddressIdentity,
  createAssetIdInput,
  createI64Input,
  fuelBNToBN,
  i64ToBN,
} from "@src/utils/createIdentity";
import { sendTransaction } from "@src/utils/sendTransaction";

import { BN } from "..";

export class PerpMarketContract {
  private contract: PerpMarket;

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    this.contract = new PerpMarket(id, accountOrProvider);
  }

  async cancelAllOrdersM(trader: string): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tx = this.contract.functions.cancel_all_orders_m(traderInput);
    return sendTransaction(tx);
  }

  async cancelOrderM(
    trader: string,
    orderId: string,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tx = this.contract.functions.cancel_order_m(traderInput, orderId);
    return sendTransaction(tx);
  }

  async closeMarketM(
    baseToken: string,
    closePrice: BN,
  ): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.close_market_m(
      baseTokenInput,
      closePrice.toString(),
    );
    return sendTransaction(tx);
  }

  async createMarketM(
    baseToken: string,
    decimal: number,
    priceFeed: string,
    imRatio: BN,
    mmRatio: BN,
    initialPrice: BN,
  ): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.create_market_m(
      baseTokenInput,
      decimal,
      priceFeed,
      imRatio.toString(),
      mmRatio.toString(),
      initialPrice.toString(),
    );
    return sendTransaction(tx);
  }

  async fulfillOrderM(
    baseSize: BN,
    orderId: string,
  ): Promise<WriteTransactionResponse> {
    const baseSizeI64 = createI64Input(baseSize);
    const tx = this.contract.functions.fulfill_order_m(baseSizeI64, orderId);

    return sendTransaction(tx);
  }

  async matchOrdersM(
    order1Id: string,
    order2Id: string,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.match_orders_m(order1Id, order2Id);

    return sendTransaction(tx);
  }

  async openOrderM(
    trader: string,
    baseToken: string,
    baseSize: BN,
    price: BN,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const baseSizeI64 = createI64Input(baseSize);
    const tx = this.contract.functions.open_order_m(
      traderInput,
      baseTokenInput,
      baseSizeI64,
      price.toString(),
    );

    return sendTransaction(tx);
  }

  async pauseMarketM(baseToken: string): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.pause_market_m(baseTokenInput);
    return sendTransaction(tx);
  }

  async unpauseMarketM(baseToken: string): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.unpause_market_m(baseTokenInput);
    return sendTransaction(tx);
  }

  async updateMarkSpanM(markSpan: BN): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_mark_span_m(markSpan.toString());
    return sendTransaction(tx);
  }

  async updateMarketSpanM(marketSpan: BN): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_market_span_m(
      marketSpan.toString(),
    );
    return sendTransaction(tx);
  }

  async getLatestTwapM(baseToken: string): Promise<[BN, BN]> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_latest_twap_m(baseTokenInput)
      .get();

    const result: [BN, BN] = [fuelBNToBN(value[0]), fuelBNToBN(value[1])];

    return result;
  }

  async getMarkPriceM(token: string): Promise<BN> {
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .get_mark_price_m(tokenInput)
      .get();
    return fuelBNToBN(value);
  }

  async getMarkSpan(): Promise<BN> {
    const { value } = await this.contract.functions.get_mark_span().get();
    return fuelBNToBN(value);
  }

  async getMarketM(baseToken: string): Promise<Undefinable<Market>> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_market_m(baseTokenInput)
      .get();

    if (!value) {
      return;
    }

    const result: Market = {
      assetId: value.asset_id.bits,
      closedPrice: fuelBNToBN(value.closed_price),
      decimal: value.decimal,
      imRatio: fuelBNToBN(value.im_ratio),
      mmRatio: fuelBNToBN(value.mm_ratio),
      pausedIndexPrice: fuelBNToBN(value.paused_index_price),
      pausedTimestamp: fuelBNToBN(value.paused_timestamp),
      priceFeed: value.price_feed,
      status: value.status as unknown as MarketStatus,
    };

    return result;
  }

  async getMarketPriceM(token: string): Promise<BN> {
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .get_market_price_m(tokenInput)
      .get();
    return fuelBNToBN(value);
  }

  async getMarketSpan(): Promise<BN> {
    const { value } = await this.contract.functions.get_market_span().get();
    return fuelBNToBN(value);
  }

  async getOrderM(orderId: string): Promise<Undefinable<Order>> {
    const { value } = await this.contract.functions.get_order_m(orderId).get();

    if (!value) {
      return;
    }

    const result: any = { // какой тут тип?
      id: value.id,
      trader: value.trader.Address?.bits ?? value.trader.ContractId?.bits ?? "",
      baseToken: value.base_token.bits,
      baseSize: i64ToBN(value.base_size),
      price: fuelBNToBN(value.price),
    };

    return result;
  }

  async getTotalTraderOrderBaseM(
    trader: string,
    baseToken: string,
  ): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_total_trader_order_base_m(traderInput, baseTokenInput)
      .get();
    return i64ToBN(value);
  }

  async getTraderOrdersM(trader: string, baseToken: string): Promise<Order[]> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_trader_orders_m(traderInput, baseTokenInput)
      .get();

    const result: any = value.map((v) => ({
      id: v.id,
      trader: v.trader.Address?.bits ?? v.trader.ContractId?.bits ?? "",
      baseToken: v.base_token.bits,
      baseSize: i64ToBN(v.base_size),
      price: fuelBNToBN(v.price),
    }));

    return result;
  }

  async getTwapsM(
    baseToken: string,
  ): Promise<[Undefinable<Twap>, Undefinable<Twap>]> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_twaps_m(baseTokenInput)
      .get();

    const result = value.map((val) => {
      const v: Undefinable<Twap> = val
        ? ({
            baseToken: val.base_token.bits,
            span: fuelBNToBN(val.span),
            currentTwap: fuelBNToBN(val.current_twap),
            lastUpdate: fuelBNToBN(val.last_update),
          } satisfies Twap)
        : undefined;

      return v;
    });

    return result as [Undefinable<Twap>, Undefinable<Twap>];
  }

  async hasActiveOrdersByTokenM(
    trader: string,
    baseToken: string,
  ): Promise<boolean> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .has_active_orders_by_token_m(traderInput, baseTokenInput)
      .get();
    return value;
  }

  async hasActiveOrdersM(trader: string): Promise<boolean> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .has_active_orders_m(traderInput)
      .get();
    return value;
  }
}
