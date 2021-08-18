export const getFilteredData = (state, data) => {
  let filteredData = [...data];

  if (state.filters.sortByBrand.length !== 0) {
    filteredData = filteredData.filter((data) =>
      state.filters.sortByBrand.includes(data.brand)
    );
  }
  if (state.filters.sortByType.length !== 0) {
    filteredData = filteredData.filter((data) =>
      state.filters.sortByType.includes(data.Type)
    );
  }
  if (state.filters.stock.length !== 0) {
    filteredData = filteredData.filter((data) =>
      state.filters.stock.includes(data.stock)
    );
  }

  if (state.filters.FASTDELIVERY.length !== 0) {
    filteredData = filteredData.filter((data) =>
      state.filters.FASTDELIVERY.includes(data.FASTDELIVERY)
    );
  }

  return filteredData;
};
