<template>
    <div v-if="sections" class="data-sections">
        <BSDataDeck v-for="(columns,index) in sections" :columns="columns" :data-record="dataRecord" :section="index" :key="['ds',index].join('-')"></BSDataDeck>
    </div>
    <div v-else class="display-4">No section defined</div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters } = createNamespacedHelpers('DATA');
    export default {
        name: "BSData",
        props: ['dataDataId','dataRecordId','dataRecord'],
        computed: {
            ...mapGetters({ getSection:'section' }),
            section(){ return this.getSection(this.dataDataId) },
            sections(){ return _.isEmpty(this.section) ? false : this.getSections() }
        },
        methods: {
            getSections(){
                let rows = [], cols = [], count = 0;
                _.each(this.section,function(secObj){
                    if(count + _.toSafeInteger(secObj.colspan) > 12) { rows.push(cols); cols = []; count = 0; }
                    cols.push(secObj); count += _.toSafeInteger(secObj.colspan);
                });
                if(!_.isEmpty(cols)) rows.push(cols);
                return rows;
            }
        }
    }
</script>