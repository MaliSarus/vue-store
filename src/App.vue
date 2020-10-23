<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
            <span class="content__info">
        152 товара
      </span>
        </div>

        <div class="content__catalog">
            <ProductFilter
                    :category-id.sync="filterCategoryId"
                    :price-from.sync="filterPriceFrom"
                    :price-to.sync="filterPriceTo"
                    :color.sync="filterColor"
            />
            <section class="catalog">
                <ProductList :products="products"/>
                <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
            </section>
        </div>
    </main>
</template>

<script>
    import products from "@/data/Products/products";
    import ProductList from "@/components/ProductList/ProductList";
    import AppPagination from "./components/AppPagination/AppPagination";
    import ProductFilter from "./components/ProductFilter/ProductFilter";

    export default {
        name: 'App',
        data: () => (
            {
                filterPriceFrom: 0,
                filterPriceTo: 0,
                filterCategoryId: 0,
                filterColor: '',
                page: 1,
                productsPerPage: 3,
            }
        ),
        components: {
            ProductList,
            AppPagination,
            ProductFilter
        },
        computed: {
            filteredProducts() {
                let filteredProducts = products;
                if (this.filterPriceFrom > 0) {
                    filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
                }
                if (this.filterPriceTo > 0) {
                    filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
                }
                if (this.filterCategoryId){
                    filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
                }
                if (this.filterColor){
                    filteredProducts = filteredProducts.filter(product => product.colors.indexOf(this.filterColor) !== -1)
                }
                return filteredProducts;
            },
            products() {
                const offset = (this.page - 1) * this.productsPerPage;
                return this.filteredProducts.slice(offset, offset + this.productsPerPage)
            },
            countProducts() {
                return this.filteredProducts.length
            }
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
