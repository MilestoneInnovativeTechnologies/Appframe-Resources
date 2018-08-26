const state = {
    handler: {
        Form: 'newForm',
        Validation: 'newValidation',
    },
    forms: {},
    data: {},
    invalids: {},
    submitting:{},
};

const actions = {

    newForm({ commit },{ Form }){
        let id = _.keys(Form)[0], form = _.pick(Form[id],['name','title','action_text']);
        form['fields'] = getFieldExtract(Form[id].fields);
        let data = getValueExtract(form['fields']), invalids = getInvalidExtract(form['fields']),
            type = 'storeForm', payload = { type,id,form,data,invalids };
        commit(payload);
    },

    submit({ state,rootGetters,commit,dispatch },{ form }){
        let data = state.data[form], action = rootGetters.criteriaAction({ type:'Form',idn1:form });
        commit('submitting',{ form,status:true });
        dispatch('post', { data,action,form }, { root:true });
    },

    newValidation({ getters,commit },{ Validation }){
        let form = _.keys(Validation)[0], validation = Validation[form];
        if(!validation.status && !_.isEmpty(validation.errors)){
            _.forEach(validation.errors,function(invalids,field){
                let value = getters.value(form,field), text = invalids[0];
                commit('addInvalid',{ form,field,value,text });
            })
        }
        commit('submitting',{ form,status: false })
    },

    loadOptions({ getters,commit,dispatch },payload){
        let item = { type:'List', item: getters.form.fields[payload.field].options.resource_list };
        commit('setRequestItems', item, { root:true });
        dispatch('SPST/postRequestServer', null, { root:true });
    },

};

const mutations = {
    storeForm(state,payload){
        let form = {}, data = {}, invalids = {}, submitting = {};
        form[payload.id] = payload.form; data[payload.id] = payload.data; invalids[payload.id] = payload.invalids; submitting[payload.id] = false;
        state.forms = Object.assign({},state.forms,form);
        state.data = Object.assign({},state.data,data);
        state.invalids = Object.assign({},state.invalids,invalids);
        state.submitting = Object.assign({},state.submitting,submitting);
    },
    updateValue(state,payload){
        state.data[payload.form][payload.field] = payload.value;
    },
    addInvalid(state,{ form,field,value,text }){
        if(!state.invalids[form]) state.invalids[form] = {};
        if(!state.invalids[form][field]) state.invalids[form][field] = {};
        if(!state.invalids[form][field][value]) state.invalids[form][field][value] = '';
        state.invalids[form][field][value] = text;
    },
    submitting(state,{ form,status }){ state.submitting[form] = status }
};

const getters = {
    form(state){ return (id) => state.forms[id] },
    value(state){ return (formId,fieldName) => state.data[formId][fieldName] },
    invalid(state,getters){
        return function(formId,fieldName){
            return (state.invalids &&
                state.invalids[formId] &&
                state.invalids[formId][fieldName] &&
                state.invalids[formId][fieldName][getters.value(formId,fieldName)])
                ? state.invalids[formId][fieldName][getters.value(formId,fieldName)]
                : null;
        }
    },
    submitting(state){ return (formId) => state.submitting[formId] },

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

function getSubmittingExtract(id){
    let submitting = {}; submitting[id] = false; return submitting;
}