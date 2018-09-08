<template>
    <div v-if="sections" class="data-sections">
        <BSDataSection v-for="(sec,index) in sections" v-bind="sec" :data-record="dataRecord" :key="['ds',index].join('-')"></BSDataSection>
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
                let rows = [], cols = new Object({}), count = 0;
                _.each(this.section,function(secObj){
                    if(count + _.toSafeInteger(secObj.colspan) > 12) { rows.push(cols); cols = new Object({}); count = 0; }
                    cols = Object.assign({},cols,secObj); count += _.toSafeInteger(secObj.colspan);
                });
                if(!_.isEmpty(cols)) rows.push(cols);
                return rows;
            }
        }
    }
</script>