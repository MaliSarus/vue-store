<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link :to="{name: 'products'}" class="breadcrumbs__link" href="index.html">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link :to="{name:'order'}" class="breadcrumbs__link" href="cart.html">
                        Корзина
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Оформление заказа
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Заказ оформлен <span>№ {{orderInfo.id}}</span>
            </h1>
        </div>
        <Loader v-if="orderInfo == null"/>
        <section v-else class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <p class="cart__message">
                        Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями
                        заказа.
                        Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
                    </p>

                    <ul class="dictionary">
                        <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
                            <span class="dictionary__value">
                {{orderInfo.name}}
              </span>
                        </li>
                        <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
                            <span class="dictionary__value">
                {{orderInfo.address}}
              </span>
                        </li>
                        <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
                            <span class="dictionary__value">
                {{orderInfo.phone}}
              </span>
                        </li>
                        <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
                            <span class="dictionary__value">
                {{orderInfo.email}}
              </span>
                        </li>
                        <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
                            <span class="dictionary__value">
                картой при получении
              </span>
                        </li>
                    </ul>
                </div>

                <div class="cart__block">
                    <ul class="cart__orders">
                        <li class="cart__order" v-for="item in orderProducts" :key="item.product.id">
                            <h3>{{item.product.title}}</h3>
                            <b>{{item.product.price | numberFormat}} ₽</b>
                            <span>Артикул: {{item.product.id}}</span>
                        </li>
                    </ul>

                    <div class="cart__total">
                        <p>Доставка: <b>500 ₽</b></p>
                        <p>Итого: <b>{{orderProducts.length}}</b> товара на сумму <b>{{(orderInfo.totalPrice + 500) |
                            numberFormat}} ₽</b></p>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
    import {mapActions} from 'vuex'
    import numberFormat from "@/helpers/numberFormat";
    import Loader from "@/components/UI/Loader/Loader";

    export default {
        name: "OrderInfoPage",
        components: {Loader},
        methods: {
            ...mapActions(['loadOrderInfo'])
        },
        filters: {
            numberFormat
        },
        computed: {
            orderInfo() {
                return this.$store.state.orderInfo;
            },
            orderProducts() {
                return this.$store.state.orderInfo.basket.items
            }
        },
        created() {
            if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
                return
            } else {
                this.loadOrderInfo(this.$route.params.id)
            }
        }
    }
</script>

<style scoped>

</style>