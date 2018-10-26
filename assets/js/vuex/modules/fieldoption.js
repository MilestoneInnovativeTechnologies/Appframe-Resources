const state = {
    store: {},
    latest: {},
    handler: {
        FieldOption: 'FieldOption',
        FieldOptionLatest: 'updateFieldOptionLatest',
    },
};

const actions = {
    fetch({ dispatch },{ id,latest }){ dispatch('post',{ action:'option',id,latest },{ root:true }) },
    FieldOption({ state,commit },{ FieldOption }){ _.each(FieldOption,(Options,Id) => { if(!_.isEmpty(Options)) (state.store[Id]) ? commit('addOption',{ Id,Options }) : commit('newOption',{ Id,Options }); })},
};

const mutations = {
    newOption({ store },{ Id,Options }){ Vue.set(store,Id,Options) },
    addOption({ store },{ Id,Options }){ Object.assign({},store[Id],Options) },
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
