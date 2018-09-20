<template>
    <tfoot><tr><td :colspan="count+1">
        <div class="float-right">
            <BTN @click.prevent="submit"> Update </BTN>
        </div>
    </td></tr></tfoot>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "MRListTFoot",
        props: ['count','list','relation','record'],
        computed: {
            route(){ return this.$route.params }
        },
        methods: {
            ...mapActions('LIST',['updateRelation']),
            submit(){ this.updateRelation({ action:this.route.action,id:this.route.id,list:this.list,relation:this.relation }) }
        }
    }
</script>