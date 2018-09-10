<template>
    <transition name="fade">
        <FormLoading v-if="!form"></FormLoading>
        <BSForm v-else :name="form.name" :fields="form.fields" :layout="layout" :data-form-id="id" :data-action-text="form.action_text"></BSForm>
    </transition>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters } = createNamespacedHelpers('FORM');
    export default {
        name: "AppForm",
        props: ['dataIds'],
        computed: {
            id(){ return this.dataIds['idn1'] },
            ...mapGetters({ getForm:'form',getLayout:'layout' }),
            form(){ return this.getForm(this.id) },
            layout(){ return this.getLayout(this.id) },
        }
    }
</script>