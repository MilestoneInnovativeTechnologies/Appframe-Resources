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
             option(){ return _.get(this.getOption(this.dataFormId,this.name),'id') },
             options(){ return this.getOptions(this.option) },
        },
        methods: {
            ...mapActions('FOPT',{ fetchOptions:'fetch' }),
        },
        created(){
            if(!this.options) this.fetchOptions(this.option)
        },
    }
</script>