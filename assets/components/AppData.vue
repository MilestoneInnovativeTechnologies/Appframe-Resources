<template>
    <BSData v-if="record" :data-data-id="data" :data-record-id="id" :data-record="record"></BSData>
    <DataLoading v-else></DataLoading>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('DATA');
    export default {
        name: "AppData",
        props: ['dataIds'],
        computed: {
            data(){ return this.dataIds['idn1'] },
            ...mapGetters({ getRecord: 'record' }),
            id(){ return this.$route.params.id },
            action(){ return this.$route.params.action },
            record(){ return this.getRecord(this.data,this.id) }
        },
        methods: {
            ...mapActions(['update','fetch']),
        },
        created(){
            let request = { data:this.data,id:this.id,action:this.action };
            this[this.record ? 'update' : 'fetch'](request);
        }
    }
</script>