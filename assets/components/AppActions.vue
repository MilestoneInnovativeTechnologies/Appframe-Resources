<template>
    <div class="clearfix">
        <div :class="{ 'float-right':(right === '') }">
            <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                    <a class="nav-link active btn btn-info mx-1" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active btn btn-info mx-1" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled active btn btn-info mx-1" href="#">Disabled</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapActions } = createNamespacedHelpers('ACTN');
    export default {
        name: "AppActions",
        props: ['right','dataType','dataItem'],
        methods: {
            ...mapActions(['initAction'])
        },
        created(){
            this.initAction({ type:this.dataType, item:this.dataItem });
        }
    }
</script>