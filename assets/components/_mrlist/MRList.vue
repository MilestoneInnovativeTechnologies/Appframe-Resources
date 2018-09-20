<template>
    <transition name="fade">
        <AppContentNotification v-if="notification" icon="bullhorn" title="Update Success" content="Data successfully updated" @click="clearRelationUpdate"></AppContentNotification>
        <div v-else class="card"><div class="card-body"><form>
            <div class="table-responsive">
                <table class="table table-sm mb-0 table-hover">
                    <BSListTHead :columns="Object.keys(layout)" :data-list-id="dataListId"></BSListTHead>
                    <MRListTBody :columns="Object.values(layout)" :data="data" :data-list-id="dataListId" :check="check"></MRListTBody>
                    <MRListTFoot :count="Object.keys(layout).length" v-bind="check"></MRListTFoot>
                </table>
            </div>
        </form></div></div>
    </transition>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
    export default {
        name: "MRList",
        props: ['layout','data','dataListId','check'],
        computed: mapState('LIST',{ notification:(state) => state.relation_update }),
        methods: {
            ...mapMutations('LIST',['delListRelationUpdate']),
            clearRelationUpdate(){ this.delListRelationUpdate() }
        },
        beforeDestroy(){ this.clearRelationUpdate() }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: all 0.6s linear; }
    .fade-leave-active { position: absolute; left: 32px; right: 32px; }
    .fade-enter, .fade-leave-to { opacity: 0; }
    .fade-leave, .fade-enter-to { opacity: 1; }
</style>