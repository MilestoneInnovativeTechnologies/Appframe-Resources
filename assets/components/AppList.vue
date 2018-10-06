<template>
    <transition name="fade">
        <ListLoading v-if="!data"></ListLoading>
        <BSList v-else :data-list-id="id" :layout="layout" :data="data"></BSList>
    </transition>
</template>

<script>
    import { mapActions,mapGetters,mapState } from 'vuex';
    export default {
        name: "AppList",
        props: ['dataIds'],
        mixins: [require('./../js/common/ListDefaultLayoutMixin').listDefaultLayoutMixin],
        computed: {
            id(){ return this.dataIds['idn1'] },
            ...mapGetters('LIST',{ getList:'list',getLayout:'layout' }), ...mapGetters('PGNT',{ getDetails:'list',getItems:'items' }), ...mapState('PGNT',[ 'page' ]),
            list(){ return this.getList(this.id) }, items(){ return this.getItems(this.id) },
            pagination(){ return { ...(this.getDetails(this.id)),page:this.page } },
            fetchable(){ return _.difference(_.map(this.items,_.toString),_.keys(this.list)) },
            data(){ return _.pick(this.list,this.items) },
            layout(){ return this.getLayout(this.id) || this.defaultLayout(this.data) },
            action(){ return this.$route.params.action },
        },
        methods: {
            ...mapActions('LIST',{ updateList: 'update',post: 'post' }),
        },
        created(){
            this.updateList(this.action);
        },
        watch: {
            page(page){ this.post({ action:this.action,page }) },
            fetchable(get){ if(!_.isEmpty(get)) this.post({ action:this.action,get }) }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>