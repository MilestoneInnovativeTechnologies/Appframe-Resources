<template>
    <transition name="fade">
        <AppForm v-if="record" :data-ids="dataIds"></AppForm>
        <FormLoading v-else></FormLoading>
    </transition>
</template>

<script>
    import { mapGetters,mapMutations,mapActions } from 'vuex'
    export default {
        name: "AppFormWithData",
        props: ['dataIds'],
        computed: {
            formId(){ return this.dataIds['idn1'] },
            dataId(){ return this.dataIds['idn2'] },
            recordId(){ return this.$route.params.id },
            action(){ return this.$route.params.action },
            ...mapGetters('FORM',{ getForm: 'form' }),
            fields(){ return _.keys(this.getForm(this.formId).fields) },
            ...mapGetters('DATA',{ getRecord: 'record', getUpdated: 'updated' }),
            record(){ return this.getRecord(this.dataId,this.recordId) },
            updated(){ return this.getUpdated(this.dataId,this.recordId) },
        },
        methods: {
            ...mapMutations('FORM',{ setValue: 'updateValue' }),
            ...mapActions(['post']),
            setFormValue(data){
                let vm = this, form = vm.formId; _.forEach(vm.fields,function(field){
                    let value = _.get(data,field); vm.setValue({ form,field,value });
                });
            }
        },
        created(){
            let request = { data:this.dataId,id:this.recordId,action:this.action };
            if(this.record){ this.setFormValue(this.record); request['last_updated'] = this.updated; this.post(request); }
            else this.post(request);
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>