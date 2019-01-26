<template>
    <FABModal v-if="modal"></FABModal>
    <BTN class="btn-floated" icon="plus" v-else @click="btnclk"></BTN>
</template>

<script>
    export default {
        name: "FAB",
        data(){ return {
            modal: false
        }},
        methods:{
            btnclk(){ this.modal = !this.modal }
        },
        watch:{
            modal(status){ Vue.nextTick(function(){ $('#FABModal').modal(['hide','show'][_.toInteger(status)]); }); setTimeout((vm) => vm.modal = false,2000,this); }
        }
    }
</script>
