/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createStore } from 'vuex'

const moduleA = {
    state: {
        username: 'moduleA'
    },
    getters: {
        newName(state) {
            return state.username + '!!!'
        }
    }
}
const moduleB = {
    namespaced: true,
    state: {
        username: 'moduleB'
    },
    getters: {
        newName(state) {
            return state.username + '!!!'
        }
    },
    mutations: {
        updateName(state) {
            state.username = 'ls'
        }
    },
    actions: {
        updateName(ctx) {
            setTimeout(() => {
                ctx.commit('updateName')
            }, 2000)
        }
    }
}
export default createStore({
        modules: {
            moduleA,
            moduleB
        }
    })
    // export default createStore({
    //     state: {
    //         username: 'zs'
    //     },
    //     getters: {
    //         newName(state) {
    //             return state.username + '???'
    //         }
    //     },
    //     mutations: {
    //         updateName(state) {
    //             state.username = 'ls'
    //         }
    //     },
    //     actions: {
    //         updateName(ctx) {
    //             setTimeout(() => {
    //                 ctx.commit('updateName')
    //             }, 2000)
    //         }
    //     },
    //     modules: {}
    // })