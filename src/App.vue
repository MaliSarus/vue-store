<template>
    <ProductsPage v-if="page === 'products'" @goToPage="page = $event.page"/>
    <ProductPage v-else-if="page === 'product'"/>
    <ErrorPage v-else/>

</template>

<script>
    import ProductsPage from "@/pages/ProductsPage";
    import ProductPage from "@/pages/ProductPage";
    import ErrorPage from "@/pages/ErrorPage";

    export default {
        name: 'App',
        data(){
            return{
                page: 'products'
            }
        },
        components: {
            ProductPage,
            ProductsPage,
            ErrorPage
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
