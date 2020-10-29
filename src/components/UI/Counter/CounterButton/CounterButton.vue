<template>
    <button type="button" :aria-label="label" @click.prevent="action">
        <svg :width="iconWidth" :height="iconHeight" fill="currentColor">
            <use :xlink:href="icon"></use>
        </svg>
    </button>
</template>

<script>
    export default {
        props: ['iconWidth', 'iconHeight', 'label', 'icon', 'type', 'amount'],
        name: "CounterButton",
        model: {
            prop: 'amount',
            event: 'counter-change',
        },
        methods: {
            action() {
                switch (this.type) {
                    case 'sub': {
                        if (this.amount >= 1) {
                            this.$emit('counter-change', this.amount - 1);
                        }
                        break;
                    }
                    case 'add': {
                        this.$emit('counter-change', this.amount + 1);
                        break;
                    }
                    default:
                        break;
                }

            }
        }
    }
</script>

<style scoped>

</style>