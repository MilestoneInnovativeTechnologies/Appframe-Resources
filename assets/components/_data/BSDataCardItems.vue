<template>
    <div class="card-text">
        <template v-for="(obj,label) in items">
            <dt>{{ label }}</dt>
            <dd>{{ getValue(obj) }}</dd>
        </template>
    </div>
</template>

<script>
    export default {
        name: "BSDataCardItems",
        props: ['record','items'],
        methods: {
            getValue({ relation,attribute }){
                return relation ? this.getRelationValue(relation,attribute) : _.get(this.record,attribute);
            },
            getRelationValue(relation,attribute){
                let data = _.get(this.record,relation);
                return (_.isArray(data)) ? _.map(data,attribute).join(', ') : _.get(data,attribute)
            }
        }
    }
</script>