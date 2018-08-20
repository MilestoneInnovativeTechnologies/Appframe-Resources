<template>
    <div :class="cls">
        <BSFormFieldLabel v-bind="props"></BSFormFieldLabel>
        <div v-if="inline" :class="cntCls">
            <component :is="cntComponent" :invalid="invalid" v-bind="props"></component>
            <BSFormFieldInvalidInfo v-if="invalid && cntComponent === 'BSFormFieldControl'" :invalid="invalid"></BSFormFieldInvalidInfo>
        </div><div v-else>
            <component :is="cntComponent" :invalid="invalid" v-bind="props"></component>
            <BSFormFieldInvalidInfo v-if="invalid && cntComponent === 'BSFormFieldControl'" :invalid="invalid"></BSFormFieldInvalidInfo>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BSFormField",
        inheritAttrs: false,
        props: {
            inline: { default: false },
            //invalid: null,
            prepend: { default: false }, append: { default: false },
            prependIcon: { default: false }, appendIcon: { default: false },
        },
        computed: {
            cls(){ return { 'form-group':true, row:this.inline }; },
            cntCls(){ return ['col-md-' + (12 - _.toSafeInteger(this.inline))] },
            inputGroup(){ return this.prepend || this.append || this.prependIcon || this.appendIcon },
            cntComponent(){ return (this.inputGroup) ? 'BSFormFieldInputGroup' : 'BSFormFieldControl' },
            props(){ return _.merge({},this.$attrs,this.$props); },
            invalid(){ return this.$store.getters['FORM/invalid'](this.props['data-form-id'],this.props.name) }
        }
    }
</script>