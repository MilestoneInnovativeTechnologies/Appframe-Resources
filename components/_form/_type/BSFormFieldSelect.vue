<template>
    <select data-toggle="select2" :name="name" v-model="value" class="custom-select" :id="control_id">
        <option v-for="(label,value) in options" :value="value" :key="['SO',dataFormId,name,value].join('-')">{{ label }}</option>
    </select>
</template>

<script>
    import { mapGetters,mapMutations,mapActions } from 'vuex';
    export default {
        name: "BSFormFieldSelect",
        props:['dataFormId','name','id'],
        mixins: [require('./../../../js/common/BSFormFieldValueMixin').fieldValueMixin,require('./../../../js/common/BSFormFieldDependMixin').fieldDependMixin],
        computed: {
            ...mapGetters('FORM',{ getOption:'option' }),
            ...mapGetters('FOPT',{ getOptions:'get',getLatest:'latest' }),
            option(){ return this.getOption(this.dataFormId,this.name); },
            option_id(){ return this.option ? this.option.id : null },
            options(){ return this.getOptions(this.option_id); },
            control_id(){ return [this.name,this.dataFormId,this.id].join('_') },
        },
        methods: {
            ...mapActions('FOPT',{ fetchOptions:'fetch' }), ...mapMutations('FORM',['updateDefaultData']),
            initSelect2(){
                return;
                let vm = this, options = { minimumResultsForSearch: 12, allowClear: true, placeholder: '' },
                    value = vm.value || ((this.option.type === 'Enum' && this.options) ? _.head(_.keys(this.options)) : (_.has(vm.$attrs,'multiple') ? [] : null)),
                    select2 = $(`select#${this.control_id}`);
                if(!select2.hasClass("select2-hidden-accessible")){
                    select2
                        .select2(options)
                        .on('select2:select',function(e){ vm.value = e.params.data.id; })
                        .on('select2:unselect',function(e){ vm.unvalue = e.params.data.id; });
                    if(!_.isEmpty(value)) select2.val(value).trigger('change');
                }
            }
        },
        created(){
            if(!$('script[name="select2"]').length) $('head:first').append([$('<script>').attr({ name:'select2',src:this.asset_root+'js/select2.min.js' }),$('<link>').attr({ name:'select2',rel:'stylesheet',href:this.asset_root+'css/select2.min.css' })]);
            if(this.option.preload === 'Yes' && (!this.options || this.option.type !== 'Enum')) this.fetchOptions({ id:this.option_id,latest:this.getLatest(this.option_id) });
        },
        beforeDestroy () {
            let select2 = $(`select#${this.control_id}`);
            if(select2.hasClass("select2-hidden-accessible")) { try { select2.select2('destroy'); } catch(e){ } }
        },
        mounted(){
            this.initSelect2();
        },
        watch: {
            options(options){
                if(this.option.type === 'Enum' && _.isEmpty(this.value)) { this.value = _.head(_.keys(options)); this.updateDefaultData({ form:this.dataFormId,field:this.name,value:this.value }) }
                else if(!_.isEmpty(this.value)) $(`select#${this.control_id}`).val(this.value).trigger('change');
                if(this.depends_has) this.initSelect2();
            }
        }
    }
</script>
