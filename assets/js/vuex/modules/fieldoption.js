const state = {
    store: {},
    latest: {},
    handler: {
        FieldOption: 'newOption',
        FieldOptionLatest: 'updateFieldOptionLatest',
    },
};

const actions = {
    fetch({ dispatch },{ id,latest }){ dispatch('post',{ action:'option',id,latest },{ root:true }) },
};

const mutations = {
    newOption(state,{ FieldOption }){
        _.each(FieldOption,(Option,Id) => _.isEmpty(Option) ? Option : Vue.set(state.store,Id,Option) )
    },
    updateFieldOptionLatest(state,{ FieldOptionLatest }){
        _.each(FieldOptionLatest,(latest,id) => latest ? Vue.set(state.latest,id,latest) : null)
    }
};

const getters = {
    get(state){ return (id) => state.store[id] },
    latest(state){ return (id) => state.latest[id] || 0 },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}