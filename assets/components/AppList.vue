<template>
    <transition name="fade">
        <ListLoading v-if="!data"></ListLoading>
        <BSList v-else :data-list-id="id" :layout="layout" :data="data"></BSList>
    </transition>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapActions,mapGetters } = createNamespacedHelpers('LIST');
    export default {
        name: "AppList",
        props: ['dataIds'],
        mixins: [require('./../js/common/ListDefaultLayoutMixin').listDefaultLayoutMixin],
        computed: {
            id(){ return this.dataIds['idn1'] },
            ...mapGetters({ getList:'list',getLayout:'layout' }),
            data(){ return this.getList(this.id) },
            layout(){ return this.getLayout(this.id) || this.defaultLayout(this.data) },
            action(){ return this.$route.params.action },
        },
        methods: {
            ...mapActions({ updateList: 'update' }),
        },
        created(){
            this.updateList(this.action);
        },
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>