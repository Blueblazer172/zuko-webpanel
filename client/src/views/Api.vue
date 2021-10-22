<template>
    <div>
        <p>Test Zugriff Server</p>
        <button @click="getFromApiEndpoint">Get some Data from Server</button>
        <p v-if="text">{{ text }}</p>
        <p v-if="status">Http-Status: {{ status }}</p>
    </div>
</template>
<script>
export default {
    name: 'Api',
    data() {
        return {
            text: null,
            status:null
        }
    },
    methods: {
        async getFromApiEndpoint() {
            await this.$http.get('http://localhost:3000/api').then((res) => {
                this.text = res.data
                this.status = res.status
            })
        }
    }
}
</script>
