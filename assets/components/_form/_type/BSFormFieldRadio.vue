<template>
    <div>
        <div class="form-check" v-for="opt in options" :key="[dataFormId,name,opt.id].join('-')">
            <input class="form-check-input" type="radio" :name="name" v-model="value" :value="getOptionValue(opt)" :id="['radio',dataFormId,name,opt.id].join('-')">
            <label class="form-check-label" :for="['radio',dataFormId,name,opt.id].join('-')">{{ getOptionLabel(opt) }}</label>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('FORM');
    export default {
        name: "BSFormFieldRadio",
        mixins: [require('./../../../js/common/BSFormFieldValueMixin').fieldValueMixin],
        props:['dataFormId','name'],
        inheritAttrs: false,
        computed: {
            ...mapGetters(['form','list']),
            option(){ return this.form.fields[this.name].options },
            optionPreload(){ return this.option.preload === 'Yes'; },
            options(){ return this.list(this.name) || null },
        },
        methods: {
            ...mapActions(['loadOptions']),
            getOptionValue(option){ return _.get(option,this.option.value_attr); },
            getOptionLabel(option){ return _.get(option,this.option.label_attr); },
        },
        created(){
            if(!this.options && this.optionPreload) this.loadOptions({ field:this.name, form:this.dataFormId })
        }
    }
</script>