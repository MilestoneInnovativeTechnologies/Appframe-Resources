<template>
    <tr @click="clicked">
        <td><BSListSelectRadio :data-list-id="dataListId" :data-record-id="dataRecordId"></BSListSelectRadio></td>
        <td v-for="(path,key) in columns" :key="['L'+dataListId,'R'+dataRecordId,key].join('-')">{{ data(path) }}</td>
    </tr>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: "BSListTBodyTR",
        props: ['columns','record','dataListId','dataRecordId'],
        methods: {
            data(path){ return _.get(this.record,path) },
            ...mapMutations('LIST',['setSelected']),
            clicked(){ this.setSelected({ list:this.dataListId, record:this.dataRecordId }); this.$el.getElementsByTagName('input')[0].checked = true; }
        }
    }
</script>