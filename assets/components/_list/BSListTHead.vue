<template>
    <thead class="thead-light"><tr><th>&nbsp;</th><th v-for="(head,key) in layout" :key="['T'+dataListId,key].join('-')">{{ head }}</th></tr></thead>
</template>

<script>
    export default {
        name: "BSListTHead",
        props: ['layout','dataListId']
    }
</script>