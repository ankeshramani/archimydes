import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken, getUserId } from "../utils/common";

export async function getUsersCredits(id) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}users/${id}/credits`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function getUsersCreditsHistory(id) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}users/${id}/credits/history`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function getCreditByProjectApi(id) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}users/${id}/credits/projects`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function reserveCreditsByUserStoryApi(id, data) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}users/${id}/credits/reserve`;
  const response = await axios.post(url, data, config);
  return response.data;
}