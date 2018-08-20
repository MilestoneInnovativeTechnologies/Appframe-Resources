<template>
    <div class="appcontent"><component :is="component"></component></div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('CONT');
    export default {
        name: "AppContent",
        beforeRouteUpdate(to,from,next){ this.setRequests({ to,from }); next(); },
        beforeRouteEnter(to,from,next){ next(vm => vm.setRequests({ to,from })); },
        computed: {
            ...mapGetters(['type','component']),
        },
        methods: mapActions(['setRequests']),
    }
</script>

<style scoped>
    .appcontent-enter-active, .appcontent-leave-active { transition: all 0.4s linear; }
    .appcontent-leave-active { position: absolute; left: 32px; right: 32px; }
    .appcontent-enter { transform: scale(1.1,1.1); opacity: 0; }
    .appcontent-leave, .appcontent-enter-to { transform: scale(1,1); opacity: 1; }
    .appcontent-leave-to { transform: scale(0,0); opacity: 0; }
</style>