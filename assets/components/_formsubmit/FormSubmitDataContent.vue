<template>
    <dl class="row"><dt class="col-2 text-uppercase">{{ title }}</dt><dd class="col-10">{{ description }}</dd></dl>
</template>

<script>
    export default {
        name: "FormSubmitDataContent",
        props: ['title','description'],
    }
</script>