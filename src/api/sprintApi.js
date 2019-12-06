import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken} from "../utils/common";

export async function saveSprintAPI(data, projectId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints`;
  const response = await axios.post(url, data, config);
  return response.data;
}

export async function getAllSprintsAPI(projectId, query='') {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints${query}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function updateSprintAPI(data, projectId, sprintId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}`;
  const response = await axios.put(url, data, config);
  return response.data;
}

export async function getSprintAPI(projectId, sprintId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function getOneSprintsAPI(projectId, sprintId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}`;
  const response = await axios.get(url, config);
  return response.data;
}