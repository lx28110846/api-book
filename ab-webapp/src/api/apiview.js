import axios from 'axios';
import axiosConf from './axiosConf'

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params); };

export const getApiGroupList = params => { return axios.get(`${base}/apiview/apiGroupList`, params); };

export const getApiList = params => { return axios.get(`${base}/apiview/apiList`, params); };

export const getApiDetail = params => { return axios.get(`${base}/apiview/apiDetail`, params); };

export const updateApiParam = params => { return axios.post(`${base}/apiview/updateApiParam`, params); };

export const delApiParam = params => { return axios.post(`${base}/apiview/delApiParam`, params); };

export const addApiParam = params => { return axios.post(`${base}/apiview/addApiParam`, params); };

export const updateApiDetail = params => { return axios.post(`${base}/apiview/updateApiDetail`, params); };

export const addApi = params => { return axios.post(`${base}/apiview/addApi`, params); };

export const delApi = params => { return axios.post(`${base}/apiview/delApi`, params); };

export const addApiGroup = params => { return axios.post(`${base}/apiview/addApiGroup`, params); };

export const delApiGroup = params => { return axios.post(`${base}/apiview/delApiGroup`, params); };

export const updateApiGroup = params => { return axios.post(`${base}/apiview/updateApiGroup`, params); };

export const addCommonParam = params => { return axios.post(`${base}/apiview/addCommonParam`, params); };

export const delCommonParam = params => { return axios.post(`${base}/apiview/delCommonParam`, params); };

export const updateCommonParam = params => { return axios.post(`${base}/apiview/updateCommonParam`, params); };
