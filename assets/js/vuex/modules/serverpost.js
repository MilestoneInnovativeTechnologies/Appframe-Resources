const state = {
    request_queue: [],
};

const actions = {

    queueServerPost({ commit }, request){ commit('queueServerPost',request); },
    processServerPostQueue({ state, rootState }){ if(state.request_queue.length) if(!rootState.page.loading) server(state.request_queue.shift()); },
    postRequestServer({ dispatch,rootState }){ dispatch('queueServerPost',rootState.request).then(() => dispatch('processServerPostQueue')); },

};

const mutations = {
    queueServerPost(state,request){ state.request_queue.push(request); },
};

export default {
    namespaced: true,
    state, actions, mutations
}