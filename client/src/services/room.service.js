import axios from 'axios';
import authHeader from './auth-header';
import router from "../router";

class RoomService {
    getRooms() {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/room/`, {headers: authHeader()});
    }

    getRole(roomId) {
        return axios.get(`${process.env.VUE_APP_BACKEND}/api/room/` + roomId, {headers: authHeader()});
    }

    createRoom(newRoomName) {
        axios({
            url: `${process.env.VUE_APP_BACKEND}/api/room/`,
            headers: authHeader(),
            method: 'POST',
            data: {
                name: newRoomName
            }
        }).then(() => {
            router.go(0);
        })
    }
}

export default new RoomService();
