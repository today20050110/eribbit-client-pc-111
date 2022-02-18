/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
    modules: {
        user,
        cart,
        category
    },
    plugins: [
        createPersistedstate({
            key: 'erabbit-client-pc-store',
            paths: ['user', 'cart']
        })
    ]
})