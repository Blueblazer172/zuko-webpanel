<template>
    <div class="container mt-3">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
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
        };
    },
    mounted() {
        UserService.getUserBoard().then(
            (response) => {
                this.content = response.data;
            }
        );
    },
};
</script>
