import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {BASE_URL} from "../helpers/config";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: null
    },
    mutations: {
        updateProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(product => product.productId === productId);
            if (item) {
                item.amount = amount
            }
        },
        deleteProduct(state, payload) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== payload);
        },
        setUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey
        },
        updateCartProductsData(state, payload) {
            state.cartProductsData = payload
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        }
    },
    actions: {
        loadCart({commit, state}) {
            return axios.get(BASE_URL + '/baskets', {
                params: {
                    userAccessKey: state.userAccessKey
                }
            })
                .then((response) => {
                    if (!state.userAccessKey) {
                        localStorage.setItem('userAccessKey', response.data.user.accessKey)
                        commit('setUserAccessKey', response.data.user.accessKey)
                    }

                    commit('updateCartProductsData', response.data.items)
                    commit('syncCartProducts')
                })
        },
        addProductToCart({state, commit}, {productId, amount}) {
            return (new Promise(resolve => setTimeout(resolve, 2000)))
                .then(() => {
                    return axios
                        .post(BASE_URL + '/baskets/products', {
                            productId: productId,
                            quantity: amount
                        }, {
                            params: {
                                userAccessKey: state.userAccessKey
                            }
                        })
                        .then(response => {
                            commit('updateCartProductsData', response.data.items)
                            commit('syncCartProducts')
                        })

                })

        },
        updateCartProductAmount({state, commit}, {productId, amount}) {
            commit('updateProductAmount', {productId, amount})
            if (amount < 1) {
                return;
            }
            return axios
                .put(BASE_URL + '/baskets/products', {
                    productId: productId,
                    quantity: amount
                }, {
                    params: {
                        userAccessKey: state.userAccessKey
                    }
                })
                .then(response => {
                    commit('updateCartProductsData', response.data.items)
                })
                .catch(() => {
                    commit('syncCartProducts')
                })

        },
        deleteCartProduct({state, commit}, productId) {
            commit('deleteProduct', productId)
            return axios
                .delete(BASE_URL + '/baskets/products', {
                    data: {
                        productId
                    },
                    params: {
                        userAccessKey: state.userAccessKey
                    }
                })
                .then(response => {
                    commit('updateCartProductsData', response.data.items)
                })
                .catch(() => {
                    commit('syncCartProducts')
                })

        }
    },

    getters: {
        cartProductsDetail(state) {

            return state.cartProducts.map(item => {
                let product = state.cartProductsData.find(p => p.product.id === item.productId).product;
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                }
            })

        },
        cartTotalPrice(state, getters) {
            return getters.cartProductsDetail.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
        }
    },
    modules: {}
})
