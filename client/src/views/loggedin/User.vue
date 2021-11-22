<template>
    <div class="container mt-3" v-if="user">
        <div class="row">
            <div class="col">
                <header><h3>Profil aktualisieren</h3></header>
            </div>
        </div>
        <form class="row g-3">
            <div class="col-md-4">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" :value="user.name">
            </div>
            <div class="col-md-4">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" :value="user.email">
            </div>
            <div class="col-md-4">
                <label for="username" class="form-label">Username</label>
                <div class="input-group">
                    <span class="input-group-text" id="usernameInputGroup">@</span>
                    <input type="text" class="form-control" id="username" :value="user.username"
                           aria-describedby="usernameInputGroup">
                </div>
            </div>
            <div class="col-md-4 mt-3">
                <label for="email" class="form-label">Passwort</label>
                <input type="text" class="form-control" id="password">
            </div>
            <div class="col-md-4 mt-3">
                <label for="rePassword" class="form-label">Passwort erneut</label>
                <input type="text" class="form-control" id="rePassword">
            </div>
            <div class="col-12 mt-3">
                <button class="btn btn-primary" type="submit">Aktualisieren</button>
            </div>
        </form>
    </div>
</template>

<script>
import UserService from "../../services/user.service";

export default {
    name: "User",
    data() {
        return {
            user: null,
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

        UserService.getUserInformation(this.$route.params.id).then(
            (response) => {
                this.user = response.data;
            }
        );
    }
};
</script>
