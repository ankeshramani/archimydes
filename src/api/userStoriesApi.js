import axios from "axios";
import { BASE_URL } from "../common/constants";
import { getToken } from "../utils/common";

export async function saveUserStoriesAPI(data, projectId, sprintId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/stories`;
  const response = await axios.post(url, data, config);
  return response.data;
}

export async function getUserStoriesAPI(projectId, sprintId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/stories`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function updateUserStoriesAPI(data, projectId, sprintId, storyId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/stories/${storyId}`;
  const response = await axios.put(url, data, config);
  return response.data;
}

export async function getOneUserStoriesAPI( projectId, sprintId, storyId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/stories/${storyId}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function moveUserStoriesAPI(projectId, sprintId, storyId, newSprintId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/stories/${storyId}/move/${newSprintId}`;
  const response = await axios.put(url, {}, config);
  return response.data;
}

export async function deleteUserStoriesAPI(projectId, sprintId, storyId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/stories/${storyId}`;
  const response = await axios.delete(url, config);
  return response.data;
}