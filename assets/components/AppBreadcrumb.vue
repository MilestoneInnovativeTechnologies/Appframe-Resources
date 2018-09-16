<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" v-for="(route,index) in list">
                <a v-if="!index" href="#"><icon class="breadcrumb-icon mr-2">angle-left</icon>{{ route }}</a>
                <a v-else @click.prevent="navigate(route)" href="#">{{ compress(route.title) }}</a>
            </li>
        </ol>
    </nav>
</template>

<script>
    import { mapGetters } from'vuex';
    export default {
        name: "AppBreadcrumb",
        data(){ return { max:20,threshold:20 } },
        computed: {
            ...mapGetters('HSTR',['set']),
            list(){ return this.set() }
        },
        methods: {
            navigate(route){ console.log('Navigate to: ',route) },
            compress(text){ if(!text) return ''; console.log(this.max/2-3,this.max/2+3);
                return (text.length > this.max * (1+this.threshold/100))
                    ? [ text.substr(0,this.max/2-3),text.substr(text.length-this.max/2+3) ].join('.....')
                    : text;
            }
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