import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken } from '../utils/common';

export async function getProjectListAPI(query='') {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${query}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function getProjectAPI(projectId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function saveProjectAPI(data) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/`;
  const response = await axios.post(url, data, config);
  return response.data;
}

export async function updateProjectAPI(data, projectId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}`;
  const response = await axios.put(url, data, config);
  return response.data;
}