<template>
    <component :is="component" :class="cls" :data-form-id="dataFormId" :name="name" v-bind="props"></component>
</template>

<script>
    export default {
        name: "BSFormFieldControl",
        inheritAttrs: false,
        props: {
            type: { default:'text' },
            name: null, form: null,
            invalid: { default: null }, size: null,
            dataFormId: false,
        },
        data(){
            return {
                componentPrefix: 'BSFormField',
                textComponentTypes: ['text','number','email','password'],
                allControlAttrs: ['disabled','readonly','required'],
                forwardProps: ['parent','depends'],
            }
        },
        computed: {
            compType(){ return _.indexOf(this.textComponentTypes,this.type) > -1 ? 'text' : this.type },
            component(){ return this.componentPrefix + _.capitalize(_.camelCase(this.compType)) },
            group(){ return this.prepend || this.append },
            cls(){
                let cls = {};
                if(this.invalid) cls['is-invalid'] = true;
                if(this.size) cls['form-control-'+this.size] = true;
                return cls;
            },
            props(){
                let vm = this, props = { };
                _.forEach(vm.allControlAttrs,(v) => { if(vm.$attrs.hasOwnProperty(v)) props[v] = v; } );
                _.forEach(vm.forwardProps,(v) => { if(vm.$attrs.hasOwnProperty(v)) props[v] = vm.$attrs[v]; } );
                if(_.includes(vm.textComponentTypes,this.type)) props['type'] = this.type;
                return props;
            }
        }
    }
</script>