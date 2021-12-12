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
                <input type="text" class="form-control" id="name" ref="name" :value="user.name">
            </div>
            <div class="col-md-4">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" ref="email" :value="user.email">
            </div>
            <div class="col-md-4">
                <label for="username" class="form-label">Username</label>
                <div class="input-group">
                    <span class="input-group-text" id="usernameInputGroup">@</span>
                    <input type="text" class="form-control" id="username" ref="username" :value="user.username"
                           aria-describedby="usernameInputGroup">
                </div>
            </div>
            <div class="col-md-4 mt-3">
                <label for="password" class="form-label">Passwort</label>
                <input type="password" class="form-control" ref="password" id="password">
            </div>
            <div class="col-md-4 mt-3">
                <label for="rePassword" class="form-label">Passwort erneut</label>
                <input type="password" class="form-control" ref="rePassword" id="rePassword">
            </div>
            <div class="col-12 mt-3">
                <button class="btn btn-primary" @click="updateUser()" type="submit">Aktualisieren</button>
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
    },
    methods: {
        updateUser() {
            let userId = this.$route.params.id;
            let fields = null;

            if ((this.$refs.password.value === this.$refs.rePassword.value) &&
                (this.$refs.password.value !== '' || this.$refs.rePassword.value !== ''))
            {
                fields = {...fields, password: this.$refs.password.value}
            }

            if (this.$refs.name.value !== this.user.name) {
                fields = {...fields, name: this.$refs.name.value}
            }

            if (this.$refs.username.value !== this.user.username) {
                fields = {...fields, username: this.$refs.username.value}
            }

            if (this.$refs.email.value !== this.user.email) {
                fields = {...fields, email: this.$refs.email.value}
            }

            if (fields !== null) {
                UserService.updateUser(userId, fields);
            }
        }
    }
};
</script>
