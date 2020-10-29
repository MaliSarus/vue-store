<template>
    <FormField :title="title" :error="error">
        <input class="form__input" :type="type" :name="name" :placeholder="placeholder" v-model="dataValue">
    </FormField>
</template>

<script>
    import FormField from "../FormField";
    import FormFieldMixin from "@/mixins/FormFieldMixin/FormFieldMixin";

    export default {
        name: "FormInput",
        components: {FormField},
        props: ['title', 'error', 'placeholder', 'value', 'name', 'type'],
        mixins: [FormFieldMixin]
    }
</script>

<style scoped>

</style>