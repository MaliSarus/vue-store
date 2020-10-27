<template>
    <div>
        <div v-if="products.length === 0">Товаров нет</div>
        <ul v-else class="catalog__list">
            <ProductItem v-for="product in products"
                         :product="product"
                         :key="product.id"
            />
        </ul>
    </div>
</template>

<script>
    import ProductItem from "./ProductItem/ProductItem";

    export default {
        name: "ProductList",
        components: {ProductItem},
        props: ['products'],
        methods: {
            gotopage(event){
                console.log(event)
            }
        }
    }
</script>

<style scoped>

</style>