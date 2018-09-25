import { mapMutations } from'vuex'

export const fieldValueMixin = {

    props: ['name','dataFormId'],

    computed: {
        value: {
            get: function() { return (this.$store.getters['FORM/value'](this.dataFormId,this.name)) },
            set: function(value) { this.updateValue({ form: this.dataFormId, field: this.name, value }) }
        }
    },

    methods: {
        ...mapMutations('FORM',['updateValue']),
        input(e){ this.updateValue({ form: this.dataFormId, field: this.name, value: e.target.value }) }
    }

}