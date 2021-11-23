import axios from 'axios';
import authHeader from './auth-header';
import router from "../router";

class RoleService {
    getRoles() {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/role/`, {headers: authHeader()});
    }

    getRole(roleId) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/role/` + roleId, {headers: authHeader()});
    }

    createRole(newRoleName) {
        axios({
            url: `${process.env.VUE_APP_BACKEND}/api/role/`,
            headers: authHeader(),
            method: 'POST',
            data: {
                name: newRoleName
            }
        }).then(() => {
            router.go(0);
        })
    }
}

export default new RoleService();
