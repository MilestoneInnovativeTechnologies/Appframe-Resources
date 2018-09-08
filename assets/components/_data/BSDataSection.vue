<template>
    <section class="section-deck">
        <div class="card card-fluid" :class="cardClass">
            <div class="card-body">
                <h1 class="card-title" v-if="heading">{{ heading }}</h1>
                <BSDataSectionItems :record="data" :items="items"></BSDataSectionItems>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "BSDataSection",
        props: ['colspan','dataRecord','title_field','title','relation','items'],
        computed: {
            cardClass(){ return (this.colspan && _.toSafeInteger(this.colspan) > 0) ? ['col','md',this.colspan].join('-') : []; },
            heading(){ return this.title_field ? _.get(this.dataRecord,this.title_field) : this.title },
            data(){ return this.relation ? 'ABC' : this.dataRecord }
        }
    }
</script>