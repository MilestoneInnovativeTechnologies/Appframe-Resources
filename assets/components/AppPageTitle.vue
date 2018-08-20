<template>
    <h1 class="page-title mr-sm-auto font-weight-bold"> {{ title }} </h1>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "AppPageTitle",
        props: ['Action'],
        computed: mapState({
            title: state => state.page.title
        }),
    }
</script>

<style scoped>
    .pagetitle-enter-active, .pagetitle-leave-active { transition: all 0.2s linear; }
    .pagetitle-leave-active { position: absolute; }
    .pagetitle-enter { transform: translateX(1rem); opacity: 0; }
    .pagetitle-leave, .pagetitle-enter-to { transform: translateX(0); opacity: 1; }
    .pagetitle-leave-to { transform: translateX(-3rem); opacity: 0;}
</style>