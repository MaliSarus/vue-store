<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
            <span class="content__info">
<!--        {{filteredProducts.length}} товара-->
      </span>
        </div>

        <div class="content__catalog">
            <ProductFilter
                    :category-id.sync="filterCategoryId"
                    :price-from.sync="filterPriceFrom"
                    :price-to.sync="filterPriceTo"
                    :color.sync="filterColor"
                    :currentPage.sync="page"
            />
            <section class="catalog">
                <div v-if="loadingFailed">Произошла ошибка при загрузке</div>
                <Loader v-if="loading" :style="{margin: '0 auto'}"/>
                <ProductList v-else :products="products"/>
                <AppPagination
                        v-model="page"
                        :count="countProducts"
                        :per-page="productsPerPage"
                />
            </section>
        </div>
    </main>
</template>

<script>
    import ProductList from "@/components/ProductList/ProductList";
    import AppPagination from "@/components/AppPagination/AppPagination";
    import ProductFilter from "@/components/ProductFilter/ProductFilter";
    import axios from 'axios'
    import {BASE_URL} from "@/helpers/config";
    import Loader from "@/components/UI/Loader/Loader";

    export default {
        name: "ProductsPage",
        data: () => (
            {
                filterPriceFrom: 0,
                filterPriceTo: 0,
                filterCategoryId: 0,
                filterColor: '',
                page: 1,
                productsPerPage: 3,
                productsData: null,
                loading: false,
                loadingFailed: false,
            }
        ),
        components: {
            ProductList,
            AppPagination,
            ProductFilter,
            Loader
        },
        computed: {
            products() {
                return this.productsData ?
                    this.productsData.items.map(product => {
                        return {
                            ...product,
                            image: product.image.file.url,
                            colors: product.colors.map(color => {
                                return color.code
                            })
                        }
                    })
                    : [];
            },
            countProducts() {
                return this.productsData ?
                    this.productsData.pagination.total
                    : 0
            }
        },
        methods: {
            getProducts() {
                this.loading = true;
                this.loadingFailed = false;
                clearTimeout(this.getProductsTimer);
                this.getProductsTimer = setTimeout(() => {
                    axios.get(BASE_URL + '/products', {
                        params: {
                            page: this.page,
                            limit: this.productsPerPage,
                            categoryId: this.filterCategoryId,
                            minPrice: this.filterPriceFrom,
                            maxPrice: this.filterPriceTo,
                            colorId: this.filterColor,
                        }
                    })
                        .then(response => {
                            this.productsData = response.data;
                        })
                        .catch(() => this.loadingFailed = true)
                        .then(() => this.loading = false)
                }, 0)
            }
        },
        watch: {
            page() {
                this.getProducts();
            },
            filterPriceFrom() {
                this.getProducts();
            },
            filterPriceTo() {
                this.getProducts();
            },
            filterCategoryId() {
                this.getProducts();
            },
            filterColor() {
                this.getProducts();
            },
        },
        created() {
            this.getProducts();
        }
    }
</script>

<style scoped>

</style>