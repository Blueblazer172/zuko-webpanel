<template>
    <div class="container mt-3" v-if="user">
        <div class="row">
            <div class="col">
                <header>
                    <h3>User Rollenzuweisung für
                        <span class="badge-secondary">&nbsp;{{user.email }}&nbsp;</span>
                    </h3>
                </header>
            </div>
        </div>
        <form class="row g-3">
            <div class="col-md-4" v-if="roles">
                <label for="roles" class="form-label">Rollen</label>
                <div class="form-group">
                    <select multiple class="form-control" id="roles" v-for="role in roles" :key="role.id">
                        <option>{{ role.name }}</option>
                    </select>
                </div>
            </div>
            <div v-else class="col-md-4">Keine Rollen angelegt. <a href="">Hier anlegen</a></div>
            <div class="col-12 mt-3" v-if="rooms || roles">
                <button class="btn btn-primary" type="submit">Aktualisieren</button>
            </div>
        </form>
    </div>
</template>

<script>
import UserService from "../../services/user.service";

export default {
    name: "UserManagement",
    data() {
        return {
            user: null,
            rooms: null,
            roles: null,
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
