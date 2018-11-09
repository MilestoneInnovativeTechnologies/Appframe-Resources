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
        mixins: [require('./../../../js/common/BSFormFieldValueMixin').fieldValueMixin,require('./../../../js/common/BSFormFieldDependMixin').fieldDependMixin],
        computed: {
            ...mapGetters('FORM',{ getOption:'option' }),
            ...mapGetters('FOPT',{ getOptions:'get',getLatest:'latest' }),
            option(){ return this.getOption(this.dataFormId,this.name); },
            option_id(){ return this.option ? this.option.id : null },
            options(){ return this.getOptions(this.option_id); },
        },
        methods: {
            ...mapActions('FOPT',{ fetchOptions:'fetch' }),
            initSelect2(){
                let vm = this, options = { minimumResultsForSearch: 12, allowClear: true, placeholder: '' },
                    value = vm.value || ((this.option.type === 'Enum' && this.options) ? _.head(_.keys(this.options)) : null),
                    select2 = $(`select[name="${vm.name}"]`), S2Width = null;
                options.value = value;
                if(select2.hasClass("select2-hidden-accessible")) { S2Width = select2.next().css('width'); try { select2.select2('destroy'); } catch(e){} }
                select2
                    .select2(options)
                    .on('select2:select',function(e){ vm.value = e.params.data.id; })
                    .on('select2:unselect',function(e){ vm.unvalue = e.params.data.id; });
                if(S2Width) select2.next().css('width',S2Width);
            }
        },
        created(){
            if(this.option.preload === 'Yes' && (!this.options || this.option.type !== 'Enum')) this.fetchOptions({ id:this.option_id,latest:this.getLatest(this.option_id) });
        },
        mounted(){
            this.initSelect2();
        },
        watch: {
            options(options){ if(this.option.type === 'Enum' && _.isEmpty(this.value)) this.value = _.head(_.keys(options)); if(this.depends_has) this.initSelect2(); }
        }
    }
</script>
