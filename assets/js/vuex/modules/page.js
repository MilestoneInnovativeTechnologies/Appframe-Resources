const state = {
    loading: false,
};

const actions = {
};

const mutations = {
    requestInterceptor(state){ state.loading = true; },
    responseInterceptor(state){ state.loading = false; },
    title(state,payload){ state.title = _.isObject(payload) ? payload.title : payload; },
    loading(state,payload){ state.loading = _.isObject(payload) ? (payload.loading || payload.status || payload.load) : payload; },
};

const getters = {
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}