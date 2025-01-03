/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.97.2
*/

import { Contract, Interface } from "fuels";
import type {
  Provider,
  Account,
  StorageSlot,
  AbstractAddress,
  BigNumberish,
  BN,
  FunctionFragment,
  InvokeFunction,
  StrSlice,
} from 'fuels';

import type { Option, Enum } from "./common";

export enum AccessErrorInput { NotOwner = 'NotOwner' };
export enum AccessErrorOutput { NotOwner = 'NotOwner' };
export type ErrorInput = Enum<{ InvalidAsset: undefined, AccessDenied: undefined, AmountExceedsTheBalance: [], V_GTDC: undefined, SettlementAmountExeedsMaxRepayedSettlement: [], V_NL: undefined, ZeroAmount: undefined }>;
export type ErrorOutput = Enum<{ InvalidAsset: void, AccessDenied: void, AmountExceedsTheBalance: [], V_GTDC: void, SettlementAmountExeedsMaxRepayedSettlement: [], V_NL: void, ZeroAmount: void }>;
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum InitializationErrorInput { CannotReinitialized = 'CannotReinitialized' };
export enum InitializationErrorOutput { CannotReinitialized = 'CannotReinitialized' };
export enum PauseErrorInput { Paused = 'Paused', NotPaused = 'NotPaused' };
export enum PauseErrorOutput { Paused = 'Paused', NotPaused = 'NotPaused' };

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type CollateralChangeEventInput = { trader: IdentityInput, new_balance: BigNumberish };
export type CollateralChangeEventOutput = { trader: IdentityOutput, new_balance: BN };
export type CollateralConfigurationInput = { deposit_cap: BigNumberish, collateral_ratio: BigNumberish, collateral_scale: BigNumberish, discount_ratio: BigNumberish, price_feed: string };
export type CollateralConfigurationOutput = { deposit_cap: BN, collateral_ratio: BN, collateral_scale: BN, discount_ratio: BN, price_feed: string };
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;
export type I64Input = { underlying: BigNumberish };
export type I64Output = { underlying: BN };
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type OwnershipTransferredInput = { new_owner: IdentityInput, previous_owner: IdentityInput };
export type OwnershipTransferredOutput = { new_owner: IdentityOutput, previous_owner: IdentityOutput };

export type VaultConfigurables = Partial<{
  SETTLEMENT_TOKEN: AssetIdInput;
  PERPS_CONTRACT: ContractIdInput;
  VERSION: BigNumberish;
}>;

const abi = {
  "programType": "contract",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "()",
      "concreteTypeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      "type": "(u64, u64)",
      "concreteTypeId": "41bd1a98f0a59642d8f824c805b798a5f268d1f7d05808eb05c4189c493f1be0",
      "metadataTypeId": 0
    },
    {
      "type": "bool",
      "concreteTypeId": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903"
    },
    {
      "type": "enum standards::src5::AccessError",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      "metadataTypeId": 2
    },
    {
      "type": "enum std::identity::Identity",
      "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335",
      "metadataTypeId": 3
    },
    {
      "type": "enum std::option::Option<struct vault_abi::data_structures::CollateralConfiguration>",
      "concreteTypeId": "c0af65c90c6503ba00a2087684636f4285dd92067d56cd3f8748ca6907b786d8",
      "metadataTypeId": 4,
      "typeArguments": [
        "c992808d600193fa372b7ec9e31b6543bc412a499b4e6e3afc449996603517b9"
      ]
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      "metadataTypeId": 5
    },
    {
      "type": "enum sway_libs::pausable::errors::PauseError",
      "concreteTypeId": "8b3afcadf894415a10b09fc3717487e33802c8ffbb030edafe84ca4a71b280bc",
      "metadataTypeId": 6
    },
    {
      "type": "enum vault_abi::errors::Error",
      "concreteTypeId": "9f4a45b69942e2bce51c8831d943bda9f14b7161cf7f2bbf1e27e4f487f43cb7",
      "metadataTypeId": 7
    },
    {
      "type": "str",
      "concreteTypeId": "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    },
    {
      "type": "struct compolabs_sway_libs::signed_integers::i64::I64",
      "concreteTypeId": "c35f504fa0cf6c3c54066e2780bc4033982f9a802842793a014ba0f5c699d8ce",
      "metadataTypeId": 9
    },
    {
      "type": "struct events::CollateralChangeEvent",
      "concreteTypeId": "ca70e3a138b5c547e5829211b457fcfa4c81405a2565ad4599491e8b99f28572",
      "metadataTypeId": 10
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 12
    },
    {
      "type": "struct std::contract_id::ContractId",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "metadataTypeId": 13
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5",
      "metadataTypeId": 14
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipTransferred",
      "concreteTypeId": "b3fffbcb3158d7c010c31b194b60fb7857adb4ad61bdcf4b8b42958951d9f308",
      "metadataTypeId": 15
    },
    {
      "type": "struct vault_abi::data_structures::CollateralConfiguration",
      "concreteTypeId": "c992808d600193fa372b7ec9e31b6543bc412a499b4e6e3afc449996603517b9",
      "metadataTypeId": 16
    },
    {
      "type": "u32",
      "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc"
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "(_, _)",
      "metadataTypeId": 0,
      "components": [
        {
          "name": "__tuple_element",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "__tuple_element",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "b256",
      "metadataTypeId": 1
    },
    {
      "type": "enum standards::src5::AccessError",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "NotOwner",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 3,
      "components": [
        {
          "name": "Address",
          "typeId": 11
        },
        {
          "name": "ContractId",
          "typeId": 13
        }
      ]
    },
    {
      "type": "enum std::option::Option",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "None",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Some",
          "typeId": 8
        }
      ],
      "typeParameters": [
        8
      ]
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "metadataTypeId": 5,
      "components": [
        {
          "name": "CannotReinitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum sway_libs::pausable::errors::PauseError",
      "metadataTypeId": 6,
      "components": [
        {
          "name": "Paused",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "NotPaused",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum vault_abi::errors::Error",
      "metadataTypeId": 7,
      "components": [
        {
          "name": "InvalidAsset",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "AccessDenied",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "AmountExceedsTheBalance",
          "typeId": 0
        },
        {
          "name": "V_GTDC",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "SettlementAmountExeedsMaxRepayedSettlement",
          "typeId": 0
        },
        {
          "name": "V_NL",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "ZeroAmount",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 8
    },
    {
      "type": "struct compolabs_sway_libs::signed_integers::i64::I64",
      "metadataTypeId": 9,
      "components": [
        {
          "name": "underlying",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct events::CollateralChangeEvent",
      "metadataTypeId": 10,
      "components": [
        {
          "name": "trader",
          "typeId": 3
        },
        {
          "name": "new_balance",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 11,
      "components": [
        {
          "name": "bits",
          "typeId": 1
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 12,
      "components": [
        {
          "name": "bits",
          "typeId": 1
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 13,
      "components": [
        {
          "name": "bits",
          "typeId": 1
        }
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "metadataTypeId": 14,
      "components": [
        {
          "name": "new_owner",
          "typeId": 3
        }
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipTransferred",
      "metadataTypeId": 15,
      "components": [
        {
          "name": "new_owner",
          "typeId": 3
        },
        {
          "name": "previous_owner",
          "typeId": 3
        }
      ]
    },
    {
      "type": "struct vault_abi::data_structures::CollateralConfiguration",
      "metadataTypeId": 16,
      "components": [
        {
          "name": "deposit_cap",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "collateral_ratio",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "collateral_scale",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "discount_ratio",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "price_feed",
          "typeId": 1
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "deposit_collateral",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "payable",
          "arguments": []
        },
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "new_owner",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "initialize_ownership",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "liquidator",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "settlement_amount",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "max_repaid_settlement",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "insurance_fund",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "liquidate_collateral",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "pause",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "resume",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset_id",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "configuration",
          "concreteTypeId": "c992808d600193fa372b7ec9e31b6543bc412a499b4e6e3afc449996603517b9"
        }
      ],
      "name": "set_collateral_configuration",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "new_owner",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "transfer_ownership",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "amount",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "recipient",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "owed_realized_pnl",
          "concreteTypeId": "c35f504fa0cf6c3c54066e2780bc4033982f9a802842793a014ba0f5c699d8ce"
        }
      ],
      "name": "withdraw_collateral",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "get_collateral_balance",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "get_collateral_configuration",
      "output": "c0af65c90c6503ba00a2087684636f4285dd92067d56cd3f8748ca6907b786d8",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "get_collateral_price",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "get_non_settlement_token_balance",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        },
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "max_repaid_settlement",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "get_repaid_settlement_liquidatable_collateral_max_values",
      "output": "41bd1a98f0a59642d8f824c805b798a5f268d1f7d05808eb05c4189c493f1be0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "trader",
          "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
        }
      ],
      "name": "has_non_settlement_token",
      "output": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "token",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "is_allowed_collateral",
      "output": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": "11478063250864792252",
      "concreteTypeId": "9f4a45b69942e2bce51c8831d943bda9f14b7161cf7f2bbf1e27e4f487f43cb7"
    },
    {
      "logId": "10032608944051208538",
      "concreteTypeId": "8b3afcadf894415a10b09fc3717487e33802c8ffbb030edafe84ca4a71b280bc"
    },
    {
      "logId": "14587409474633712967",
      "concreteTypeId": "ca70e3a138b5c547e5829211b457fcfa4c81405a2565ad4599491e8b99f28572"
    },
    {
      "logId": "2161305517876418151",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      "logId": "16280289466020123285",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5"
    },
    {
      "logId": "10098701174489624218",
      "concreteTypeId": "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    },
    {
      "logId": "4571204900286667806",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      "logId": "12970362301975156672",
      "concreteTypeId": "b3fffbcb3158d7c010c31b194b60fb7857adb4ad61bdcf4b8b42958951d9f308"
    }
  ],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "SETTLEMENT_TOKEN",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "offset": 43768
    },
    {
      "name": "PERPS_CONTRACT",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "offset": 43736
    },
    {
      "name": "VERSION",
      "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc",
      "offset": 43800
    }
  ]
};

const storageSlots: StorageSlot[] = [];

export class VaultInterface extends Interface {
  constructor() {
    super(abi);
  }

  declare functions: {
    deposit_collateral: FunctionFragment;
    initialize_ownership: FunctionFragment;
    liquidate_collateral: FunctionFragment;
    pause: FunctionFragment;
    resume: FunctionFragment;
    set_collateral_configuration: FunctionFragment;
    transfer_ownership: FunctionFragment;
    withdraw_collateral: FunctionFragment;
    get_collateral_balance: FunctionFragment;
    get_collateral_configuration: FunctionFragment;
    get_collateral_price: FunctionFragment;
    get_non_settlement_token_balance: FunctionFragment;
    get_repaid_settlement_liquidatable_collateral_max_values: FunctionFragment;
    has_non_settlement_token: FunctionFragment;
    is_allowed_collateral: FunctionFragment;
  };
}

export class Vault extends Contract {
  static readonly abi = abi;
  static readonly storageSlots = storageSlots;

  declare interface: VaultInterface;
  declare functions: {
    deposit_collateral: InvokeFunction<[trader: IdentityInput], void>;
    initialize_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
    liquidate_collateral: InvokeFunction<[liquidator: IdentityInput, trader: IdentityInput, token: AssetIdInput, settlement_amount: BigNumberish, max_repaid_settlement: BigNumberish, insurance_fund: IdentityInput], BN>;
    pause: InvokeFunction<[], void>;
    resume: InvokeFunction<[], void>;
    set_collateral_configuration: InvokeFunction<[asset_id: AssetIdInput, configuration: CollateralConfigurationInput], void>;
    transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
    withdraw_collateral: InvokeFunction<[trader: IdentityInput, token: AssetIdInput, amount: BigNumberish, recipient: IdentityInput, owed_realized_pnl: I64Input], void>;
    get_collateral_balance: InvokeFunction<[trader: IdentityInput, token: AssetIdInput], BN>;
    get_collateral_configuration: InvokeFunction<[token: AssetIdInput], Option<CollateralConfigurationOutput>>;
    get_collateral_price: InvokeFunction<[token: AssetIdInput], BN>;
    get_non_settlement_token_balance: InvokeFunction<[trader: IdentityInput], BN>;
    get_repaid_settlement_liquidatable_collateral_max_values: InvokeFunction<[trader: IdentityInput, token: AssetIdInput, max_repaid_settlement: BigNumberish], [BN, BN]>;
    has_non_settlement_token: InvokeFunction<[trader: IdentityInput], boolean>;
    is_allowed_collateral: InvokeFunction<[token: AssetIdInput], boolean>;
  };

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    super(id, abi, accountOrProvider);
  }
}
