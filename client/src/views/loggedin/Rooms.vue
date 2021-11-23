<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <header><h3>Verwaltungspanel Räume</h3></header>
                <hr>
            </div>
            <div class="col-3">
                <label for="newRoom" class="form-label">Neuen Raum anlegen</label>
                <input type="text" class="form-control" id="newRoom" ref="newRoom">
            </div>
            <div class="col-3">
                <label class="form-label">&nbsp;</label>
                <button class="btn btn-primary form-control" @click="createRoom(this.$refs.newRoom.value)">Hinzufügen</button>
            </div>
            <div class="col-12 mt-3">
                <hr>
                <h3>Räume</h3>
            </div>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr class="roomsrow" v-for="room in rooms" :key="room.id" @click="manageRoom(room.id)">
                <th scope="row">{{ room.id }}</th>
                <td>{{ room.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.roomsrow:hover {
    background-color: lightgrey;
    cursor: pointer;
}
</style>

<script>
import RoomService from "../../services/room.service";

export default {
    name: "Rooms",
    data() {
        return {
            rooms: null,
        };
    },
    mounted() {
        RoomService.getRooms().then(
            (response) => {
                this.rooms = response.data;
            }
        );
    },
    methods: {
        manageRoom(id) {
            return this.$router.push('/room/' + id);
        },
        createRoom(newRoomName) {
            if (newRoomName) {
                newRoomName = newRoomName.toLowerCase();
                RoomService.createRoom(newRoomName);
            }
        }
    }
};
</script>
