<template>
    <tbody>
        <tr v-if="data.length === 0"><th :colspan="columns.length+1">
            <div class="jumbotron text-center text-info bg-transparent">No Data</div>
        </th></tr>
        <MRListTBodyTR v-else v-for="(record,id) in data"
                       :data-list-id="dataListId"
                       :data-record-id="id"
                       :record="record"
                       :columns="columns"
                       :check="check"
                       :key="['L'+dataListId,'R'+id,record.updated_at].join('-')">
        </MRListTBodyTR>
    </tbody>
</template>

<script>
    export default {
        name: "MRListTBody",
        props: ['data','columns','dataListId','check'],
    }
</script>