import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import requests from './requestsData'


export default{
    namespaced: true,
    state(){
        return{
            requests
        }
    },
    mutations,
    actions,
    getters
}