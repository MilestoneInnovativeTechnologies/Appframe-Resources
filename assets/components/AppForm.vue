<template>
    <transition name="fade">
        <FormLoading v-if="!form"></FormLoading>
        <BSForm v-else :name="form.name" :fields="form.fields" :data-form-id="formId"></BSForm>
    </transition>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('FORM');
    export default {
        name: "AppForm",
        computed: mapGetters(['form','formId']),
        methods: {
            ...mapActions(['setComponent','getForm']),
            initForm(){ this.$store.commit('setPageTitle',this.form.title) }
        },
        created(){
            this.setComponent();
            if(!this.form) this.getForm();
            else this.initForm();
        },
        updated(){
            if(this.form) this.initForm();
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>