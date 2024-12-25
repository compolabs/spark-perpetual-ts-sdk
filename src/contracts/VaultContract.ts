import { AbstractAddress, Account, Provider } from "fuels";

import { Deposit, WriteTransactionResponse } from "@src/interface";
import { Vault } from "@src/types/vault";
import BN from "@src/utils/BN";
import {
  createAddressIdentity,
  createAssetIdInput,
  createForward,
  createI64Input,
  fuelBNToBN,
} from "@src/utils/createIdentity";
import { sendTransaction } from "@src/utils/sendTransaction";

export class VaultContract {
  private contract: Vault;

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    this.contract = new Vault(id, accountOrProvider);
  }

  async depositCollateral(
    trader: string,
    deposit: Deposit,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const forward = createForward(deposit);

    const tx = this.contract.functions
      .deposit_collateral(traderInput)
      .callParams({ forward });

    return sendTransaction(tx);
  }

  async liquidateCollateral(
    liquidator: string,
    trader: string,
    token: string,
    settlementAmount: BN,
    maxRepaidSettlement: BN,
    insuranceFund: string,
  ): Promise<BN> {
    const liquidatorInput = createAddressIdentity(liquidator);
    const traderInput = createAddressIdentity(trader);
    const tokenInput = createAssetIdInput(token);
    const insuranceFundInput = createAddressIdentity(insuranceFund);

    const { value } = await this.contract.functions
      .liquidate_collateral(
        liquidatorInput,
        traderInput,
        tokenInput,
        settlementAmount.toString(),
        maxRepaidSettlement.toString(),
        insuranceFundInput,
      )
      .get();

    return fuelBNToBN(value);
  }

  async transferOwnership(newOwner: string): Promise<WriteTransactionResponse> {
    const newOwnerInput = createAddressIdentity(newOwner);
    const tx = this.contract.functions.transfer_ownership(newOwnerInput);
    return sendTransaction(tx);
  }

  async withdrawCollateral(
    trader: string,
    token: string,
    amount: BN,
    recipient: string,
    owedRealizedPnl: BN,
  ): Promise<WriteTransactionResponse> {
    const traderInput = createAddressIdentity(trader);
    const tokenInput = createAssetIdInput(token);
    const recipientInput = createAddressIdentity(recipient);
    const owedPnlI64 = createI64Input(owedRealizedPnl);

    const tx = this.contract.functions.withdraw_collateral(
      traderInput,
      tokenInput,
      amount.toString(),
      recipientInput,
      owedPnlI64,
    );
    return sendTransaction(tx);
  }

  async getCollateralBalance(trader: string, token: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const tokenInput = createAssetIdInput(token);

    const { value } = await this.contract.functions
      .get_collateral_balance(traderInput, tokenInput)
      .get();

    return fuelBNToBN(value);
  }

  async getCollateralPrice(token: string): Promise<BN> {
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .get_collateral_price(tokenInput)
      .get();

    return fuelBNToBN(value);
  }

  async getNonSettlementTokenBalance(trader: string): Promise<BN> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .get_non_settlement_token_balance(traderInput)
      .get();

    return fuelBNToBN(value);
  }

  async getRepaidSettlementLiquidatableCollateralMaxValues(
    trader: string,
    token: string,
    maxRepaidSettlement: BN,
  ): Promise<[BN, BN]> {
    const traderInput = createAddressIdentity(trader);
    const tokenInput = createAssetIdInput(token);

    const { value } = await this.contract.functions
      .get_repaid_settlement_liquidatable_collateral_max_values(
        traderInput,
        tokenInput,
        maxRepaidSettlement.toString(),
      )
      .get();

    return [fuelBNToBN(value[0]), fuelBNToBN(value[1])];
  }

  async hasNonSettlementToken(trader: string): Promise<boolean> {
    const traderInput = createAddressIdentity(trader);
    const { value } = await this.contract.functions
      .has_non_settlement_token(traderInput)
      .get();

    return value;
  }

  async isAllowedCollateral(token: string): Promise<boolean> {
    const tokenInput = createAssetIdInput(token);
    const { value } = await this.contract.functions
      .is_allowed_collateral(tokenInput)
      .get();

    return value;
  }
}
