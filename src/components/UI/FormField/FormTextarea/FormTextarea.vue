<template>
    <FormField :title="title" :error="error">
        <textarea class="form__input form__input--area" :name="name" :placeholder="placeholder" v-model="dataValue"></textarea>
    </FormField>
</template>

<script>
    import FormField from "../FormField";
    import FormFieldMixin from "@/mixins/FormFieldMixin/FormFieldMixin";
    export default {
        name: "FormTextarea",
        props: ['title', 'error', 'placeholder', 'value', 'name'],
        components: {FormField},
        mixins: [FormFieldMixin]
    }
</script>

<style scoped>

</style>