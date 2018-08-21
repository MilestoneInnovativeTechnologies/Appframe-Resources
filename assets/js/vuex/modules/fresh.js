const state = {
};

const actions = {
    init({ commit }){
        axios({
            method: 'post',
            url: 'token/fresh',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
            }
        }).then(function({ headers }){
            commit('AUTH/setToken',headers['x-appframe-token'],{ root: true })
        });
    }
};

const mutations = {
};

const getters = {
};

export default {
    namespaced: true,
    state, getters, actions, mutations
};
