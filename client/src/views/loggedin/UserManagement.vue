<template>
    <div class="container mt-3" v-if="user">
        <div class="row">
            <div class="col">
                <header>
                    <h3>User Rollenzuweisung für
                        <span class="badge-secondary">&nbsp;{{ user.email }}&nbsp;</span>
                    </h3>
                </header>
            </div>
        </div>
        <form class="row g-3">
            <div class="col-md-4">
                <label for="roles" class="form-label">Rollen</label>
                <div class="form-group">
                    <select multiple class="form-control" id="roles" v-model="rolesSelected">
                        <option v-for="role in roles" :key="role.id">{{ role.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <label for="rooms" class="form-label">Räume</label>
                <div class="form-group">
                    <select multiple class="form-control" id="rooms" v-model="roomsSelected">
                        <option v-for="room in rooms" :key="room.id">{{ room.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-12 mt-3">
                <button class="btn btn-primary" @click="update" type="submit">Aktualisieren</button>
            </div>
        </form>
        <br>
        <br>
        <div class="row mt-3">
            <div class="col" v-if="logs[0].created !== null">
                <header>
                    <h3>User History</h3>
                </header>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Zeit</th>
                            <th scope="col">Raum</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="rolerow hovering-highlight" v-for="log in logs.reverse()" :key="log.id">
                            <th scope="row">{{ moment(log.created).format('DD.MM.YYYY [&nbsp;] HH:mm') }}</th>
                            <td>{{ log.roomName }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="col">
                <header>
                    <h3>Keine History</h3>
                </header>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "../../services/user.service";
import RoleService from "../../services/role.service";
import RoomService from "../../services/room.service";
import moment from 'moment';

export default {
    name: "UserManagement",
    data() {
        return {
            user: null,
            rooms: [],
            roles: [],
            logs: [],
            rolesSelected: [],
            rolesSelectedCopy: [],
            roomsSelected: []
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    created: function () {
        this.moment = moment;
    },
    mounted() {
        if (!this.currentUser) {
            return this.$router.push('/login');
        }

        UserService.getUserInformation(this.$route.params.id).then(
            (response) => {
                this.user = response.data;
            }
        );

        RoleService.getRoles().then(
            (response) => {
                this.roles = response.data;
            }
        );

        RoomService.getRooms().then(
            (response) => {
                this.rooms = response.data;
            }
        );

        UserService.getRoles(this.$route.params.id).then(
            (response) => {
                this.rolesSelected = response.data;
                this.rolesSelectedCopy = response.data;
            }
        );

        UserService.getRooms(this.$route.params.id).then(
            (response) => {
                this.roomsSelected = response.data;
            }
        );

        UserService.getLogs(this.$route.params.id).then(
            (response) => {
                this.logs = response.data;
            }
        );
    },
    methods: {
        update() {
            let diffRoles = this.rolesSelectedCopy.filter(x => !this.rolesSelected.includes(x));

            if (diffRoles[0] === null) {
                diffRoles = []
            }

            UserService.setRolesAndRooms(this.$route.params.id, this.rolesSelected, this.roomsSelected, diffRoles);
        }
    }
};
</script>
