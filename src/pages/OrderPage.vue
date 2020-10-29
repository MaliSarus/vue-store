<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" href="index.html">
                        Каталог
                    </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" href="cart.html">
                        Корзина
                    </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Оформление заказа
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
        3 товара
      </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST" @submit.prevent="sendOrder">
                <div class="cart__field">
                    <div class="cart__data">
                        <FormInput title="ФИО" :error="formError.name" type="text" placeholder="Введите ваше полное имя"
                                   name="name" v-model="formData.name"/>
                        <FormInput title="Адрес доставки" :error="formError.address" type="text"
                                   placeholder="Введите ваш адрес" name="address" v-model="formData.address"/>
                        <FormInput title="Телефон" :error="formError.phone" type="tel" name="phone"
                                   placeholder="Введите ваш телефон" v-model="formData.phone"/>
                        <FormInput title="Email" :error="formError.email" type="email" name="email"
                                   placeholder="Введи ваш Email" v-model="formData.email"/>
                        <FormTextarea title="Комментарий к заказу" :error="formError.comment" name="comments"
                                      placeholder="Ваши пожелания" v-model="formData.comments"/>
                    </div>

                    <div class="cart__options">
                        <h3 class="cart__title">Доставка</h3>
                        <ul class="cart__options options">
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                                           checked v-model="delivery">
                                    <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                                </label>
                            </li>
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="delivery" value="500" v-model="delivery">
                                    <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                                </label>
                            </li>
                        </ul>

                        <h3 class="cart__title">Оплата</h3>
                        <ul class="cart__options options">
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="pay" value="card" v-model="pay">
                                    <span class="options__value">
                    Картой при получении
                  </span>
                                </label>
                            </li>
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="pay" value="cash" v-model="pay">
                                    <span class="options__value">
                    Наличными при получении
                  </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="cart__block">
                    <ul class="cart__orders">
                        <li class="cart__order" v-for="item in products" :key="item.productId">
                            <h3>{{item.product.title}}</h3>
                            <b>{{item.product.price | numberFormat}} ₽</b>
                            <span>Артикул: {{item.productId}}</span>
                        </li>
                    </ul>

                    <div class="cart__total">
                        <p v-if="delivery > 0">Доставка: <b>{{delivery}} ₽</b></p>
                        <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{(+delivery + totalPrice) | numberFormat}}
                            ₽</b></p>
                    </div>

                    <button class="cart__button button button--primery" type="submit">
                        {{buttonText}}
                    </button>
                </div>
                <div class="cart__error form__error-block" v-if="formGlobalError">
                    <h4>Заявка не отправлена!</h4>
                    <p>
                        {{formGlobalError}}
                    </p>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
    import FormInput from "@/components/UI/FormField/FormInput/FormInput";
    import FormTextarea from "@/components/UI/FormField/FormTextarea/FormTextarea";
    import axios from 'axios'
    import {BASE_URL} from "../helpers/config";
    import {mapGetters, mapMutations} from 'vuex'
    import numberFormat from "@/helpers/numberFormat";

    export default {
        name: "OrderPage",
        components: {FormTextarea, FormInput},
        data() {
            return {
                formData: {},
                formError: {},
                formGlobalError: null,
                delivery: '',
                pay: '',
                buttonText: 'Оформить заказ'
            }
        },
        filters: {numberFormat},
        computed: {
            ...mapGetters({
                userAccessKey: 'getUserAccessKey',
                products: 'cartProductsDetail',
                totalPrice: 'cartTotalPrice'
            })
        },
        methods: {
            ...mapMutations(['resetCart', 'updateOrderInfo']),
            sendOrder() {
                this.formGlobalError = null;
                this.formError = {};
                this.buttonText = 'Оформляем'
                axios
                    .post(BASE_URL + '/orders', {
                        ...this.formData
                    }, {
                        params: {
                            userAccessKey: this.userAccessKey
                        }
                    })
                    .then((response) => {
                        this.resetCart();
                        this.updateOrderInfo(response.data);
                        this.$router.push(({
                            name: 'orderInfo',
                            params: {
                                id: response.data.id
                            }
                        }))
                        this.buttonText = 'Оформить заказ'
                    })
                    .catch(error => {
                        this.formError = error.response.data.error.request || {}
                        this.formGlobalError = error.response.data.error.message;
                    })
            }
        }

    }
</script>

<style scoped>

</style>