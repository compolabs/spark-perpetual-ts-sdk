import { Address, BN as FuelBN, CoinQuantityLike } from "fuels";

import { Deposit } from "@src/interface";

import BN from "./BN";

type Enum<T> = {
  [K in keyof T]: Pick<T, K> & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];

type IdentityInput = Enum<{
  Address: AddressInput;
  ContractId: ContractIdInput;
}>;

type AddressInput = { bits: string };

type AssetIdInput = { bits: string };

type ContractIdInput = { bits: string };

type I64Input = { underlying: string };

type I64Output = { underlying: FuelBN };

export const convertToB256 = (address: string) => {
  return new Address(address).toB256();
};

export const createAddressIdentity = (address: string): IdentityInput => {
  return {
    Address: {
      bits: convertToB256(address),
    },
  };
};

export const createContractIdentity = (contractId: string): IdentityInput => {
  return {
    ContractId: {
      bits: convertToB256(contractId),
    },
  };
};

export const createAssetIdInput = (assetId: string): AssetIdInput => {
  return {
    bits: convertToB256(assetId),
  };
};

export const createI64Input = (amount: BN): I64Input => {
  return {
    underlying: amount.toString(),
  };
};

export const i64ToBN = (amount: I64Output): BN => {
  return new BN(amount.underlying.toString());
};

export const fuelBNToBN = (amount?: FuelBN): BN => {
  if (!amount) return BN.ZERO;

  return new BN(amount.toString());
};

export const createForward = (deposit: Deposit): CoinQuantityLike => {
  return {
    amount: deposit.amount.toString(),
    assetId: deposit.token,
  };
};
