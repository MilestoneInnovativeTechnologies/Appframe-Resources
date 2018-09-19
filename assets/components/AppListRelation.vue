<template>
    <transition name="fade">
        <ListLoading v-if="!data"></ListLoading>
        <BSList v-else :data-list-id="list" :layout="layout" :data="data"></BSList>
    </transition>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapActions,mapGetters } = createNamespacedHelpers('LIST');
    export default {
        name: "AppListRelation",
        props: ['dataIds'],
        computed: {
            list(){ return this.dataIds['idn2'] },
            record(){ return this.$route.params.id },
            ...mapGetters({ getList:'list',getLayout:'layout',getRelation:'relation' }),
            relation(){ return this.getRelation(this.list,this.record) },
            data(){ return _.pick(this.getList(this.list),this.relation) },
            layout(){ return this.getLayout(this.list) },
            action(){ return this.$route.params.action },
        },
        methods: {
            ...mapActions({ updateList: 'update' }),
        },
        created(){
            //this.updateList(this.action);
        },
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>