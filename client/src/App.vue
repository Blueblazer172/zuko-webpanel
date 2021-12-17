<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-primary">
            <a href="/" class="navbar-brand">
                <img src="icon.png" width="30" height="30" alt="">
                Zuko
            </a>
            <div class="navbar-nav mr-auto">
                <router-link v-if="!showAdminBoard" v-slot="{href,navigate, isActive}" to="/home" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">Home</NavLink>
                    </li>
                </router-link>
                <router-link v-if="showAdminBoard" v-slot="{href,navigate, isActive}" to="/admin" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">Users</NavLink>
                    </li>
                </router-link>
                <router-link v-if="showAdminBoard" v-slot="{href,navigate, isActive}" to="/roles" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">Rollen</NavLink>
                    </li>
                </router-link>
                <router-link v-if="showAdminBoard" v-slot="{href,navigate, isActive}" to="/rooms" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">Räume</NavLink>
                    </li>
                </router-link>
                <router-link v-if="showAdminBoard" v-slot="{href,navigate, isActive}" to="/requests" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">Anfragen</NavLink>
                    </li>
                </router-link>
            </div>

            <div v-if="!currentUser" class="navbar-nav ml-auto">
                <router-link v-slot="{href,navigate, isActive}" to="/register" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">
                            <font-awesome-icon icon="user-plus"/>
                            Sign Up
                        </NavLink>
                    </li>
                </router-link>
                <router-link v-slot="{href,navigate, isActive}" to="/login" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">
                            <font-awesome-icon icon="sign-in-alt"/>
                            Login
                        </NavLink>
                    </li>
                </router-link>
            </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <router-link v-slot="{href,navigate, isActive}" to="/profile" class="nav-item">
                    <li :class="isActive ? 'nav-link active' : 'nav-link'">
                        <NavLink :href="href" @click="navigate">
                            <font-awesome-icon icon="user"/>
                            {{ currentUser.username }}
                        </NavLink>
                    </li>
                </router-link>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="logOut">
                        <font-awesome-icon icon="sign-out-alt"/>
                        LogOut
                    </a>
                </li>
            </div>
        </nav>

        <div class="container">
            <router-view/>
        </div>
    </div>
</template>
<style scoped>
a:hover {
    color: unset;
    text-decoration: none;
}
</style>
<script>
import {RouterLink} from 'vue-router';

export default {
    props: {
        ...RouterLink.props
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        showAdminBoard() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_ADMIN');
            }

            return false;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
};
</script>
