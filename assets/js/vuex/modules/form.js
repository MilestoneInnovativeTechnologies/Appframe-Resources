const state = {
    store: {},
    values: {},
    invalids: {}
};

const actions = {
    setComponent({ commit }){
        let type = 'setRequest',
            request = { head: { source: { component: 'AppForm' } } };
        commit({ type, request }, { root:true });
    },
    setRequestItems({ getters,commit }){
        let item = getters.formId, type = 'Form';
        commit('setRequestItems', { item,type }, { root:true });
    },
    getForm({ dispatch }){
        dispatch('setRequestItems');
        dispatch('SPST/postRequestServer', null, { root:true })
    },

    newItem({ dispatch },{ data }){
        if(data.Form) dispatch('newForm',data);
        if(data.Validation) dispatch('newValidation',data);
    },

    newForm({ commit },data){
        let id = data.request.item.item, Obj = data.Form[id], name = Obj.name, title = Obj.title, action = Obj.action_text,
            fields = getFieldExtract(Obj.fields), form = { name,title,action,fields }, values = getValueExtract(fields), invalids = getInvalidExtract(fields),
            type = 'storeForm', payload = { type,id,form,values,invalids };
        commit(payload);
    },

    newValidation({ getters,commit },data){
        let validation = data.Validation, form = data.request.item.item;
        if(!validation.status && !_.isEmpty(validation.errors)){
            _.forEach(validation.errors,function(invalids,field){
                let value = getters.value(form,field), text = invalids[0];
                commit('addInvalid',{ form,field,value,text });
            })
        }

    },

    setParent({ getters,commit }){
        let request = { head: { parent: { name:'Form', item:getters.formId } } }, type = 'setRequest', payload = { type,request};
        commit(payload, { root:true })
    },

    loadOptions({ getters,commit,dispatch },payload){
        let item = { type:'List', item: getters.form.fields[payload.field].options.resource_list };
        commit('setRequestItems', item, { root:true });
        dispatch('SPST/postRequestServer', null, { root:true });
    },

    submitForm({ commit,dispatch },id){
        commit('setRequestItems', { type: 'Form', item: id, action: 'Submit' }, { root:true });
        dispatch('prepareRequestData',id).then(() => dispatch('SPST/postRequestServer', null, { root:true }));
    },

    prepareRequestData({ state,commit },id){
        let values = state.values[id];
        commit('setRequestData', values, { root:true });
    }

};

const mutations = {
    storeForm(state,payload){
        let form = {}, values = {}, invalids = {};
        form[payload.id] = payload.form; values[payload.id] = payload.values; invalids[payload.id] = payload.invalids;
        state.store = Object.assign({},state.store,form);
        state.values = Object.assign({},state.values,values);
        state.invalids = Object.assign({},state.invalids,invalids);
    },
    updateValue(state,payload){
        state.values[payload.form][payload.field] = payload.value;
    },
    addInvalid(state,{ form,field,value,text }){
        if(!state.invalids[form]) state.invalids[form] = {};
        if(!state.invalids[form][field]) state.invalids[form][field] = {};
        if(!state.invalids[form][field][value]) state.invalids[form][field][value] = '';
        state.invalids[form][field][value] = text;
    }
};

const getters = {
    formId(state,getters,rootState,rootGetters){ return (rootGetters['CONT/type'] === 'Form') ? rootGetters['CONT/item'] : null },
    form(state,getters){ return state.store[getters.formId] },
    value(state){
        return function(form,field){
            return state.values[form][field]
        }
    },
    invalid(state,getters){
        return function(form,field){
            return (state.invalids &&
                state.invalids[form] &&
                state.invalids[form][field] &&
                state.invalids[form][field][getters.value(form,field)])
                ? state.invalids[form][field][getters.value(form,field)]
                : null;
        }
    },
    list(state,getters,rootState){ return function(field){
        let listId = getters.form.fields[field].options.resource_list;
        return (rootState.LIST.store && rootState.LIST.store[listId])
            ? rootState.LIST.store[listId].data
            : null;
    } }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}

function getFieldExtract(fieldsObj){
    return _(fieldsObj).flatMapDepth(function(v){
        return _.merge(
            _.pick(v,['name','value','type','label']),
            _(v.attributes).keyBy('name').mapValues(V => V.value).value(),
            { options:_.pick(v.options,['preload','label_attr','value_attr','resource_list']) }
        )
    },1).keyBy('name').value();
}

function getValueExtract(fields){
    let ArrayValues = ['checkbox'];
    return _.mapValues(fields,function(obj){
        return _.indexOf(ArrayValues,obj.type) > -1 ? [] : ''
    });
}

function getInvalidExtract(fields){
    return _.mapValues(fields,function(){
        return { '': null };
    });
}