import type { FunctionInvocationScope } from "fuels";
import { WriteTransactionResponse } from "src/interface";

export const sendTransaction = async (
  tx: FunctionInvocationScope,
  gasLimitMultiplier = 2,
): Promise<WriteTransactionResponse> => {
  const { gasUsed } = await tx.getTransactionCost();

  const gasLimit = gasUsed.mul(gasLimitMultiplier).toString();

  const res = await tx.txParams({ gasLimit }).call();
  const data = await res.waitForResult();

  return {
    transactionId: res.transactionId,
    value: data.value,
  };
};
