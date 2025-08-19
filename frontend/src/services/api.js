import axios from "axios";
import { API_BASE_URL } from "../utils/config";

export const uploadSheet = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE_URL}/faculty/uploadSheet`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateStudent = (pin, due) => {
  return axios.post(`${API_BASE_URL}/faculty/updateStudent`, { pin, due });
};

export const addReceipt = (pin, receipt_url) => {
  return axios.post(`${API_BASE_URL}/faculty/addReceipt`, { pin, receipt_url });
};

export const searchStudent = (pin) => {
  return axios.get(`${API_BASE_URL}/student/searchStudent/${pin}`);
};

export const generateHallticket = (pin) => {
  return axios.get(`${API_BASE_URL}/student/generateHallticket/${pin}`, {
    responseType: "blob",
  });
};

export const generateHallticketFaculty = (pin) => {
  return axios.get(`${API_BASE_URL}/faculty/generateHallticket/${pin}`, {
    responseType: "blob",
  });
};

export const uploadReceipt = (pin, formData) => {
  return axios
    .post(`${API_BASE_URL}/student/uploadReceipt/${pin}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};
