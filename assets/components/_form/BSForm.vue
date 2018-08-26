<template>
    <div class="card w-75">
        <div v-show="submitting" :style="{ opacity:0.5 }" style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: #F5F5F5; opacity: 0; z-index: 100; transition: opacity 0.2s linear"></div>
        <div class="card-body">
            <form :name="name">
                <BSFormField v-for="(props,fieldName) in fields" :key="[name,fieldName].join('-')" v-bind="props" :data-form-name="name" :data-form-id="dataFormId"></BSFormField>
            </form>
            <div class="card-title clearfix">
                <div class="float-right">
                    <BTN @click="submit">{{ dataActionText }}</BTN>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapActions } = createNamespacedHelpers('FORM');
    export default {
        name: "BSForm",
        props: ['name','fields','dataFormId','dataActionText'],
        computed: {
            submitting(){ return this.$store.state.FORM.submitting[this.dataFormId] },
        },
        methods: {
            ...mapActions({ formSubmit:'submit' }),
            submit(){
                let vm = this, payload = { form:vm.dataFormId };
                vm.formSubmit(payload);
            }
        }
    }
</script>