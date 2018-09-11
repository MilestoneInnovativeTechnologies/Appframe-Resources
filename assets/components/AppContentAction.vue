<template>
    <div class="btn-toolbar"></div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "AppContentAction",
        computed: {
            action(){ return this.$store.getters.contentAction('AppContent'); },
            resolution(){ return this.$store.getters.resolution(this.action) },
            contentType(){ return this.resolution['type'] },
            contentIdns(){ return _(this.resolution).omit('type').values().value() },
            ...mapGetters('ACTN',{ getActions:'actions' }),
            contentActions(){ return this.getActions(this.contentType,this.contentIdns[0]) },
        }
    }
</script>