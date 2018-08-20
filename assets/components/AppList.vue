<template>
    <transition name="fade">
        <ListLoading v-if="!list"></ListLoading>
        <BSList v-else :data-list-id="listId" :layout="layout" :list="list"></BSList>
    </transition>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('LIST');
    export default {
        name: "AppList",
        computed: {
            ...mapGetters(['listId','list','layout','details']),
        },
        methods: {
            ...mapActions(['setComponent','getList']),
            initList(){ if(this.details && this.details.title) this.$store.commit('setPageTitle',this.details.title) }
        },
        created(){
            this.setComponent();
            this.getList();
            this.initList();
        },
        updated(){
            this.initList();
        }

    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>