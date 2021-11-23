import axios from 'axios';
import authHeader from './auth-header';
import router from "../router";

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

    getLogs(userId) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/${userId}/` + 'log', {headers: authHeader()});
    }

    getUserInformation(id) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/` + id, {headers: authHeader()});
    }

    getUsers() {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/`, {headers: authHeader()});
    }

    getRoles(id) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/roles/` + id, {headers: authHeader()});
    }

    getRooms(id) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/user/rooms/` + id, {headers: authHeader()});
    }

    setRooms(id, rooms) {
        axios({
            url: `${process.env.VUE_APP_BACKEND}/api/user/rooms/` + id,
            headers: authHeader(),
            method: 'POST',
            data: {
                rooms: rooms
            }
        }).then(() => {
            router.go(0);
        })
    }

    setRoles(id, roles) {
        axios({
            url: `${process.env.VUE_APP_BACKEND}/api/user/roles/` + id,
            headers: authHeader(),
            method: 'POST',
            data: {
                roles: roles
            }
        }).then(() => {
            router.go(0);
        })
    }

}

export default new UserService();
