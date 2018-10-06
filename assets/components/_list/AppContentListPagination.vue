<template>
    <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled:(page === 1) }"><a class="page-link" href="#" @click.prevent="goToPreviousPage()"><i class="fa fa-lg fa-angle-left"></i></a></li>
        <li class="page-item" :class="{ active:(page === no),disabled:(no === cont) }" v-for="no in range"><a class="page-link" href="#" @click.prevent="goToPage(no)">{{ no }}</a></li>
        <li class="page-item" :class="{ disabled:(page === pages) }"><a class="page-link" href="#" @click.prevent="goToNextPage()"><i class="fa fa-lg fa-angle-right"></i></a></li>
    </ul>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState,mapGetters,mapMutations } = createNamespacedHelpers('PGNT');
    export default {
        name: "AppContentListPagination",
        props: ['idns'],
        computed: {
            ...mapState(['first','last','cont']),
            page: {
                ...mapState({ get:state => state.page }),
                set(page){ this.setPage(page) }
            },
            list_id(){ return this.idns[0] },
            ...mapGetters({ getRange:'range' }),
            range(){ return this.getRange(this.list_id) },
            pages(){ return _.last(this.range) }
        },
        methods: {
            ...mapMutations([ 'setPage' ]),
            goToPage(page){ this.page = page },
            goToPreviousPage(){ this.page-- },
            goToNextPage(){ this.page++ },
        },
        created(){
            this.page = 1;
        }
    }
</script>