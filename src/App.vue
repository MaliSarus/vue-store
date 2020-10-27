<template>
    <component :is="currentPageComponent" :page-params="currentPageParams"></component>
</template>

<script>
    import ProductsPage from "@/pages/ProductsPage";
    import ProductPage from "@/pages/ProductPage";
    import ErrorPage from "@/pages/ErrorPage";
    import eventBus from "@/helpers/eventBus";

    const routes = {
        products: 'ProductsPage',
        product: 'ProductPage',
    }

    export default {
        name: 'App',
        data() {
            return {
                currentPage: 'products',
                currentPageParams: {},
            }
        },
        components: {
            ProductPage,
            ProductsPage,
            ErrorPage
        },
        computed: {
            currentPageComponent() {
                return routes[this.currentPage] || 'ErrorPage'
            }
        },
        methods: {
         goToPage(page, pageParams){
           this.currentPage = page;
           this.currentPageParams = {...pageParams}
         }
        },
        created() {
            eventBus.$on('goToPage', (event) => {
                this.goToPage(event.page, event.params)
            });
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
