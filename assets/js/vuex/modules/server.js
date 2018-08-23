const state = {
    queue: [],
};

const actions = {
    post({ commit,dispatch },request){ commit('queue',request); dispatch('process'); },
    process({ state,getters,dispatch,rootGetters }){ if(getters.queue && !rootGetters.pageLoading) server(state.queue.shift()).then(function({ data }){ dispatch('handleResponseData',data,{ root:true }) }); },
    responseInterceptor({ dispatch }){ dispatch('process') }
};

const mutations = {
    queue(state,request){ state.queue.push(request); },
};

const getters = {
    queue(state){ return state.queue.length }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}