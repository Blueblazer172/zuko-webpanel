<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col">
                <header><h3>Verwaltungspanel Anfragen</h3></header>
            </div>
        </div>
        <table v-if="permissionRequests" class="table">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Raumname</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="userrow" v-for="permissionRequest in permissionRequests" :key="permissionRequest.id">
                <th scope="row">{{ permissionRequest.id }}</th>
                <td>{{ permissionRequest.userName }}</td>
                <td>{{ permissionRequest.roomName }}</td>
                <td>
                    <button class="btn btn-success mr-1" @click="accept(permissionRequest.id)">Accept</button>
                    <button class="btn btn-danger" @click="ignore(permissionRequest.id)">Ignore</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-else>Keine Anfragen!</div>
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
    name: "PermissionRequests",
    data() {
        return {
            permissionRequests: null,
        };
    },
    mounted() {
        UserService.getPermissionRequests().then(
            (response) => {
                if (response.data.length > 0) {
                    this.permissionRequests = response.data;
                }
            }
        );
    },
    methods: {
        accept(id) {
            UserService.acceptRequest(id).then(() => {
                UserService.getPermissionRequests().then(
                    (response) => {
                        if (response.data.length > 0) {
                            this.permissionRequests = response.data;
                        } else {
                            this.permissionRequests = null;
                        }
                    }
                );
            });
        },
        ignore(id) {
            UserService.ignoreRequest(id).then(() => {
                UserService.getPermissionRequests().then(
                    (response) => {
                        if (response.data.length > 0) {
                            this.permissionRequests = response.data;
                        } else {
                            this.permissionRequests = null;
                        }
                    }
                );
            });
        }
    }
};
</script>
