<template>
    <input type="radio" name="selectList" class="form-check-input ml-2" :value="id" :id="id" @change="change" />
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapActions,mapGetters } = createNamespacedHelpers('LIST');
    export default {
        name: "BSListSelectRadio",
        props: ['id','record'],
        computed: {
            ...mapGetters(['details']),
            relations(){ return this.details.relations }
        },
        methods: {
            ...mapActions(['setRequestRelations']),
            change(e){ if(e.target.value === this.id) this.setRelations(this.record) },
            setRelations(record){
                let relations = this.relations,
                    relate_items = _(relations).mapKeys((value) => value).mapValues(function(value,key){
                        return (key+'.id').toLowerCase().split('.').reduce(function(acc,key1){
                            if(!acc) return null;
                            if(_.isObject(acc)){
                                if(_.isArray(acc)) acc = acc[0];
                                if(acc.hasOwnProperty(key1)) return acc[key1];
                            }
                        },record);
                    }).value();
                this.setRequestRelations({ relations,relate_items })
            }
        }
    }
</script>