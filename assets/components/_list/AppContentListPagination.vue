<template>
    <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled:(page === 1) }"><a class="page-link" href="#" @click.prevent="goToPreviousPage()"><i class="fa fa-lg fa-angle-left"></i></a></li>
        <li class="page-item" :class="{ active:(page === no),disabled:(no === cont) }" v-for="no in range"><a class="page-link" href="#" @click.prevent="goToPage(no)">{{ no }}</a></li>
        <li class="page-item" :class="{ disabled:(page === pages) }"><a class="page-link" href="#" @click.prevent="goToNextPage()"><i class="fa fa-lg fa-angle-right"></i></a></li>
    </ul>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState,mapGetters,mapMutations,mapActions } = createNamespacedHelpers('PGNT');
    export default {
        name: "AppContentListPagination",
        props: ['idns'],
        computed: {
            ...mapState(['first','last','cont']),
            page: {
                ...mapState({ get:state => state.page }),
                set(page){ this.setPage(page); this.loadPageItems(page) }
            },
            list_id(){ return this.idns[0] },
            action(){ return this.$route.params.action },
            ...mapGetters({ getRange:'range' }),
            range(){ return this.getRange(this.list_id) },
            pages(){ return _.last(this.range) }
        },
        methods: {
            ...mapMutations([ 'setPage' ]), ...mapActions([ 'post' ]),
            goToPage(page){ this.page = page },
            goToPreviousPage(){ this.page-- }, goToNextPage(){ this.page++ },
            loadPageItems(page){ this.post({ action:this.action,page }) }
        },
        created(){
            this.setPage(1)
        }
    }
</script>