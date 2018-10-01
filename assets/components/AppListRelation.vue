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
            list(){ return this.dataIds['idn2'] }, relation(){ return this.dataIds['idn1'] },
            record(){ return this.$route.params.id },
            ...mapGetters({ getList:'list',getLayout:'layout',getRelation:'relation' }),
            keys(){ return this.getRelation(this.list,this.relation,this.record) },
            data(){ return _.pick(this.getList(this.list),this.keys) },
            updated(){ return _.isEmpty(this.data) ? 0 : _.max(_.map(this.data,'updated_at')) },
            layout(){ return this.getLayout(this.list) || this.defaultLayout(this.data) },
            action(){ return this.$route.params.action },
        },
        methods: {
            ...mapActions({ updateList: 'post' }),
            defaultLayout(lists){
                return _(_.head(_.values(lists))).pickBy((val) => !(_.isArray(val) || _.isObject())).keys().mapKeys((field) => _.startCase(_.replace(field,/(\W|_)/g,' '))).mapValues((field) => _.zipObject(['field','path'],[field,''])).value();
            },
        },
        created(){
            this.updateList({ action:this.action,id:this.record,updated:this.updated });
        },
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>