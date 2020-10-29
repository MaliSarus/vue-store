<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
        </div>
        <h3 class="product__title">
            {{item.product.title}}
        </h3>
        <p class="product__info">
            Объем: <span>128GB</span>
        </p>
        <span class="product__code">Артикул: {{item.product.id}}</span>

        <div class="product__counter form__counter">
            <Counter iconWidth="10" iconHeight="10" v-model="amount"/>

        </div>

        <b class="product__price">
            {{(item.product.price * item.amount) | numberFormat}} ₽
        </b>

        <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
                @click.prevent="deleteCartProduct(item.productId)">
            <svg width="20" height="20" fill="currentColor">
                <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>
</template>

<script>
    import numberFormat from "@/helpers/numberFormat";
    import {mapMutations, mapActions} from 'vuex'
    import Counter from "@/components/UI/Counter/Counter";

    export default {
        name: "CartItem",
        props: ['item'],
        filters: {
            numberFormat
        },
        components:{Counter},
        computed: {
            amount: {
                get() {
                    return this.item.amount
                },
                set(value) {
                    this.updateCartProductAmount({
                        productId: this.item.productId,
                        amount: value
                    })
                }
            }
        },
        methods: {
            ...mapMutations(['deleteProduct']),
            ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
            subAmount() {
                if (this.amount > 1)
                    this.amount -= 1
                else
                    this.amount = 0
            },
            incAmount() {
                    this.amount += 1
            }
        }
    }
</script>

<style scoped>

</style>