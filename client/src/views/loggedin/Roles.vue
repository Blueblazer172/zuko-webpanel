<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col">
                <header><h3>Verwaltungspanel Rollen</h3></header>
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
                <tr class="userrow" v-for="user in users" :key="user.id" @click="manageUser(user.id)">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.name }}</td>
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
// import UserService from "../../services/user.service";

export default {
    name: "Roles",
    data() {
        return {
            users: null,
        };
    },
    mounted() {
        // UserService.getRoles().then(
        //     (response) => {
        //         this.roles = response.data;
        //     }
        // );
    },
    methods: {
        manageUser(id) {
            return this.$router.push('/role/' + id + '/mgmt');
        }
    }
};
</script>
