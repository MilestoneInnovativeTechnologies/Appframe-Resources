<template>
    <BTN size="xs" :type="type" :icon="icon" class="ml-1">{{ title }} - {{ listSelected }}</BTN>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters } = createNamespacedHelpers('LIST');
    export default {
        name: "ListAction",
        props: ['dataListId','type','icon','title','confirm','on'],
        computed: {
            ...mapGetters(['selected','list']),
            listSelected(){ return this.selected(this.dataListId) },
            record(){ return this.list(this.dataListId)[this.listSelected] }
        }
    }
</script>