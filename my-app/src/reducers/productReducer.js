import { useReducer } from "react";

export const reducerFunction = (acc, action) => {
  switch (action.type) {
    case "SET PRODUCTS":
      return {
        ...acc,
        products: action.payload,
      };
    case "SET CART":
      return { ...acc, cart: action.payload };

    case "SET CART AFTER MOVE":
      return { ...acc };
    case "SET WISHLIST":
      return { ...acc, wishlist: action.payload };

    case "SORT":
      return { ...acc, sortBy: action.payload };
    case "PRICE_RANGE":
      return { ...acc, price_range: action.payload };
    case "RESET":
      return {
        ...acc,
        sortBy: null,
        price_range: 0,
        filters: {
          stock: [],
          FASTDELIVERY: [],
          sortByBrand: [],
          sortByType: [],
        },
      };
    case "IN STOCK":
      return {
        ...acc,
      };

    case "SORT_BY_BRAND":
      return acc.filters.sortByBrand.includes(action.payload)
        ? {
            ...acc,
            filters: {
              ...acc.filters,
              sortByBrand: acc.filters.sortByBrand.filter(
                (brand) => brand !== action.payload
              ),
            },
          }
        : {
            ...acc,
            filters: {
              ...acc.filters,
              sortByBrand: acc.filters.sortByBrand.concat(action.payload),
            },
          };

    case "SORT_BY_CATEGORY":
      return acc.filters.sortByType.includes(action.payload)
        ? {
            ...acc,
            filters: {
              ...acc.filters,
              sortByType: acc.filters.sortByType.filter(
                (Type) => Type !== action.payload
              ),
            },
          }
        : {
            ...acc,
            filters: {
              ...acc.filters,
              sortByType: acc.filters.sortByType.concat(action.payload),
            },
          };

    case "SORT_BY_STOCK":
      return acc.filters.stock.includes(action.payload)
        ? {
            ...acc,
            filters: {
              ...acc.filters,
              stock: acc.filters.stock.filter(
                (stock) => stock !== action.payload
              ),
            },
          }
        : {
            ...acc,
            filters: {
              ...acc.filters,
              stock: acc.filters.stock.concat(action.payload),
            },
          };

    case "SORT_BY_DELIVERY":
      return acc.filters.FASTDELIVERY.includes(action.payload)
        ? {
            ...acc,
            filters: {
              ...acc.filters,
              FASTDELIVERY: acc.filters.FASTDELIVERY.filter(
                (item) => item !== action.payload
              ),
            },
          }
        : {
            ...acc,
            filters: {
              ...acc.filters,
              FASTDELIVERY: acc.filters.FASTDELIVERY.concat(action.payload),
            },
          };

    default:
      break;
  }
};

export function getSortedData(productList, sortBy) {
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
    return [...productList].sort((a, b) => b["price"] - a["price"]);
  }
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
    return [...productList].sort((a, b) => a["price"] - b["price"]);
  }
  return productList;
}

export function getPriceRangeData(productList, price_range) {
  if (parseInt(price_range, 10) > 0) {
    return productList.filter(
      (item) => parseInt(item.price, 10) < parseInt(price_range, 10)
    );
  }
  return productList;
}
