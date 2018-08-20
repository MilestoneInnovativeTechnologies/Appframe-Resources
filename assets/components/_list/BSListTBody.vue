<template>
    <tbody>
        <tr v-if="list.length === 0"><th :colspan="columns.length+1">
            <div class="jumbotron text-center text-info bg-transparent">No Data</div>
        </th></tr>
        <BSListTBodyTR v-else v-for="(record,id,index) in list"
                       :data-list-id="dataListId"
                       :data-record-id="id"
                       :data-row-index="index"
                       :record="record"
                       :columns="columns"
                       :key="['T'+dataListId,'TR',id,record.updated_at].join('-')">

        </BSListTBodyTR>
    </tbody>
</template>

<script>
    export default {
        name: "BSListTBody",
        props: ['list','columns','dataListId']
    }
</script>