<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" v-for="(name,index) in list">
                <a href="#">
                    <icon v-if="!index" class="breadcrumb-icon mr-2">angle-left</icon>
                    {{ name }}
                </a>
            </li>
        </ol>
    </nav>
</template>

<script>
    export default {
        name: "AppBreadcrumb",
        props: ['action'],
        computed:{
            Action(){ return this.$store.getters.actions[this.action] },
            resource(){ return this.$store.getters.resources[this.Action.resource] },
            actionTitle(){ return this.Action.title },
            list(){ return [this.resource,this.actionTitle] }
        }
    }
</script>

<style scoped>
    .breadcrumb-enter-active, .breadcrumb-leave-active {transition: all 0.2s linear;}
    .breadcrumb-leave-active {position: absolute;}
    .breadcrumb-enter {transform: translateY(-0.5rem);opacity: 0;}
    .breadcrumb-leave, .breadcrumb-enter-to {transform: translateY(0);opacity: 1;}
    .breadcrumb-leave-to {transform: translateY(0.5rem);opacity: 0;}
</style>