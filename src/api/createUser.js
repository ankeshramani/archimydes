import axios from 'axios';
import { BASE_URL } from "../common/constants";
import { getToken} from "../utils/common";

export async function createNewUserApi(data) {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
    let url = `${BASE_URL}oauth/signup`;
    const response = await axios.post(url, data, config);
    return response.data;
}