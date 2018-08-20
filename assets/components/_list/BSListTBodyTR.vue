<template>
    <tr>
        <td><BSListSelectRadio :id="id" :record="record"></BSListSelectRadio></td>
        <td v-for="(path,key) in columns" :key="['T'+dataListId,dataRowIndex,key].join('-')">{{ data(path) }}</td>
    </tr>
</template>

<script>
    export default {
        name: "BSListTBodyTR",
        props: ['columns','record','dataListId','dataRowIndex','dataRecordId'],
        computed: {
            id(){ return 'RI'+this.dataRowIndex },
        },
        methods: {
            data(path){ return _.get(this.record,path) },
        }
    }
</script>