<template>
    <div class="container mt-3" v-if="role">
        <div class="row">
            <div class="col">
                <header>
                    <h3>Raumzuweisung für Rolle
                        <span class="badge-secondary">&nbsp;{{role.name }}&nbsp;</span>
                    </h3>
                </header>
            </div>
        </div>
        <form class="row g-3">
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
    </div>
</template>

<script>
import RoleService from "../../services/role.service";
import RoomService from "../../services/room.service";

export default {
    name: "RoleManagement",
    data() {
        return {
            user: null,
            rooms: [],
            role: [],
            roomsSelected: []
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            return this.$router.push('/login');
        }

        RoomService.getRooms().then(
            (response) => {
                this.rooms = response.data;
            }
        );

        RoleService.getRooms(this.$route.params.id).then(
            (response) => {
                this.roomsSelected = response.data;
            }
        )

        RoleService.getRole(this.$route.params.id).then(
            (response) => {
                this.role = response.data;
            }
        )
    },
    methods: {
        update() {
            RoleService.setRooms(this.$route.params.id, this.roomsSelected);
        }
    }
};
</script>
