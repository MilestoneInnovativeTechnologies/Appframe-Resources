<template>
    <BTN size="xs" :type="type" :disabled="!selectedList" :icon="icon" class="ml-1" @click="clicked">{{ title }}</BTN>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('LIST');
    export default {
        name: "ListAction",
        props: ['dataListId','dataAction','type','icon','title','confirm','on'],
        computed: {
            ...mapGetters(['selected','list']),
            selectedList(){ return this.selected(this.dataListId) },
            record(){ return this.list(this.dataListId)[this.selectedList] }
        },
        methods: {
            ...mapActions(['action']),
            clicked(){ this.action({ action:this.dataAction,id:this.record.id }) }
        }
    }
</script>