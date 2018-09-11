<template>
    <h1 class="page-title mr-sm-auto"> {{ title }} </h1>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "AppPageTitle",
        computed: mapState('PAGE',{
            title: state => state.title
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