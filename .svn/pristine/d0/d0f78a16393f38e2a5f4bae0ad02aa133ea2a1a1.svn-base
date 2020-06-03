import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    communityId:'',
    goods:[],
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

if (module.hot) {
    
    module.hot.accept(['./mutations', './actions', './getters'], () => {
        const newMutations = require('./mutations').default
        const newActions = require('./actions').default
        const newGetters = require('./getters').default
        store.hotUpdate({
            mutations: newMutations,
            actions: newActions,
            getters: newGetters
        })
    })
}

export default store
