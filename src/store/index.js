import Vue from 'vue'
import Vuex from 'vuex'
import { getTable } from '../api/home/getTable'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: '',
        tableData: [],
        dialogVisible: false
    },
    mutations: {
        setName(state, name) {
            state.username = name
            localStorage.setItem('name', name)
        },
        getTable(state, data) {
            state.tableData = data
        }
    },
    actions: {
        async setTable({ commit }, url) {
            var { data } = await getTable(url)
            commit('getTable', data.data)
        }
    }
})

export default store