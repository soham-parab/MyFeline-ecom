export const sortData = (state, data) => {
  if (state.filters.priceSort === "high_to_low") {
    return [...data].sort((a, b) => b.price - a.price);
  }
  if (state.filters.priceSort === "low_to_high") {
    return [...data].sort((a, b) => a.price - b.price);
  }

  return data;
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
