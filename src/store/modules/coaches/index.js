import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import coaches from './coachesData'



export default{
    namespaced: true,
    state(){
        return{
            coaches
        }

    },
    mutations,
    getters,
    actions
}