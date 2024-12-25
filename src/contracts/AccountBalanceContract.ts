import { AbstractAddress, Account, Provider } from "fuels";

import {
  createAddressIdentity,
  createAssetIdInput,
  createI64Input,
  fuelBNToBN,
  i64ToBN,
} from "@src/utils/createIdentity";
import { sendTransaction } from "@src/utils/sendTransaction";

import { AccountBalance } from "../types/account-balance";
import {
  AccountBalanceOutput,
  FundingOutput,
} from "../types/account-balance/AccountBalance";
import { BN, WriteTransactionResponse } from "..";

type AllTraderPositions = Record<
  string,
  {
    takerPositionSize: BN;
    takerOpenNational: BN;
    lastTwPremiumGrowthGlobal: BN;
  }
>;

export class AccountBalanceContract {
  private contract: AccountBalance;

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    this.contract = new AccountBalance(id, accountOrProvider);
  }

  async executeTradeA(
    sellTrader: string,
    buyTrader: string,
    baseToken: string,
    tradeAmount: BN,
    tradeValue: BN,
    sellerFee: BN,
    buyerFee: BN,
    matcher: string,
  ): Promise<WriteTransactionResponse> {
    const sellTraderInput = createAddressIdentity(sellTrader);
    const buyTraderInput = createAddressIdentity(buyTrader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const sellerFeeI64 = createI64Input(sellerFee);
    const buyerFeeI64 = createI64Input(buyerFee);
    const matcherInput = createAddressIdentity(matcher);

    const tx = this.contract.functions.execute_trade_a(
      sellTraderInput,
      buyTraderInput,
      baseTokenInput,
      tradeAmount.toString(),
      tradeValue.toString(),
      sellerFeeI64,
      buyerFeeI64,
      matcherInput,
    );

    return sendTransaction(tx);
  }

  async modifyOwedRealizedPnlA(
    trader: string,
    amount: BN,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const amountI64 = createI64Input(amount);
    const tx = this.contract.functions.modify_owed_realized_pnl_a(
      traderInput,
      amountI64,
    );

    return sendTransaction(tx);
  }

  async modifyPositionA(
    trader: string,
    baseToken: string,
    exchangedPositionSize: BN,
    exchangedPositionNotional: BN,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const sizeI64 = createI64Input(exchangedPositionSize);
    const notionalI64 = createI64Input(exchangedPositionNotional);
    const tx = this.contract.functions.modify_position_a(
      traderInput,
      baseTokenInput,
      sizeI64,
      notionalI64,
    );

    return sendTransaction(tx);
  }

  async registerBaseTokenA(
    trader: string,
    baseToken: string,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.register_base_token_a(
      traderInput,
      baseTokenInput,
    );

    return sendTransaction(tx);
  }

  async settleAllFundingA(trader: string): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tx = this.contract.functions.settle_all_funding_a(traderInput);

    return sendTransaction(tx);
  }

  async settleBadDebtA(trader: string): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tx = this.contract.functions.settle_bad_debt_a(traderInput);

    return sendTransaction(tx);
  }

  async settleFundingA(
    trader: string,
    baseToken: string,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.settle_funding_a(
      traderInput,
      baseTokenInput,
    );

    return sendTransaction(tx);
  }

  async settleOwedRealizedPnlA(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .settle_owed_realized_pnl_a(traderInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async settlePositionInClosedMarketA(
    trader: string,
    baseToken: string,
  ): Promise<[BN, BN, BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .settle_position_in_closed_market_a(traderInput, baseTokenInput)
      .get();

    const result: [BN, BN, BN, BN] = [
      i64ToBN(value[0]),
      i64ToBN(value[1]),
      i64ToBN(value[2]),
      fuelBNToBN(value[3]),
    ];

    return result;
  }

  async updateInsuranceFundFeeShareA(
    insuranceFundFeeShare: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_insurance_fund_fee_share_a(
      insuranceFundFeeShare.toString(),
    );

    return sendTransaction(tx);
  }

  async updateMaxFundingRateA(
    maxFundingRate: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_max_funding_rate_a(
      maxFundingRate.toString(),
    );

    return sendTransaction(tx);
  }

  async updateProtocolFeeRateA(
    protocolFeeRate: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_protocol_fee_rate_a(
      protocolFeeRate.toString(),
    );

    return sendTransaction(tx);
  }

  async updateTwPremiumGrowthGlobalA(
    trader: string,
    baseToken: string,
    lastTwPremiumGrowthGlobal: BN,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const premiumGrowth = createI64Input(lastTwPremiumGrowthGlobal);
    const tx = this.contract.functions.update_tw_premium_growth_global_a(
      traderInput,
      baseTokenInput,
      premiumGrowth,
    );

    return sendTransaction(tx);
  }

  async getAccountBalanceA(
    trader: string,
    baseToken: string,
  ): Promise<AccountBalanceOutput> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_account_balance_a(traderInput, baseTokenInput)
      .get();
    return value;
  }

  async getAccountCollateralValuesA(trader: string): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_account_collateral_values_a(traderInput)
      .get();

    const result: [BN, BN] = [i64ToBN(value[0]), i64ToBN(value[1])];

    return result;
  }

  async getAllPendingFundingPaymentA(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_all_pending_funding_payment_a(traderInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getAllTraderPositionsA(trader: string): Promise<AllTraderPositions> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_all_trader_positions_a(traderInput)
      .get();

    const result = value.reduce((t, current) => {
      return {
        ...t,
        [current[0].bits]: {
          takerPositionSize: i64ToBN(current[1].taker_position_size),
          takerOpenNational: i64ToBN(current[1].taker_open_notional),
          lastTwPremiumGrowthGlobal: i64ToBN(
            current[1].last_tw_premium_growth_global,
          ),
        },
      };
    }, {} as AllTraderPositions);

    return result;
  }

  async getBaseTokensA(trader: string): Promise<string[]> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_base_tokens_a(traderInput)
      .get();

    const result = value.map((v) => v.bits);

    return result;
  }

  async getFreeCollateralA(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_free_collateral_a(traderInput)
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getFreeCollateralByTokenA(trader: string, token: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .get_free_collateral_by_token_a(traderInput, tokenInput)
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getFundingA(token: string): Promise<FundingOutput> {
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .get_funding_a(tokenInput)
      .get();
    return value;
  }

  async getFundingDeltaA(marketTwap: BN, indexTwap: BN): Promise<BN> {
    const { value } = await this.contract.functions
      .get_funding_delta_a(marketTwap.toString(), indexTwap.toString())
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getFundingGrowthGlobalA(baseToken: string): Promise<BN> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_funding_growth_global_a(baseTokenInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getFundingRateA(baseToken: string): Promise<BN> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_funding_rate_a(baseTokenInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getLiquidatablePositionSizeA(
    trader: string,
    baseToken: string,
    accountValue: BN,
  ): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const accountValueI64 = createI64Input(accountValue);
    const { value } = await this.contract.functions
      .get_liquidatable_position_size_a(
        traderInput,
        baseTokenInput,
        accountValueI64,
      )
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getMarginRequirementA(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_margin_requirement_a(traderInput)
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getMarginRequirementForLiquidationA(
    trader: string,
    buffer: BN,
  ): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_margin_requirement_for_liquidation_a(traderInput, buffer.toString())
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getMaxRepaidSettlementA(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_max_repaid_settlement_a(traderInput)
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getPendingFundingPaymentA(
    trader: string,
    baseToken: string,
  ): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_pending_funding_payment_a(traderInput, baseTokenInput)
      .get();

    const result: [BN, BN] = [i64ToBN(value[0]), i64ToBN(value[1])];

    return result;
  }

  async getPnlA(trader: string): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_pnl_a(traderInput)
      .get();

    const result: [BN, BN] = [i64ToBN(value[0]), i64ToBN(value[1])];

    return result;
  }

  async getProtocolFeeRateA(): Promise<BN> {
    const { value } = await this.contract.functions
      .get_protocol_fee_rate_a()
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getSettlementTokenBalanceAndUnrealizedPnlA(
    trader: string,
  ): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_settlement_token_balance_and_unrealized_pnl_a(traderInput)
      .get();

    const result: [BN, BN] = [i64ToBN(value[0]), i64ToBN(value[1])];

    return result;
  }

  async getTakerOpenNotionalA(trader: string, baseToken: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_taker_open_notional_a(traderInput, baseTokenInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getTakerPositionSizeA(trader: string, baseToken: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_taker_position_size_a(traderInput, baseTokenInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async getTotalAbsPositionValueA(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_total_abs_position_value_a(traderInput)
      .get();

    const result = fuelBNToBN(value);

    return result;
  }

  async getTotalPositionValueA(trader: string, baseToken: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_total_position_value_a(traderInput, baseTokenInput)
      .get();

    const result = i64ToBN(value);

    return result;
  }

  async isLiquidatableA(trader: string): Promise<boolean> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .is_liquidatable_a(traderInput)
      .get();

    return value;
  }
}
