<template>
    <div class="col-md-12 mt-3">
        <Form @submit="handleRegister">
            <div>
                <div class="form-group">
                    <label>Name</label>
                    <Field name="name" ref="name" type="text" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Username</label>
                    <Field name="username" ref="username" type="text" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <Field name="email" ref="email" type="email" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Passwort</label>
                    <Field name="password" ref="password" type="password" class="form-control"/>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">
                        Sign Up
                    </button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import {Form, Field} from "vee-validate";

export default {
    name: 'Register',
    components: {
        Field,
        Form
    },
    methods: {
        handleRegister(user) {
            this.$store.dispatch("auth/register", user)
                .then(() => {this.$router.push("/login");});
        },
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    }
}
</script>
