<template>
    <button role="button" class="btn" :class="cls" v-on="listeners" :disabled="disabled"><icon class="mr-1" v-if="ipp">{{ icon }}</icon><slot></slot><icon class="ml-1" v-if="iap">{{ icon }}</icon></button>
</template>

<script>
    export default {
        name: "BTN",
        props: {
            type: { default: 'primary' },
            size: { default: null },
            icon: { default: null },
            append: { default: false },
            disabled: { default: false }
        },
        computed: {
            cls(){ let cls = ['btn-'+this.type]; if(this.size) cls.push('btn-'+this.size); return cls; },
            iap(){ return this.icon && this.append !== false },
            ipp(){ return this.icon && this.append === false },
            listeners(){ return this.$listeners }
        }
    }
</script>