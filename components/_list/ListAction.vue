<template>
    <BTN :disabled="disabled" class="ml-1" :icon="icon" :type="type" size="xs" @click="clicked">{{ title }}</BTN>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: "ListAction",
        props: ['listId','id','type','icon','title','confirm'],
        computed: {
            ...mapGetters('LIST',{ getSelected:'selected' }),
            selected(){ return this.getSelected(this.listId) },
            disabled(){ return this.selected ? false : 'disabled'; },
        },
        methods: {
            ...mapActions('ACTN',['action']),
            clicked(){ return this.confirm ? this.warn(this.confirm) : this.clickGo(); },
            clickGo(){ let params = { action:this.id,id:this.selected,list:this.listId }; this.action({ name:'list-action',params }); },
            warn(msg){
                let btnActn = this.clickGo;
                $('#ListWarningModal').on('show.bs.modal',function(){
                    let modal = $(this);
                    modal.find('.warning-msg').text(msg);
                    modal.find('#ListWarningDismiss').bind('click',{ btnActn,modal },function({ data }){ data.btnActn(); data.modal.modal('hide') });
                }).modal('show') }
        }
    }
</script>