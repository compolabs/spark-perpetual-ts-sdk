import { AbstractAddress, Account, Provider } from "fuels";
import { WriteTransactionResponse } from "src/interface";
import { ClearingHouse } from "src/types/clearing-house";
import {
  createAddressIdentity,
  createAssetIdInput,
  createI64Input,
  fuelBNToBN,
  i64ToBN,
} from "src/utils/createIdentity";
import { sendTransaction } from "src/utils/sendTransaction";

import { BN } from "..";

export class ClearingHouseContract {
  private contract: ClearingHouse;

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    this.contract = new ClearingHouse(id, accountOrProvider);
  }

  async cancelAllOrdersC(): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.cancel_all_orders_c();
    return sendTransaction(tx);
  }

  async cancelOrderC(orderId: string): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.cancel_order_c(orderId);
    return sendTransaction(tx);
  }

  async cancelUncollaterizedOrdersC(
    trader: string,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tx =
      this.contract.functions.cancel_uncollaterized_orders_c(traderInput);
    return sendTransaction(tx);
  }

  async closeMarketC(
    baseToken: string,
    closePrice: BN,
  ): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.close_market_c(
      baseTokenInput,
      closePrice.toString(),
    );
    return sendTransaction(tx);
  }

  async createMarketC(
    baseToken: string,
    decimal: number,
    priceFeed: string,
    imRatio: BN,
    mmRatio: BN,
    initialPrice: BN,
  ): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.create_market_c(
      baseTokenInput,
      decimal,
      priceFeed,
      imRatio.toString(),
      mmRatio.toString(),
      initialPrice.toString(),
    );
    return sendTransaction(tx);
  }

  async depositCollateralC(): Promise<WriteTransactionResponse> {
    // TODO: Implement payable logic
    const tx = this.contract.functions.deposit_collateral_c();
    return sendTransaction(tx);
  }

  async fulfillOrderC(
    baseSize: BN,
    orderId: string,
  ): Promise<WriteTransactionResponse> {
    const baseSizeI64 = createI64Input(baseSize);
    const tx = this.contract.functions.fulfill_order_c(baseSizeI64, orderId);
    return sendTransaction(tx);
  }

  async liquidateC(
    trader: string,
    baseToken: string,
    positionSizeToBeLiquidated: BN,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const positionSizeI64 = createI64Input(positionSizeToBeLiquidated);
    const tx = this.contract.functions.liquidate_c(
      traderInput,
      baseTokenInput,
      positionSizeI64,
    );
    return sendTransaction(tx);
  }

  async liquidateCollateralC(
    trader: string,
    token: string,
    settlementAmount: BN,
  ): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .liquidate_collateral_c(
        traderInput,
        tokenInput,
        settlementAmount.toString(),
      )
      .get();

    return fuelBNToBN(value);
  }

  async matchOrdersC(
    order1Id: string,
    order2Id: string,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.match_orders_c(order1Id, order2Id);
    return sendTransaction(tx);
  }

  async openOrderC(
    baseToken: string,
    baseSize: BN,
    orderPrice: BN,
  ): Promise<string> {
    // TODO: Implement payable logic
    const baseTokenInput = createAssetIdInput(baseToken);
    const baseSizeI64 = createI64Input(baseSize);
    const { value } = await this.contract.functions
      .open_order_c(baseTokenInput, baseSizeI64, orderPrice.toString())
      .get();
    return value;
  }

  async pauseMarketC(baseToken: string): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.pause_market_c(baseTokenInput);
    return sendTransaction(tx);
  }

  async settleAllFundingC(trader: string): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tx = this.contract.functions.settle_all_funding_c(traderInput);
    return sendTransaction(tx);
  }

  async unpauseMarketC(baseToken: string): Promise<WriteTransactionResponse> {
    const baseTokenInput = createAssetIdInput(baseToken);
    const tx = this.contract.functions.unpause_market_c(baseTokenInput);
    return sendTransaction(tx);
  }

  async updateInsuranceFundFeeShareC(
    insuranceFundFeeShare: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_insurance_fund_fee_share_c(
      insuranceFundFeeShare.toString(),
    );
    return sendTransaction(tx);
  }

  async updateLiquidationPenaltyRatioC(
    ratio: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_liquidation_penalty_ratio_c(
      ratio.toString(),
    );
    return sendTransaction(tx);
  }

  async updateMatcherFeeRateC(feeRate: BN): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_matcher_fee_rate_c(
      feeRate.toString(),
    );
    return sendTransaction(tx);
  }

  async updateMaxFundingRateC(
    maxFundingRate: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_max_funding_rate_c(
      maxFundingRate.toString(),
    );
    return sendTransaction(tx);
  }

  async updateProtocolFeeRateC(
    protocolFeeRate: BN,
  ): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_protocol_fee_rate_c(
      protocolFeeRate.toString(),
    );
    return sendTransaction(tx);
  }

  async updateTakerFeeRateC(feeRate: BN): Promise<WriteTransactionResponse> {
    const tx = this.contract.functions.update_taker_fee_rate_c(
      feeRate.toString(),
    );
    return sendTransaction(tx);
  }

  async withdrawCollateralC(
    token: string,
    amount: BN,
    recipient: string,
  ): Promise<BN> {
    const tokenInput = createAssetIdInput(token);
    const recipientInput = createAddressIdentity(recipient);
    const { value } = await this.contract.functions
      .withdraw_collateral_c(tokenInput, amount.toString(), recipientInput)
      .get();

    return fuelBNToBN(value);
  }

  async getLiquidatedPositionSizeAndNotionalC(
    trader: string,
    baseToken: string,
    accountValue: BN,
    positionSizeToBeLiquidated: BN,
  ): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const accountValueI64 = createI64Input(accountValue);
    const positionSizeI64 = createI64Input(positionSizeToBeLiquidated);

    const { value } = await this.contract.functions
      .get_liquidated_position_size_and_notional_c(
        traderInput,
        baseTokenInput,
        accountValueI64,
        positionSizeI64,
      )
      .get();

    return [i64ToBN(value[0]), i64ToBN(value[1])];
  }

  async getLiquidationPenaltyRatioC(): Promise<BN> {
    const { value } = await this.contract.functions
      .get_liquidation_penalty_ratio_c()
      .get();
    return fuelBNToBN(value);
  }

  async getMarginRequirementForLiquidationC(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_margin_requirement_for_liquidation_c(traderInput)
      .get();
    return fuelBNToBN(value);
  }

  async getMatcherFeeRateC(): Promise<BN> {
    const { value } = await this.contract.functions
      .get_matcher_fee_rate_c()
      .get();
    return fuelBNToBN(value);
  }

  async getMaxAbsPositionSizeC(
    trader: string,
    baseAsset: string,
    tradePrice: BN,
  ): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const baseAssetInput = createAssetIdInput(baseAsset);
    const { value } = await this.contract.functions
      .get_max_abs_position_size_c(
        traderInput,
        baseAssetInput,
        tradePrice.toString(),
      )
      .get();
    const [val1, val2] = value;
    return [fuelBNToBN(val1), fuelBNToBN(val2)];
  }

  async getTakerFeeRateC(): Promise<BN> {
    const { value } = await this.contract.functions
      .get_taker_fee_rate_c()
      .get();
    return fuelBNToBN(value);
  }

  async getTakerOpenNotionalC(trader: string, baseToken: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_taker_open_notional_c(traderInput, baseTokenInput)
      .get();
    return i64ToBN(value);
  }

  async getTakerPositionC(trader: string, baseToken: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_taker_position_c(traderInput, baseTokenInput)
      .get();
    return i64ToBN(value);
  }

  async getTakerPositionSafeC(trader: string, baseToken: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const baseTokenInput = createAssetIdInput(baseToken);
    const { value } = await this.contract.functions
      .get_taker_position_safe_c(traderInput, baseTokenInput)
      .get();
    return i64ToBN(value);
  }

  async isLiquidatableC(trader: string): Promise<boolean> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .is_liquidatable_c(traderInput)
      .get();
    return value;
  }

  async requireEnoughFreeCollateralC(trader: string): Promise<void> {
    const traderInput = createAddressIdentity(trader);
    await this.contract.functions
      .require_enough_free_collateral_c(traderInput)
      .get();
  }
}
