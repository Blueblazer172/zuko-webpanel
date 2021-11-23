import axios from 'axios';
import authHeader from './auth-header';

class LogService {
    getLogs(userId) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/${userId}/` + 'log', {headers: authHeader()});
    }
}

export default new LogService();
