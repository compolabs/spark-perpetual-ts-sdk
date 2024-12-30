import { gql, QueryOptions } from "@apollo/client";

import { generateWhereFilter } from "@src/utils/generateWhereFilter";

import { GetActiveOrdersParams, GetOrdersParams } from "..";

export const getOrdersQuery = (
  type: "query" | "subscription",
  params: GetOrdersParams,
): QueryOptions => {
  const { limit, orderType, offset, ...restParams } = params;
  const priceOrder = orderType === "Buy" ? "desc" : "asc";
  const offsetInRange = offset ?? 0;

  const query = gql`
    ${type} OrderQuery(
      $limit: Int!
      $offset: Int!
      $where: Order_bool_exp
      $priceOrder: order_by!
    ) {
      Order(limit: $limit, offset: $offset, where: $where, order_by: { price: $priceOrder }) {
        id
        orderType
        price
        status
        timestamp
        market
        trader
        baseSize
        baseSizeI64
        db_write_timestamp
      }
    }
  `;
  console.log("query", query);
  console.log("213", {
    query,
    variables: {
      limit,
      offset: offsetInRange,
      where: generateWhereFilter(restParams),
      priceOrder,
    },
  });

  return {
    query,
    variables: {
      limit,
      offset: offsetInRange,
      where: generateWhereFilter(restParams),
      priceOrder,
    },
  };
};

export const getActiveOrdersQuery = (
  type: "query" | "subscription",
  params: GetActiveOrdersParams,
): QueryOptions => {
  const { limit, orderType, offset, ...restParams } = params;
  const priceOrder = orderType === "Buy" ? "desc" : "asc";
  const queryObject = `Active${orderType}Order`;
  const offsetInRange = offset ?? 0;

  const query = gql`
    ${type} ${queryObject}Query(
      $limit: Int!
      $offset: Int!
      $where: ${queryObject}_bool_exp
      $priceOrder: order_by!
    ) {
      ${queryObject}(limit: $limit, offset: $offset, where: $where, order_by: { price: $priceOrder }) {
        id
        db_write_timestamp
        baseSizeI64
        baseSize
        market
        orderType
        status
        timestamp
        trader
        price
      }
    }
  `;

  return {
    query,
    variables: {
      limit,
      offset: offsetInRange,
      where: generateWhereFilter(restParams),
      priceOrder,
    },
  };
};
