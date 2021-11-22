<template>
    <div class="container mt-3">
        <header class="jumbotron">
            <h3>
                <strong>{{currentUser.username}}</strong> Profile
            </h3>
        </header>
        <p>
            <strong>Id:</strong>
            {{currentUser.id}}
        </p>
        <p>
            <strong>Email:</strong>
            {{currentUser.email}}
        </p>
        <strong>Rollen:</strong>
        <ul>
            <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
        </ul>

        <button type="button" class="btn btn-primary" @click="updateProfile(currentUser.id)">Profil Aktualisieren</button>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },
    methods: {
        updateProfile(id) {
            return this.$router.push('/user/' + id);
        }
    }
};
</script>
