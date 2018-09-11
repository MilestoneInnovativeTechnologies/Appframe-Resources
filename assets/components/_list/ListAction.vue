<template>
    <BTN :disabled="disabled" class="ml-1" :icon="icon" :type="type" size="xs" @click="clicked">{{ title }}</BTN>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('LIST');
    export default {
        name: "ListAction",
        props: ['listId','id','type','icon','title','confirm'],
        computed: {
            ...mapGetters({ getSelected:'selected' }),
            selected(){ return this.getSelected(this.listId) },
            disabled(){ return this.selected ? false : 'disabled'; },
        },
        methods: {
            ...mapActions(['action']),
            clicked(){ return this.confirm ? this.warn(this.confirm) : this.clickGo(); },
            clickGo(){ let payload = { action:this.id,id:this.selected,list:this.listId }; this.action(payload); },
            warn(msg){
                let btnActn = this.clickGo;
                $('#ListWarningModal').on('show.bs.modal',function(){
                    let modal = $(this);
                    modal.find('.warning-msg').text(msg);
                    modal.find('#WarningDismiss').click(function(){ btnActn(); modal.modal('hide') });
                }).modal('show') }
        }
    }
</script>