<template>
    <div class="form__counter">
        <CounterButton
                label="Убрать один товар"
                :icon-width="iconWidth"
                :icon-height="iconHeight"
                icon="#icon-minus"
                type="sub"
                v-model.number="value"
        />
        <input type="text" v-model.number="value">
        <CounterButton
                label="Добавить один товар"
                :icon-width="iconWidth"
                :icon-height="iconHeight"
                icon="#icon-plus"
                type="add"
                v-model.number="value"
        />
    </div>
</template>

<script>
    import CounterButton from "./CounterButton/CounterButton";

    export default {
        name: "Counter",
        model:{
          prop: 'value',
          event: 'change-counter'
        },
        props:['iconWidth', 'iconHeight', 'value'],
        components: {
            CounterButton
        },
        methods:{
            changeCounter() {
                this.$emit('change-counter', this.value)
            }
        },
        watch:{
            value(){
                this.changeCounter();
            }
        }

    }
</script>

<style scoped>

</style>