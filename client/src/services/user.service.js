import axios from 'axios';
import authHeader from './auth-header';

let API_URL = '';
if (process.env.VUE_APP_IS_LOCAL_DEV === "true") {
    API_URL = `${process.env.VUE_APP_BACKEND}/api/test/`;
} else {
    API_URL = `/api/test/`;
}

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
    getLogs(userId) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/${userId}/` + 'log', { headers: authHeader() });
    }
    getUserInformation() {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/`, { headers: authHeader() });
    }
}

export default new UserService();
