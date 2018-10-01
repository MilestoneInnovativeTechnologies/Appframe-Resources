<template>
    <div class="card-body">
        <div class="card-title font-weight-bold"> {{ title }}</div>
        <FormSubmitDataContent v-for="(desc,head,idx) in description" :title="head | read" :description="desc" :key="['fsd','sub','cnt',idx].join('-')" class="mx-5 border-top mb-0 pt-2"></FormSubmitDataContent>
    </div>
</template>

<script>
    export default {
        name: "FormSubmitDataSub",
        props: ['title','description'],
        filters: {
            read(text){ return _.upperCase(text.replace(/\W|\_/g,' ')); }
        }
    }
</script>