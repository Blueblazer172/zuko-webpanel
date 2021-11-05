<template>
    <div class="col-md-12 mt-3">
        <Form @submit="login">
            <div class="form-group">
                <label>Username</label>
                <Field name="username" type="text" class="form-control" :rules="isRequired"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <Field name="password" type="password" class="form-control" :rules="isRequired"/>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">
                    <span>Login</span>
                </button>
            </div>
        </Form>
    </div>
</template>
<script>
import {Field, Form} from 'vee-validate';
export default {
    name: 'Login',
    components: {
        Form,
        Field
    },
    methods: {
        login(user) {
            this.$store.dispatch("auth/login", user)
                .then(() => this.$router.push("/profile"));
        },
        isRequired(value) {
            return value ? true : 'This field is required';
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    }
}
</script>
