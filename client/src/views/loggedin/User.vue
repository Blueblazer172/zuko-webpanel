<template>
    <div class="container mt-3">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
            <div>
                <ul v-for="(logData, index) in logs" :key="index">
                    <li>Log {{ index }}</li>
                    <ul>
                        <li>Created: {{ logData['created'] }}</li>
                        <li>Room: {{ logData['roomName'] }}</li>
                    </ul>
                </ul>
            </div>
        </header>
    </div>
</template>

<script>
import UserService from "../../services/user.service";

export default {
    name: "User",
    data() {
        return {
            content: "",
            logs: null,
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

        UserService.getUserBoard().then(
            (response) => {
                this.content = response.data;
            }
        );

        UserService.getLogs(this.currentUser.id).then(
            (response) => {
                this.logs = response.data;
            }
        );
    }
};
</script>
