<template>
    <select :name="name" v-model="value" class="custom-select">
        <option v-for="(label,value) in options" :value="value" :key="['SO',dataFormId,name,value].join('-')">{{ label }}</option>
    </select>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: "BSFormFieldSelect",
        props:['dataFormId','name'],
        mixins: [require('./../../../js/common/BSFormFieldValueMixin').fieldValueMixin],
        computed: {
            ...mapGetters('FORM',{ getOption:'option' }),
            ...mapGetters('FOPT',{ getOptions:'get' }),
            option(){ return this.getOption(this.dataFormId,this.name); },
            option_id(){ return this.option ? this.option.id : null },
            options(){ return this.getOptions(this.option_id); },
        },
        methods: {
            ...mapActions('FOPT',{ fetchOptions:'fetch' }),
        },
        created(){
            if(!this.options || this.option.type !== 'Enum') this.fetchOptions(this.option_id);
        },
        mounted(){
            let vm = this;
            $(`select[name="${this.name}"]`)
                .select2({ minimumResultsForSearch: 12 })
                .on('select2:select',function(e){
                    vm.value = e.params.data.id;
                })
        },
    }
</script>