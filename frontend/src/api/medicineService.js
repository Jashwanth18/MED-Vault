import axiosInstance from "./axiosInstance";

const getMedicines = async ({ search, type }) =>
  axiosInstance.get(`/medicines?search=${search}&type=${type}`);

const getMedicineById = async (medId) =>
  axiosInstance.get(`/medicines/${medId}`);

const getStockInfo = async (medId) =>
  axiosInstance.get(`/medicines/${medId}/stockInfo`);

const createMedicine = async (medData) =>
  axiosInstance.post(`/medicines/new-med`, medData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const createStockRecord = async (medId, recordData) =>
  axiosInstance.post(`/medicines/${medId}/new-record`, recordData);

const updateStockRecord = async (medId, recordId, updatedRecordData) =>
  axiosInstance.put(`/medicines/${medId}/${recordId}`, updatedRecordData);

const deleteStockRecord = async (medId, recordId) =>
  axiosInstance.delete(`/medicines/${medId}/${recordId}`);

export {
  getMedicines,
  getMedicineById,
  createStockRecord,
  deleteStockRecord,
  getStockInfo,
  createMedicine,
  updateStockRecord,
};
