<template>
    <ul class="menu">
        <menu-item
                v-for="(item,index) in items"
                :key="['mg',name,index].join('-')"
                :action="actionId(item)">
            {{ menuName(item) }}
        </menu-item>
    </ul>
</template>

<script>
    export default {
        name: "MenuGroup",
        props:['items','name'],
        methods:{
            menuName(item){ return _.isObject(item) ? item.menu : item },
            actionId(item){ return _.isObject(item) ? item.id : item },
        }
    }
</script>