<template>
    <h1 class="page-title mr-sm-auto"> {{ title }} </h1>
</template>

<script>
    import { mapGetters,mapMutations } from 'vuex';
    export default {
        name: "AppPageTitle",
        computed: {
            action(){ return this.$route.params.action },
            id(){ return this.$route.params.id },
            ...mapGetters('PTTL',{ getTitle:'title' }),
            title(){ let title = this.getTitle(this.action,this.id); this.setTitle(title); return title; },
        },
        methods: {
            ...mapMutations('PTTL',['setTitle']),
        }
    }
</script>

<style scoped>
    .pagetitle-enter-active, .pagetitle-leave-active { transition: all 0.2s linear; }
    .pagetitle-leave-active { position: absolute; }
    .pagetitle-enter { transform: translateX(1rem); opacity: 0; }
    .pagetitle-leave, .pagetitle-enter-to { transform: translateX(0); opacity: 1; }
    .pagetitle-leave-to { transform: translateX(-3rem); opacity: 0;}
</style>