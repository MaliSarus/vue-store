<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'products'}">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'products'}">
                        {{currentCategoty.title}}
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        {{currentProduct.title}}
                    </a>
                </li>
            </ul>
        </div>
        <div v-if="loadingFailed">Произошла ошибка при загрузке</div>
        <Loader v-if="loading"/>
        <section v-if="!loadingFailed && !loading" class="item">
            <div class="item__pics pics">
                <div class="pics__wrapper">
                    <img width="570" height="570" :src="currentProduct.image"
                         :alt="currentProduct.title">
                </div>
            </div>

            <div class="item__info">
                <span class="item__code">Артикул: {{currentProduct.id}}</span>
                <h2 class="item__title">
                    {{currentProduct.title}}
                </h2>
                <div class="item__form">
                    <form class="form" action="#" @submit.prevent="addToCart" method="POST">
                        <b class="item__price">
                            {{currentProduct.price | numberFormat}} ₽
                        </b>

                        <fieldset class="form__block">
                            <legend class="form__legend">Цвет:</legend>
                            <ul class="colors" v-if="currentProduct.colors">
                                <li class="colors__item" v-for="color in currentProduct.colors" :key="color">
                                    <label class="colors__label">
                                        <input class="colors__radio sr-only" type="radio" name="color-item"
                                               :value="color"
                                               v-model="currentColor">
                                        <span class="colors__value" :style="{'background-color': color}">
                    </span>
                                    </label>
                                </li>
                            </ul>
                        </fieldset>

                        <fieldset class="form__block">
                            <legend class="form__legend">Объемб в ГБ:</legend>

                            <ul class="sizes sizes--primery">
                                <li class="sizes__item">
                                    <label class="sizes__label">
                                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                                        <span class="sizes__value">
                      32gb
                    </span>
                                    </label>
                                </li>
                                <li class="sizes__item">
                                    <label class="sizes__label">
                                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                                        <span class="sizes__value">
                      64gb
                    </span>
                                    </label>
                                </li>
                                <li class="sizes__item">
                                    <label class="sizes__label">
                                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                                               checked="">
                                        <span class="sizes__value">
                      128gb
                    </span>
                                    </label>
                                </li>
                            </ul>
                        </fieldset>

                        <div class="item__row">
                            <div class="form__counter">
                                <button type="button" aria-label="Убрать один товар" @click.prevent="subAmount">
                                    <svg width="12" height="12" fill="currentColor">
                                        <use xlink:href="#icon-minus"></use>
                                    </svg>
                                </button>

                                <input type="text" v-model.number="productAmount">

                                <button type="button" aria-label="Добавить один товар" @click.prevent="incAmount">
                                    <svg width="12" height="12" fill="currentColor">
                                        <use xlink:href="#icon-plus"></use>
                                    </svg>
                                </button>
                            </div>

                            <button class="button button--primery" type="submit" :disabled="productAddSending">
                                {{buttonText}}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="item__desc">
                <ul class="tabs">
                    <li class="tabs__item">
                        <a class="tabs__link tabs__link--current">
                            Описание
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
                            Характеристики
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
                            Гарантия
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
                            Оплата и доставка
                        </a>
                    </li>
                </ul>

                <div class="item__content">
                    <p>
                        Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
                        Синхронизация со смартфоном<br>
                        Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
                        Поддержка сторонних приложений<br>
                    </p>

                    <a href="#">
                        Все характеристики
                    </a>

                    <h3>Что это?</h3>

                    <p>
                        Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
                        сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
                        объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на
                        смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и
                        различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение,
                        принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
                        маршруты и планировать новые велопрогулки.
                    </p>

                    <h3>Дизайн</h3>

                    <p>
                        Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x
                        47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного
                        пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей
                        выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков
                        информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект
                        поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что
                        устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду
                        на глубину не более 1 метра.
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>

<script>

    // import categories from "@/data/Categories/categories";
    import goToPage from "@/helpers/goToPage";
    import numberFormat from "@/helpers/numberFormat";
    import axios from 'axios'
    import {BASE_URL} from "@/helpers/config";
    import {mapActions} from 'vuex'
    import Loader from "../components/UI/Loader/Loader";

    export default {
        name: "ProductPage",
        components: {Loader},
        data() {
            return {
                currentColor: '',
                productAmount: 1,
                productData: null,
                loading: false,
                loadingFailed: false,
                productAdded: false,
                productAddSending: false,

            }
        },
        filters: {
            numberFormat
        },
        computed: {
            buttonText() {
                if (!this.productAddSending && !this.productAdded){
                    return 'В корзину'
                } else if (this.productAddSending && !this.productAdded){
                    return 'Добавляем'
                } else {
                    return 'Готово'
                }
            },
            currentProduct() {
                return this.productData ?
                    {
                        ...this.productData,
                        image: this.productData.image.file.url,
                        colors: this.productData.colors.map(color => color.code)
                    }
                    : {}
            },
            currentCategoty() {
                return this.productData ? this.productData.category : '';
            },
        },
        methods: {
            ...mapActions(['addProductToCart']),
            goToPage,
            addToCart() {
                this.productAdded = false;
                this.productAddSending = true;
                const order = {
                    productId: this.currentProduct.id,
                    amount: this.productAmount
                }
                this.addProductToCart(order)
                .then(() => {
                    this.productAdded = true;
                    this.productAddSending = false;
                })
            },
            getProduct() {
                this.loading = true;
                axios.get(BASE_URL + `/products/${this.$route.params.id}`)
                    .then(response => {
                        this.productData = response.data
                    })
                    .catch(() => this.loadingFailed = true)
                    .then(() => this.loading = false)
            },
            subAmount() {
                if (this.productAmount > 1)
                    this.productAmount -= 1
                else
                    this.productAmount = 0
            },
            incAmount() {
                this.productAmount += 1
            }
        },
        watch: {
            '$route.params.id': {
                handler() {
                    this.getProduct()
                },
                immediate: true
            }
        },

    }
</script>

<style scoped>

</style>