<template>
  <div>
      <p>Test Zugriff Server</p>
      <button @click="getFromApiEndpoint">Get some Data</button>
  </div>
</template>
<script>
export default {
    name: 'Api',
    methods: {
        async getFromApiEndpoint() {
            let lel = await this.$http.get('http://localhost:3000/api')
            console.log(lel)
        }
    }
}
</script>
