import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken, getUserId } from "../utils/common";

export async function signUpAPI(data) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}oauth/signup`;
  const response = await axios.post(url, data, config);
  return response.data;
}

export async function getUsersInfoAPI(query='') {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getToken(),
      },
    }
  let url = `${BASE_URL}oauth/users${query}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function loginAPI(data) {
    const config = {
        headers: {
            'Content-type':'application/x-www-form-urlencoded',
            'Authorization':'Basic YXBwbGljYXRpb246c2VjcmV0',
        },
    }

    data = Object.keys(data).map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    }).join("&");

    let url = `${BASE_URL}oauth/token`;
    const response = await axios.post(url, data, config);
    return response.data;
}

export async function getUserAPI() {
  const config = {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}oauth/users/${getUserId()}`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function getUsers() {
  const config = {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}oauth/users`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function userProfileUpdateAPI(data) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}oauth/users/${getUserId()}`;
  const response = await axios.put(url, data, config);
  return response.data;
}

export async function logoutAPI() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}oauth/signout`;
  const response = await axios.get(url, config);
  return response.data;
}
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

export async function UsersCredits(data,userId) {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        },
    }
    let url = `${BASE_URL}users/${userId}/credits/add`;
    const response = await axios.post(url, data, config);
    return response.data;
}

export async function UsersCreditsDeduct(data,userId) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }
  let url = `${BASE_URL}users/${userId}/credits/deduct`;
  const response = await axios.post(url, data, config);
  return response.data;
}

export async function deleteUsers(id) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        },
    }
    let url = `${BASE_URL}oauth/users/${id}`;
    const response = await axios.delete(url, config);
    return response.data;
}

export async function updateUsers(data,id) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        },
    }
    let url = `${BASE_URL}oauth/users/${id}`;
    const response = await axios.put(url,data, config);
    return response.data;
}
