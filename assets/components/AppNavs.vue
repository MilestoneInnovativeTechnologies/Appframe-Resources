<script>
    import { mapState,mapGetters } from 'vuex';
    export default {
        render:function(h){
            let vm = this;
            let VNode = _.map(this.navs,function(nav){
                let lis = [h('menu-header',[nav])];
                if(nav !== vm.comp) lis.push(h(nav+'Navs'));
                else {
                    _.each(vm.menu,function(menus,resource_id){
                        let props = { resource:vm.resources[resource_id], menus };
                        lis.push(h('ResourceNav',{ props }))
                    });
                }
                return lis;
            });
            return h('ul',{ class:['menu'] },VNode)
        },
        name: "AppNavs",
        data(){
            return {
                comp: 'Resources',
                navs: ['Resources'/*,'User','Theme'*/],
                //menu: mapState('ACTN',['menu']),
                //resources: this.$store.getters.resources,
            }
        },
        computed: {
            ...mapState('ACTN',['menu']),
            ...mapGetters(['resources']),
        }
    }
</script>