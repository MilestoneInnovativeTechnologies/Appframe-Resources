<template>
    <div class="form-group">
        <div class="input-group input-group-sm input-group-alt">
            <input type="text" class="form-control" placeholder="Search record" v-model="filter">
            <div class="input-group-append">
                <span class="input-group-text">
                    <BTN icon="search" size="xs" type="btn-outline-info" class="bg-transparent py-0 border-0" @click="search">&nbsp;</BTN>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppContentListSearch",
        props: ['idns'],
        data(){ return { filter:'' } },
        methods: {
            search(){ console.log('Filter'); }
        }
    }
</script>