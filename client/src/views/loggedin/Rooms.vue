<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <header><h3>Verwaltungspanel Räume</h3></header>
                <hr>
            </div>
            <div class="col-3">
                <label for="room" ref="editRoomName" class="form-label">Neuen Raum anlegen</label>
                <input type="text" class="form-control" id="room" ref="room">
            </div>
            <div class="col-3">
                <label class="form-label">&nbsp;</label>
                <button v-if="!isEdit" class="btn btn-primary form-control" @click="createRoom(this.$refs.room.value)">Hinzufügen</button>
                <button v-else class="btn btn-primary form-control" @click="editRoom(this.selectedRoom)">Bearbeiten</button>
            </div>
            <div class="col-3" v-if="isEdit">
                <label class="form-label">&nbsp;</label>
                <button class="btn btn-danger form-control" @click="deleteRoom(this.selectedRoom)">Löschen</button>
            </div>
            <div class="col-12 mt-3">
                <hr>
                <h3>Räume</h3>
            </div>
        </div>
        <table class="table" id="table">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr class="roomsrows" v-for="room in rooms" :key="room.id" @click="updateRoom(room)" :id="room.id">
                <th scope="row">{{ room.id }}</th>
                <td>{{ room.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.roomsrow {
    background-color: lightgrey;
    cursor: pointer;
}

.roomsrows:hover {
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
            isEdit: false,
            selectedRoom: null
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
        updateRoom(room) {
            this.selectedRoom = room;

            let isSet = document.getElementById(room.id).classList.contains('roomsrow');
            let elems = document.getElementById('table').getElementsByClassName('roomsrow');
            for (let i = 0; i < elems.length; i++) {
                elems[i].classList.remove('roomsrow');
            }

            if (!isSet) {
                this.isEdit = true;
                this.$refs.room.value = room.name;
                this.$refs.editRoomName.innerHTML = "Raum bearbeiten";
                document.getElementById(room.id).classList.add('roomsrow');
            } else {
                this.isEdit = false;
                this.$refs.room.value = '';
                this.$refs.editRoomName.innerHTML = "Neuen Raum anlegen";
            }

        },
        deleteRoom(room) {
            RoomService.deleteRoom(room.id);
        },
        editRoom(room) {
            RoomService.updateRoom(room.id, this.$refs.room.value);
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
