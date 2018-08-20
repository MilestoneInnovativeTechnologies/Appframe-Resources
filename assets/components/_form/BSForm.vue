<template>
    <div class="card w-75">
        <div class="card-body">
            <form :name="name">
                <BSFormField v-for="(props,fieldName) in fields" :key="[name,fieldName].join('-')" v-bind="props" :form="name" :data-form-id="dataFormId"></BSFormField>
            </form>
            <div class="card-title clearfix">
                <div class="float-right">
                    <BTN @click="submit" :disabled="disabled">{{ action }}</BTN>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BSForm",
        props: ['name','fields','dataFormId'],
        data(){ return {
            action: this.$store.state.FORM.store[this.dataFormId].action,
            disabled: false
        } },
        created(){
            this.$store.dispatch('FORM/setParent').then(null)
        },
        methods: {
            submit(){
                let vm = this; vm.disabled = true;
                this.$store.dispatch('FORM/submitForm',this.dataFormId).then(() => { setTimeout((vm) => { vm.disabled = false }, 1000, vm) });
            }
        }
    }
</script>