<template>
    <div class="form__counter">
        <CounterButton
                label="Убрать один товар"
                :icon-width="iconWidth"
                :icon-height="iconHeight"
                icon="#icon-minus"
                type="sub"
                v-model.number="dataValue"
        />
        <input type="text" v-model.number="dataValue">
        <CounterButton
                label="Добавить один товар"
                :icon-width="iconWidth"
                :icon-height="iconHeight"
                icon="#icon-plus"
                type="add"
                v-model.number="dataValue"
        />
    </div>
</template>

<script>
    import CounterButton from "./CounterButton/CounterButton";

    export default {
        name: "Counter",
        props:['iconWidth', 'iconHeight', 'value'],
        components: {
            CounterButton
        },
        computed:{
            dataValue:{
                get(){
                    return this.value
                },
                set(value){
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>