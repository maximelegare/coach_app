export default{
    addRequest(state, payload){
        console.log('in mutations')
        state.requests.push(payload)
        console.log(state.requests)
    },
    loadRequests(state, payload){
        state.requests = payload
    }
};