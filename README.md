
# spark-perpetual-ts-sdk

> [!IMPORTANT]
> Please note that the current version of the Spark Perpetual SDK is a beta release. This version is still under active development and may not be stable. Users should expect frequent updates and changes as we work to improve functionality and address issues. As a beta product, this version is intended for testing and feedback purposes only. We encourage users to provide feedback as it will help us refine and enhance the SDK in preparation for a more stable release.

## Introduction

The spark-perpetual-ts-sdk is a comprehensive solution for interacting with financial markets, offering perpetual trading functionality. It's built on the Fuels platform, utilizing smart contracts for decentralized transaction processing. This library provides easy-to-use methods for creating and managing orders, handling tokens, and retrieving market data.

## Installation
To install the spark-perpetual-ts-sdk, follow these steps:

```bash
npm i @compolabs/spark-perpetual-ts-sdk
```

## Usage

To use the spark-perpetual-ts-sdk, you'll need to set up a `SparkPerpetual` instance with the appropriate configuration:

```typescript
import SparkPerpetual, { BETA_NETWORK, BETA_CONTRACT_ADDRESSES, BETA_INDEXER_URL } from "spark-perpetual-ts-sdk";

// Create a wallet instance
const provider = await Provider.create(BETA_NETWORK.url);
const wallet = Wallet.fromPrivateKey(/* PRIVATE KEY */, provider);

const spark = new SparkPerpetual({
  networkUrl: BETA_NETWORK.url,
  contractAddresses: BETA_CONTRACT_ADDRESSES,
  indexerApiUrl: BETA_INDEXER_URL,
  wallet,
});
// Now you can use `spark` to interact with the library methods
```

## Available Methods

Below is a list of all the available methods in the spark-perpetual-ts-sdk. These methods enable interaction with perpetual markets:

1. **depositPerpCollateral(asset: Asset, amount: string)** - Deposits collateral for perpetual contracts.
2. **withdrawPerpCollateral(baseToken: Asset, gasToken: Asset, amount: string, oracleUpdateData: string[])** - Withdraws collateral from perpetual contracts.
3. **openPerpOrder(baseToken: Asset, gasToken: Asset, amount: string, price: string, updateData: string[])** - Opens a new perpetual order.
4. **removePerpOrder(assetId: string)** - Removes a perpetual order.
5. **fulfillPerpOrder(gasToken: Asset, orderId: string, amount: string, updateData: string[])** - Fulfills an open perpetual order.
6. **fetchPerpCollateralBalance(accountAddress: string, asset: Asset)** - Checks the collateral balance for a given account in perpetual markets.
7. **fetchPerpAllTraderPositions(accountAddress: string)** - Fetches all positions for a trader in perpetual markets.
8. **fetchPerpIsAllowedCollateral(asset: Asset)** - Determines if a specific asset is allowed as collateral in perpetual markets.
9. **fetchPerpTraderOrders(accountAddress: string, asset: Asset)** - Fetches orders for a trader in perpetual markets.
10. **fetchPerpAllMarkets(assetList: Asset[], quoteAsset: Asset)** - Fetches all perpetual markets for specified assets.
11. **fetchPerpFundingRate(asset: Asset)** - Fetches the funding rate for a given asset in perpetual markets.
12. **fetchPerpMaxAbsPositionSize(accountAddress: string, asset: Asset, tradePrice: string)** - Retrieves the maximum absolute position size for a trader in perpetual markets.
13. **fetchPerpPendingFundingPayment(accountAddress: string, asset: Asset)** - Fetches pending funding payments for a trader.
14. **fetchPerpMarkPrice(asset: Asset)** - Retrieves the mark price for a given asset in perpetual markets.
15. **fetchWalletBalance(asset: Asset)** - Fetches the balance of a specified asset in the wallet.
16. **getProviderWallet()** - Retrieves the wallet associated with the provider.
2178. **getProvider()** - Retrieves the provider used by the library.


## Contributing

Contributions to improve the spark-perpetual-ts-sdk are welcome. Please feel free to fork the repository, make your changes, and submit a pull request.
