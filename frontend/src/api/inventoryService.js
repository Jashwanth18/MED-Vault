import axiosInstance from "./axiosInstance";

const getInventoryLog = async ({ search, year, month }) =>
  axiosInstance.get(
    `/inventory/history?search=${search}&month=${month}&year=${year}`
  );

export { getInventoryLog };
