<template>
    <div>
        this is home Page

        {{ routes }}
    </div>
</template>

<script>
export default {
    setup() {},

    data() {
        return {}
    },
    computed: {
        routes() {
            return this.$store.state.routes.routes
        }
    }
}
</script>
