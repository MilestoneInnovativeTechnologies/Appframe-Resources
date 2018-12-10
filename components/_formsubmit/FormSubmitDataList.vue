<template>
    <div class="card-body">
        <div class="card-title font-weight-bold">{{ title }}</div>
        <div class="table-responsive"><table class="table table-sm">
            <thead><tr><th v-for="(hd,idx) in heads" :key="['fsd','list','hd',idx].join('-')">{{ hd | read }}</th></tr></thead>
            <tbody><tr v-for="(tr,idx) in data"><td v-for="(hd,idx2) in heads" :key="['fsd','list','bd',idx,idx2].join('-')">{{ content(tr,hd) }}</td></tr></tbody>
        </table></div>
    </div>
</template>

<script>
    export default {
        name: "FormSubmitDataList",
        props: ['title','description'],
        computed: {
            data(){ return this.description; },
            removeHeads(){ return ['created_at','updated_at','pivot'] },
            heads(){ let omit = this.removeHeads; return _.filter(_.keys(_.head(this.data)),function(hd){ return !_.includes(omit,hd); }); },
        },
        methods: {
            content(Obj,Hd){ let cnt = _.get(Obj,Hd); return _.isObject(cnt) ? '' : cnt }
        },
        filters: {
            read(text){ return _.upperFirst(text.replace(/\W|\_/g,' ')); }
        }
    }
</script>