const state = {
    store: {},
    handler: {
        'FormData': 'addMap',
    }
};

const getters = {
    map: ({ store }) => (form) => store[form]
};

const actions = {
    addMap({ state,commit },{ _response_data,FormData }){
        _.forEach(FormData,(dObj,form) => {
            if(_.isNil(state.store[form])) {
                commit('addForm',{ form });
                _.forEach(_response_data['Form'][form]['fields'],(field) => {
                    commit('addField',{ form,field })
                })
            }
        });
    }
};

const mutations = {
    addForm: ({ store },{ form }) => _.isNil(store[form]) ? Vue.set(store,form,{}) : true,
    addField: ({ store },{ form,field }) => Vue.set(store[form],field.id,_.zipObject(['name','type','attribute','relation'],[field.name,field.type,field.name,undefined])),
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}