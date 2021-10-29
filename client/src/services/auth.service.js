import axios from 'axios';

let API_URL = '';
if (process.env.VUE_APP_IS_LOCAL_DEV === "true") {
    API_URL = `${process.env.VUE_APP_BACKEND}/api/auth/`;
} else {
    API_URL = `/api/auth/`;
}

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'signup', {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();