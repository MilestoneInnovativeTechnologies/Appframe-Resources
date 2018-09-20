<template>
    <tr @click="clicked" style="cursor: pointer">
        <td style="width: 39px"><BSListSelectRadio :data-list-id="dataListId" :data-record-id="dataRecordId"></BSListSelectRadio></td>
        <td v-for="(pathProps,key) in columns" :key="['L'+dataListId,'R'+dataRecordId,key].join('-')">{{ data(pathProps) }}</td>
    </tr>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: "BSListTBodyTR",
        props: ['columns','record','dataListId','dataRecordId'],
        methods: {
            data(pathProps){ return (pathProps.path) ? this.dataFromPath(pathProps.path,pathProps.field): _.get(this.record,pathProps.field); },
            dataFromPath(path,field){ let initData = _.get(this.record,path); return (_.isArray(initData)) ? _.map(initData,field).join(', ') : _.get(initData,field); },
            ...mapMutations('LIST',['setSelected']),
            clicked(){ this.setSelected({ list:this.dataListId, record:this.dataRecordId }); this.$el.getElementsByTagName('input')[0].checked = true; }
        }
    }
</script>