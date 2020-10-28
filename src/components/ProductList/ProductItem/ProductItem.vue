<template>
    <li class="catalog__item">
        <router-link class="catalog__pic"
                     :to="{
                        name: 'product',
                        params:{
                            id: product.id
                        }
                     }"
        >
            <img :src="product.image" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
            <router-link :to="'/product/' + product.id">
                {{product.title}}
            </router-link>
        </h3>

        <span class="catalog__price">{{product.price | numberFormat}} ₽</span>

        <ul class="colors colors--black" v-if="product.colors">
            <li class="colors__item" v-for="colorVal in product.colors" :key="colorVal">
                <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" :value="colorVal" v-model="color">
                    <span class="colors__value" :style="{backgroundColor: colorVal}">
                  </span>
                </label>
            </li>
        </ul>
    </li>
</template>

<script>
    import goToPage from "@/helpers/goToPage";
    import numberFormat from "@/helpers/numberFormat";

    export default {
        name: "ProductItem",
        data: () => (
            {
                color: '#8BE000'
            }
        ),
        filters: {
            numberFormat
        },
        props: [
            'product'
        ],
        methods: {
            goToPage
        }
    }
</script>

<style scoped>

</style>