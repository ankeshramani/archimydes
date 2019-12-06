import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken} from "../utils/common";

export async function getDiscountApi() {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}coupons?filter=unused`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function addDiscountApi(data) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}coupons`;
  const response = await axios.post(url, data, config );
  return response.data;
}

export async function deleteDiscountApi(id) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}coupons/${id}`;
  const response = await axios.delete(url, config);
  return response.data;
}

export async function applyVoucherApi(vocherNumber) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}coupons/validate/${vocherNumber}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function paymentApi(data) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
        'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}payments`;
  const response = await axios.post(url, data, config );
  return response.data;
}