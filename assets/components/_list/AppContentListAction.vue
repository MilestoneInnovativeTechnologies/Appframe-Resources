<template>
    <div class="btn-toolbar mt-3">
        <ListAction v-for="actn in contentActions" v-bind="actn" :list-id="id" :key="['list',id,'action',actn.id].join('-')" :confirm="getConfirm(actn.id)"></ListAction>
        <div class="modal modal-alert fade" id="ListWarningModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><h5 class="modal-title"><icon class="text-warning mr-1">bullhorn</icon> Confirm </h5></div>
                    <div class="modal-body"><p class="warning-msg"></p></div>
                    <div class="modal-footer">
                        <button type="button" id="ListWarningDismiss" class="btn btn-warning">Proceed</button>
                        <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "AppContentListAction",
        props: ['idns'],
        computed: {
            id(){ return this.idns[0] },
            ...mapGetters('ACTN',{ getActions:'actions',getConfirm:'confirm' }),
            contentActions(){ return this.getActions('List',this.id) },
        }
    }
</script>