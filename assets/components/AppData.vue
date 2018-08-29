<template>
    <DataTemp></DataTemp>
</template>

<script>
    export default {
        name: "AppData",
        props: ['dataIds'],
        computed: {
        },
        methods: {
            //...mapActions({ updateList: 'update' }),
        },
        created(){
            //this.updateList(this.id);
        },
    }
</script>