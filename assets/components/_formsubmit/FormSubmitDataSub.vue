<template>
    <div class="card-body">
        <div class="card-title"> {{ title }}</div>
        <FormSubmitDataContent v-for="(desc,head,idx) in description" :title="head" :description="desc" :key="['fsd','sub','cnt',idx].join('-')" class="ml-5"></FormSubmitDataContent>
    </div>
</template>

<script>
    export default {
        name: "FormSubmitDataSub",
        props: ['title','description'],
    }
</script>