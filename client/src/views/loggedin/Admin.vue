<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-11">
                <header><h3>Verwaltungspanel User</h3></header>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rollen</th>
                        <th scope="col">Räume</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="userrow hovering-highlight" v-for="user in users" :key="user.user.id" @click="manageUser(user.user.id)">
                        <th scope="row">{{ user.user.id }}</th>
                        <td>{{ user.user.name }}</td>
                        <td>{{ user.user.email }}</td>
                        <td v-if="user.userRoles.length > 0">
                            <span>{{ formatName(user.userRoles) }}</span>
                        </td>
                        <td v-else>
                            <span>Keine Rollen</span>
                        </td>
                        <td v-if="user.userRooms.length > 0">
                            <span>{{ formatName(user.userRooms) }}</span>
                        </td>
                        <td v-else>
                            <span>Keine Räume</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-1">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="userrow" v-for="user in users" :key="user.user.id">
                            <td>
                                <button class="btn-sm btn-danger" @click="deleteUser(user.user.id)">Löschen</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hovering-highlight:hover {
    background-color: lightgrey;
    cursor: pointer;
}
.userrow td, .table tr th {
    line-height: 40px;
}
</style>

<script>
import UserService from "../../services/user.service";

export default {
    name: "Admin",
    data() {
        return {
            users: null,
        };
    },
    mounted() {
        UserService.getUsers().then(
            (response) => {
                this.users = response.data;
            }
        );
    },
    methods: {
        manageUser(id) {
            return this.$router.push('/user/management/' + id);
        },
        formatName(rolesRooms) {
            let retString = '';

            for (let i = 0; i < rolesRooms.length; i++) {
                if ((i < (rolesRooms.length - 1))) {
                    retString += rolesRooms[i].name + ', '
                } else {
                    retString += rolesRooms[i].name
                }
            }

            return retString
        },
        deleteUser(userId) {
            UserService.deleteUser(userId);
        }
    }
};
</script>
