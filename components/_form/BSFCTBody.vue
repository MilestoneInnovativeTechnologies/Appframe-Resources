<template>
    <tbody>
        <tr v-if="empty"><td :colspan="names.length+2" class="text-center">no data, start adding..</td></tr>
        <tr v-else v-for="(values,id,no) in collectiondata" :key="['FCD',this.form,this.name,id].join('-')">
            <th>{{ no+1 }}</th>
            <td v-for="value in values">{{ value }}</td>
            <th><BTN size="xs" type="outline-warning" @click.prevent="del(id)">Del</BTN></th>
        </tr>
    </tbody>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        name: "BSFCTBody",
        props: ['form','name','names','collectiondata'],
        computed: {
            empty(){ return _.isEmpty(this.collectiondata) }
        },
        methods: {
            ...mapMutations('FORM',['delCollectionValue','delAllCollectionValue']),
            del(id){ this.delCollectionValue({ form:this.form,collection:this.name,id }) },
        },
        beforeDestroy(){
            this.delAllCollectionValue({ form:this.form, collection:this.name })
        }
    }
</script>