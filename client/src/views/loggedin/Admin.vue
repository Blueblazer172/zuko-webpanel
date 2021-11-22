<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col">
                <header><h3>Verwaltungspanel User</h3></header>
            </div>
        </div>
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
            <tr class="userrow" v-for="user in users" :key="user.id" @click="manageUser(user.id)">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.roles[0] != null ? user.roles.sort().join(', ') : 'Keine Rollen' }}</td>
                <td>{{ user.rooms[0] != null ? user.rooms.sort().join(', ') : 'Keine Räume' }}</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<style scoped>
.userrow:hover {
    background-color: lightgrey;
    cursor: pointer;
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
            return this.$router.push('/user/' + id + '/mgmt');
        }
    }
};
</script>
