<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col">
                <header><h3>Verwaltungspanel</h3></header>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h4>Name</h4>
            </div>
            <div class="col">
                <h4>Email</h4>
            </div>
            <div class="col">
                <h4>Rolle</h4>
            </div>
            <div class="col">
                <h4>Räume</h4>
            </div>
        </div>
        <div class="row" v-for="user in users" :key="user.id">
            <div class="col">
                <span>{{ user.name }}</span>
            </div>
            <div class="col">
                <span>{{ user.email }}</span>
            </div>
            <div class="col">
                <span>{{ user.roles }}</span>
            </div>
            <div class="col">
                <span>{{ user.rooms }}</span>
            </div>
        </div>
    </div>
</template>

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
        UserService.getUserInformation().then(
            (response) => {
                this.users = response.data;
            }
        );
    },
};
</script>
