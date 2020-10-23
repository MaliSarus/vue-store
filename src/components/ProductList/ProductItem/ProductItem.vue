<template>
    <li class="catalog__item" >
        <a class="catalog__pic" href="#">
            <img :src="product.image" :alt="product.title">
        </a>

        <h3 class="catalog__title">
            <a href="#">
                {{product.title}}
            </a>
        </h3>

        <span class="catalog__price">{{product.price}} ₽</span>

        <ul class="colors colors--black" v-if="product.colors">
            <li class="colors__item" v-for="colorVal in product.colors" :key="colorVal">
                <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" :value="colorVal"  v-model="color">
                    <span class="colors__value" :style="{backgroundColor: colorVal}">
                  </span>
                </label>
            </li>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "ProductItem",
        data: () => (
            {
                color: '#8BE000'
            }
        ),
        props: [
            'product'
        ]
    }
</script>

<style scoped>

</style>