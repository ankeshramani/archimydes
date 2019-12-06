import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken } from "../utils/common";

export async function getPackegeApi() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}packages/`;
  const response = await axios.get(url, config);
  return response.data;
}