<template>
    <select :name="name" v-model="value" class="custom-select">
        <option v-for="opt in options" :value="getOptionValue(opt)" v-bind="getOptionAttrs(opt)" :key="[dataFormId,name,opt.id].join('-')">{{ getOptionLabel(opt) }}</option>
    </select>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('FORM');
    export default {
        name: "BSFormFieldSelect",
        props:['dataFormId','name'],
        mixins: [require('./../../../js/common/BSFormFieldValueMixin').fieldValueMixin],
        computed: {
            ...mapGetters(['form','list']),
            option(){ return this.form.fields[this.name].options },
            optionPreload(){ return this.option.preload === 'Yes'; },
            options(){ return this.list(this.name) || null },
        },
        methods: {
            ...mapActions(['loadOptions']),
            getOptionValue(option){ return _.get(option,this.option.value_attr); },
            getOptionAttrs(option){ return {}; },
            getOptionLabel(option){ return _.get(option,this.option.label_attr); },
        },
        created(){
            if(!this.options && this.optionPreload) this.loadOptions({ field:this.name, form:this.dataFormId })
        },
    }
</script>