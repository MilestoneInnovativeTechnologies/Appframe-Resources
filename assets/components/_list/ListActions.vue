<template>
    <div class="clearfix">
        <div class="float-right w-75">
            <ul class="nav nav-pills card-header-pills float-right">
                <li class="nav-item" v-for="(action,id) in actions" :key="['L'+dataItemId,'A'+id].join('-')">
                    <ListAction :data-list-id="dataItemId" v-bind="action"></ListAction>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "ListActions",
        props: ['dataItemId'],
        computed: {
            ...mapGetters('LIST',{ listActions:'actions' }),
            ...mapGetters({ actionsObj:'actions' }),
            actions(){ return _.pick(this.actionsObj,this.listActions(this.dataItemId)) }
        }
    }
</script>