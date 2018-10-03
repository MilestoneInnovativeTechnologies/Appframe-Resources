<template>
    <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled:(page === 1) }"><a class="page-link" href="#"><i class="fa fa-lg fa-angle-left"></i></a></li>
        <li class="page-item disabled" v-if="first_start !== 1"><a class="page-link" href="#">...</a></li>
        <li class="page-item" :class="{ active:(page === no) }" v-for="no in first_range"><a class="page-link" href="#">{{ no }}</a></li>
        <li class="page-item disabled" v-if="has_middle_dots"><a class="page-link" href="#">...</a></li>
        <li class="page-item" :class="{ active:(page === no) }" v-if="has_last_range" v-for="no in last_range"><a class="page-link" href="#">{{ no }}</a></li>
        <li class="page-item" :class="{ disabled:(page === pages) }"><a class="page-link" href="#"><i class="fa fa-lg fa-angle-right"></i></a></li>
    </ul>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "AppContentListPagination",
        props: ['idns'],
        data(){ return { first:5, last:3 } },
        computed: {
            list_id(){ return this.idns[0] },
            ...mapGetters('LIST',{ getDetails:'details' }),
            details(){ return this.getDetails(this.list_id) },
            perpage(){ return this.details.items },
            total(){ return this.details.count },
            pages(){ return Math.ceil(parseInt(this.total)/parseInt(this.perpage)) },
            page(){ return 1 },
            first_end_temp(){ return Math.floor(this.first / 2) + this.page },
            first_start(){ let start = (this.first_end_temp - this.first) + 1; return (start < 1) ? 1 : start; },
            first_end(){ let end = this.first_start + this.first - 1; return (end > this.pages) ? this.pages : end; },
            last_start(){ let start = (this.pages - this.last) + 1; return (this.first_end >= start) ? this.first_end + 1 : start;  },
            first_range(){ return _.range(this.first_start,this.first_end+1) },
            last_range(){ return (this.last_start >= this.pages) ? [] : _.range(this.last_start,this.pages + 1) },
            has_last_range(){ return !_.isEmpty(this.last_range); },
            has_middle_dots(){ return (this.last_start - this.first_end) > 1 },
        }
    }
</script>