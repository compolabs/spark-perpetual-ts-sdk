import { Fetch } from "./utils/Fetch";
import { MarketStatusOutput } from "./interface";

export class IndexerApi extends Fetch {
  getPerpMarkets = async (): Promise<PerpMarketAPI[]> => {
    return this.get<PerpMarketAPI[]>("/perp/markets");
  };

  getPerpOrders = async (params: PerpOrdersParams): Promise<PerpOrder[]> => {
    return this.get<PerpOrder[]>("/perp/orders", params);
  };

  getPerpTradeEvents = async (
    params: BaseParams,
  ): Promise<PerpTradeEvent[]> => {
    return this.get<PerpTradeEvent[]>("/perp/orders", params);
  };

  getPerpPositions = async (params: BaseParams): Promise<PerpPosition[]> => {
    return this.get<PerpPosition[]>("/perp/orders", params);
  };
}

type BaseParams = {
  trader?: string;
  baseToken?: string;
  limit?: number;
};

interface Order {
  id: string;
  trader: string;
  base_token: string;
  base_size: string;
  base_price: string;
  timestamp: string;
}

type PerpMarketAPI = {
  asset_id: string;
  decimal: string;
  price_feed: string;
  im_ratio: string;
  mm_ratio: string;
  status: MarketStatusOutput;
  paused_index_price: string;
  paused_timestamp: string;
  closed_price: string;
};

type PerpOrdersParams = BaseParams & {
  isOpened?: string;
  orderType?: "buy" | "sell";
};

type PerpOrder = Order;

interface TradeEvent {
  base_token: string;
  seller: string;
  buyer: string;
  trade_size: string;
  trade_price: string;
  sell_order_id: string;
  buy_order_id: string;
  timestamp: string;
}

type PerpTradeEvent = TradeEvent;

type PerpPosition = {
  trader: string;
  base_token: string;
  taker_position_size: string;
  taker_open_notional: string;
  last_tw_premium_growth_global: string;
};
