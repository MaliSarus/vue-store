<template>
    <ul class="catalog__list">
        <ProductItem v-for="(product,index) in products"
                     :title="product.title"
                     :price="product.price"
                     :image="product.image"
                     :key="index"
        />
    </ul>
</template>

<script>
    import ProductItem from "./ProductItem/ProductItem";

    export default {
        name: "ProductList",
        components: {ProductItem},
        props: ['products']
    }
</script>

<style scoped>

</style>