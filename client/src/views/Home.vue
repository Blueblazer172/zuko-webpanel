<template>
    <div class="container mt-3">
        <header class="jumbotron">
            <p>Zuko Webpanel</p>
            <h3>{{ content }}</h3>
        </header>
    </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
    name: "Home",
    data() {
        return {
            content: "",
        };
    },
    mounted() {
        UserService.getPublicContent().then(
            (response) => {
                this.content = response.data;
            }
        );
    },
};
</script>
