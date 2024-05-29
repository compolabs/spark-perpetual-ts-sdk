import {
  Address,
  CoinQuantityLike,
  FunctionInvocationScope,
  hashMessage,
  Script,
} from "fuels";
import { BETA_CONTRACT_ADDRESSES, BETA_TOKENS } from "src/constants";
import { AccountBalanceAbi__factory } from "src/types/account-balance";
import {
  AssetIdInput,
  I64Input,
} from "src/types/account-balance/AccountBalanceAbi";
import { ClearingHouseAbi__factory } from "src/types/clearing-house";
import { PerpMarketAbi__factory } from "src/types/perp-market";
import { ProxyAbi__factory } from "src/types/proxy";
import { ScriptProxyAbi__factory } from "src/types/script-proxy";
import {
  FulfillOrderInput,
  OpenOrderInput,
  WithdrawCollateralInput,
} from "src/types/script-proxy/ScriptProxyAbi";
import ScriptProxyAbiBytes from "src/types/script-proxy/ScriptProxyAbi.hex";
import { VaultAbi__factory } from "src/types/vault";

import { PythContractAbi__factory } from "./types/pyth";
import { TokenAbi__factory } from "./types/src-20";
import { IdentityInput } from "./types/src-20/TokenAbi";
import BN from "./utils/BN";
import { Asset, Options, WriteTransactionResponse } from "./interface";

export class WriteActions {
  depositPerpCollateral = async (
    assetAddress: string,
    amount: string,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const vaultFactory = VaultAbi__factory.connect(
      options.contractAddresses.vault,
      options.wallet,
    );

    const forward: CoinQuantityLike = {
      assetId: assetAddress,
      amount,
    };

    const tx = await vaultFactory.functions
      .deposit_collateral()
      .callParams({ forward })
      .txParams({ gasPrice: options.gasPrice });

    return this.sendTransaction(tx, options);
  };

  withdrawPerpCollateral = async (
    baseTokenAddress: string,
    gasTokenAddress: string,
    amount: string,
    updateData: number[][],
    updateFee: BN,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const scriptProxy = new Script(
      ScriptProxyAbiBytes,
      ScriptProxyAbi__factory.abi,
      options.wallet,
    );

    const assetIdInput: AssetIdInput = {
      value: baseTokenAddress,
    };

    const forward: CoinQuantityLike = {
      amount: "10",
      assetId: gasTokenAddress,
    };

    const priceFeedIds: unknown = BETA_TOKENS.map((v) => v.priceFeed);

    const withdrawCollateralInput: WithdrawCollateralInput = {
      vault: {
        value: Address.fromString(BETA_CONTRACT_ADDRESSES.vault).toB256(),
      },
      amount: amount.toString(),
      collateral: assetIdInput,
    };

    const tx = await scriptProxy.functions
      .main(
        { WithdrawCollateral: withdrawCollateralInput },
        {
          value: Address.fromString(BETA_CONTRACT_ADDRESSES.proxy).toB256(),
        },
        updateFee,
        priceFeedIds,
        updateData,
      )
      .callParams({ forward })
      .txParams({ gasPrice: 1 })
      .addContracts([
        ProxyAbi__factory.connect(
          options.contractAddresses.proxy,
          options.wallet,
        ),
        PerpMarketAbi__factory.connect(
          options.contractAddresses.perpMarket,
          options.wallet,
        ),
        AccountBalanceAbi__factory.connect(
          options.contractAddresses.accountBalance,
          options.wallet,
        ),
        ClearingHouseAbi__factory.connect(
          options.contractAddresses.clearingHouse,
          options.wallet,
        ),
        VaultAbi__factory.connect(
          options.contractAddresses.vault,
          options.wallet,
        ),
        PythContractAbi__factory.connect(
          options.contractAddresses.pyth,
          options.wallet,
        ),
      ]);

    return this.sendTransaction(tx, options);
  };

  openPerpOrder = async (
    baseTokenAddress: string,
    gasTokenAddress: string,
    amount: string,
    price: string,
    updateData: number[][],
    updateFee: BN,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const scriptProxy = new Script(
      ScriptProxyAbiBytes,
      ScriptProxyAbi__factory.abi,
      options.wallet,
    );

    const assetIdInput: AssetIdInput = {
      value: baseTokenAddress,
    };

    const isNegative = amount.includes("-");
    const absSize = amount.replace("-", "");
    const baseSize: I64Input = { value: absSize, negative: isNegative };

    const priceFeedIds: unknown = BETA_TOKENS.map((v) => v.priceFeed);

    const forward: CoinQuantityLike = {
      amount: "10",
      assetId: gasTokenAddress,
    };

    const openPerpOrderInput: OpenOrderInput = {
      clearing_house: {
        value: Address.fromString(
          BETA_CONTRACT_ADDRESSES.clearingHouse,
        ).toB256(),
      },
      base_size: baseSize,
      base_token: assetIdInput,
      order_price: price,
    };

    const tx = scriptProxy.functions
      .main(
        { OpenOrder: openPerpOrderInput },
        {
          value: Address.fromString(BETA_CONTRACT_ADDRESSES.proxy).toB256(),
        },
        updateFee,
        priceFeedIds,
        updateData,
      )
      .callParams({ forward })
      .txParams({ gasPrice: options.gasPrice })
      .addContracts([
        ProxyAbi__factory.connect(
          options.contractAddresses.proxy,
          options.wallet,
        ),
        PerpMarketAbi__factory.connect(
          options.contractAddresses.perpMarket,
          options.wallet,
        ),
        ClearingHouseAbi__factory.connect(
          options.contractAddresses.clearingHouse,
          options.wallet,
        ),
        AccountBalanceAbi__factory.connect(
          options.contractAddresses.accountBalance,
          options.wallet,
        ),
        VaultAbi__factory.connect(
          options.contractAddresses.vault,
          options.wallet,
        ),
        PythContractAbi__factory.connect(
          options.contractAddresses.pyth,
          options.wallet,
        ),
      ]);

    return this.sendTransaction(tx, options);
  };

  removePerpOrder = async (
    orderId: string,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const clearingHouseFactory = ClearingHouseAbi__factory.connect(
      options.contractAddresses.clearingHouse,
      options.wallet,
    );

    const tx = await clearingHouseFactory.functions
      .remove_order(orderId)
      .txParams({ gasPrice: options.gasPrice })
      .addContracts([
        ProxyAbi__factory.connect(
          options.contractAddresses.proxy,
          options.wallet,
        ),
        PerpMarketAbi__factory.connect(
          options.contractAddresses.perpMarket,
          options.wallet,
        ),
        ClearingHouseAbi__factory.connect(
          options.contractAddresses.clearingHouse,
          options.wallet,
        ),
      ]);

    return this.sendTransaction(tx, options);
  };

  fulfillPerpOrder = async (
    gasTokenAddress: string,
    orderId: string,
    amount: string,
    updateData: number[][],
    updateFee: BN,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const scriptProxy = new Script(
      ScriptProxyAbiBytes,
      ScriptProxyAbi__factory.abi,
      options.wallet,
    );

    const isNegative = amount.includes("-");
    const absSize = amount.replace("-", "");
    const baseSize: I64Input = { value: absSize, negative: isNegative };

    const priceFeedIds: unknown = BETA_TOKENS.map((v) => v.priceFeed);

    const forward: CoinQuantityLike = {
      amount: "10",
      assetId: gasTokenAddress,
    };

    const fullfillPerpOrderInput: FulfillOrderInput = {
      clearing_house: {
        value: Address.fromString(
          BETA_CONTRACT_ADDRESSES.clearingHouse,
        ).toB256(),
      },
      base_size: baseSize,
      order_id: orderId,
    };

    const tx = await scriptProxy.functions
      .main(
        { FulfillOrder: fullfillPerpOrderInput },
        {
          value: Address.fromString(BETA_CONTRACT_ADDRESSES.proxy).toB256(),
        },
        updateFee,
        priceFeedIds,
        updateData,
      )
      .callParams({ forward })
      .txParams({ gasPrice: options.gasPrice })
      .addContracts([
        ProxyAbi__factory.connect(
          options.contractAddresses.proxy,
          options.wallet,
        ),
        PerpMarketAbi__factory.connect(
          options.contractAddresses.perpMarket,
          options.wallet,
        ),
        AccountBalanceAbi__factory.connect(
          options.contractAddresses.accountBalance,
          options.wallet,
        ),
        ClearingHouseAbi__factory.connect(
          options.contractAddresses.clearingHouse,
          options.wallet,
        ),
        VaultAbi__factory.connect(
          options.contractAddresses.vault,
          options.wallet,
        ),
        PythContractAbi__factory.connect(
          options.contractAddresses.pyth,
          options.wallet,
        ),
      ]);

    return this.sendTransaction(tx, options);
  };

  matchPerpOrders = async (
    order1Id: string,
    order2Id: string,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const clearingHouseFactory = ClearingHouseAbi__factory.connect(
      options.contractAddresses.clearingHouse,
      options.wallet,
    );

    const forward: CoinQuantityLike = {
      amount: "10",
      assetId:
        "0x0000000000000000000000000000000000000000000000000000000000000000", // for the test
    };

    const tx = await clearingHouseFactory.functions
      .match_orders(order1Id, order2Id)
      .callParams({ forward })
      .txParams({ gasPrice: options.gasPrice })
      .addContracts([
        ProxyAbi__factory.connect(
          options.contractAddresses.proxy,
          options.wallet,
        ),
        PerpMarketAbi__factory.connect(
          options.contractAddresses.perpMarket,
          options.wallet,
        ),
        AccountBalanceAbi__factory.connect(
          options.contractAddresses.accountBalance,
          options.wallet,
        ),
        ClearingHouseAbi__factory.connect(
          options.contractAddresses.clearingHouse,
          options.wallet,
        ),
        VaultAbi__factory.connect(
          options.contractAddresses.vault,
          options.wallet,
        ),
        PythContractAbi__factory.connect(
          options.contractAddresses.pyth,
          options.wallet,
        ),
      ]);

    return this.sendTransaction(tx, options);
  };

  mintToken = async (
    token: Asset,
    amount: string,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const tokenFactory = options.contractAddresses.tokenFactory;
    const tokenFactoryContract = TokenAbi__factory.connect(
      tokenFactory,
      options.wallet,
    );

    const mintAmount = BN.parseUnits(amount, token.decimals);
    const hash = hashMessage(token.symbol);
    const identity: IdentityInput = {
      Address: {
        value: options.wallet.address.toB256(),
      },
    };

    const tx = await tokenFactoryContract.functions
      .mint(identity, hash, mintAmount.toString())
      .txParams({ gasPrice: options.gasPrice });

    return this.sendTransaction(tx, options);
  };

  private sendTransaction = async (
    tx: FunctionInvocationScope,
    options: Options,
  ): Promise<WriteTransactionResponse> => {
    const { gasUsed } = await tx.getTransactionCost();
    const gasLimit = gasUsed.mul(options.gasLimitMultiplier).toString();
    const res = await tx.txParams({ gasLimit }).call();

    return {
      transactionId: res.transactionId,
      value: res.value,
    };
  };
}
