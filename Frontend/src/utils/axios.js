import axios from 'axios';
import qs from 'qs';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});
