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
                <label class="form-label">&nbsp;</label><br>
                <button class="btn btn-danger form-control" @click="deleteRoom(this.selectedRoom.id)">Löschen</button>
            </div>
            <div class="col-12 mt-3" v-if="isEdit">
                <hr>
                <h3>QR Code</h3>
                <qrcode-vue id="qrblock" ref="qrcode" :value="JSON.stringify({'room': (this.selectedRoom.name).toString()})" :size="100" level="H" render-as="svg" />
            </div>
            <div class="col-12 mt-3">
                <hr>
                <h3>Räume</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table" id="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="roomsrows hovering-highlight" v-for="room in rooms" :key="room.id" @click="updateRoom(room)" :id="room.id">
                            <th scope="row">{{ room.id }}</th>
                            <td>{{ room.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="isEdit" class="col-3">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="roomsrows" v-for="room in rooms" :key="room.id" :id="room.id">
                            <td v-if="this.selectedRoom.name === room.name">
                                <button class="btn btn-primary" @click="donwloadQR()">Download QR Code</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <canvas style="display: none" id="canvas"></canvas>
    </div>
</template>

<style scoped>
.roomsrow {
    background-color: lightgrey;
    cursor: pointer;
}

.hovering-highlight:hover {
    background-color: lightgrey;
    cursor: pointer;
}
.roomsrows td, .table tr th {
    line-height: 80px;
}
</style>

<script>
import RoomService from "../../services/room.service";
import QrcodeVue from 'qrcode.vue';

export default {
    name: "Rooms",
    components: {QrcodeVue},
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
        deleteRoom(roomId) {
            RoomService.deleteRoom(roomId);
        },
        editRoom(room) {
            RoomService.updateRoom(room.id, this.$refs.room.value);
        },
        createRoom(newRoomName) {
            if (newRoomName) {
                newRoomName = newRoomName.toLowerCase();
                RoomService.createRoom(newRoomName);
            }
        },
        triggerDownload(imgURI) {
            var evt = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true
            });

            var a = document.createElement('a');
            a.setAttribute('download', 'room_' + this.selectedRoom.name + '_qrcode.png');
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');

            a.dispatchEvent(evt);
        },
        donwloadQR() {
            let svg = document.querySelector('#qrblock');
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            var data = (new XMLSerializer()).serializeToString(svg);
            var DOMURL = window.URL || window.webkitURL || window;

            var img = new Image();
            var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
            var url = DOMURL.createObjectURL(svgBlob);
            let that = this;

            img.onload = function () {
                ctx.drawImage(img, 0, 0);
                DOMURL.revokeObjectURL(url);

                var imgURI = canvas
                    .toDataURL('image/png')
                    .replace('image/png', 'image/octet-stream');

                that.triggerDownload(imgURI);
            };

            img.src = url;
        }
    }
};
</script>
