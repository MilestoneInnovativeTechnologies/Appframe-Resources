<template>
    <div class="clearfix">
        <div :class="{ 'float-right':(right === ''),'w-75':true }">
            <ul class="nav nav-pills card-header-pills float-right">
                <li class="nav-item" v-for="(action,id) in actions" :key="['L'+dataItem,'A'+id].join('-')">
                    <BTN size="xs" :type="action.type" :icon="action.icon" class="ml-1">{{ action.title }}</BTN>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapActions,mapGetters } = createNamespacedHelpers('ACTN');
    export default {
        name: "AppActions",
        props: ['right','dataType','dataItem'],
        methods: {
            ...mapActions(['initAction'])
        },
        computed: {
            ...mapGetters({ 'getActions':'actions' }),
            actions(){ return this.getActions(this.dataType,this.dataItem) }
        },
        created(){
            this.initAction({ type:this.dataType, item:this.dataItem });
        }
    }
</script>