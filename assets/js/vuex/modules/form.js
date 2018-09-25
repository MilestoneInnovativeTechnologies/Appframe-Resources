const state = {
    handler: {
        Form: 'newForm',
        Validation: 'newValidation',
        FormData: 'newFormData',
        FormSubmitData: ['addFormSubmitData','showResponsePage'],
    },
    forms: {},
    layout:{},
    data: {},
    invalids: {},
    submitting: {},
    formrecord: {},
    collection: {},
    collectiondata: {},
    submit: {},
};

const actions = {

    newForm({ commit,dispatch },{ Form }){
        let id = _.keys(Form)[0], form = _.pick(Form[id],['name','title','action_text']);
        form['fields'] = getFieldExtract(Form[id].fields);
        let data = getValueExtract(form['fields']), invalids = getInvalidExtract(form['fields']), layout = getLayoutExtract(Form[id]['layout'],Form[id]['fields']),
            type = 'storeForm', payload = { type,id,form,data,invalids,layout };
        commit(payload);
        if(Form[id].collections && !_.isEmpty(Form[id].collections)) dispatch('addCollection',{ form:id,Collection:Form[id].collections })
    },

    submit({ state,commit,dispatch },{ form,action,record }){
        let data = state.data[form];
        if(!_.isEmpty(state.collection[form])) _.each(state.collection[form],(cForm,collection) => _.set(data,collection,state.collectiondata[cForm][collection]) );
        commit('submitting',{ form,status:true });
        dispatch('post', { data,action,form,record }, { root:true });
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

    newFormData({ getters,commit },{ FormData,_response_data }){
        let form = _.keys(FormData)[0], fields = _.keys(getters.form(form).fields),
            dataId = _.keys(FormData[form])[0], record = FormData[form][dataId], data = _response_data.Data[dataId];
        commit('setFormRecord',{ form,record }); if(!data) return;
        _.forEach(fields,function(field){ let value = _.get(data,field); commit('updateValue',{ form,field,value }); })
    },

    showResponsePage({ dispatch },{ _response_data }){
        let request = _response_data.request, name = 'form-submit-' + (request.record ? 'update' : 'new'),
            params = { action:request.action,form:request.form,record:request.record,id:request.record };
        dispatch('navigate', { name,params }, { root:true });
    },

    addCollection({ dispatch,commit },{ form,Collection }){
        _.each(Collection,(collection) => { let Form = {}; Vue.set(Form,collection.form.id,collection.form); dispatch('newForm',{ Form }); commit('addCollection',{ form,collection }); })
    }

};

const mutations = {
    storeForm(state,payload){
        let id = payload.id, submitting = {};
        submitting[id] = false;
        Vue.set(state.forms,id,payload.form);
        _.each(['layout','data','invalids'],(itm) => Vue.set(state[itm],id,payload[itm]));
        state.submitting = Object.assign({},state.submitting,submitting);
    },
    updateValue(state,{ form,field,value }){ state.data[form][field] = value },
    addInvalid(state,{ form,field,value,text }){ Vue.set(state.invalids[form][field],value,text); },
    submitting(state,{ form,status }){ state.submitting[form] = status },
    setFormRecord(state,{ form,record }){ state.formrecord = Object.assign({},state.formrecord,_.fromPairs([[form,record]])) },
    addFormSubmitData(state,{ FormSubmitData }){ let id = _.keys(FormSubmitData)[0]; if(!state.submit[id]) state.submit = Object.assign({},state.submit,_.fromPairs([[id,null]])); state.submit[id] = FormSubmitData[id]; },
    delFormSubmitData(state,id){ state.submit[id] = null; },
    reset(state,id){ _.each(state.data[id],(value,field) => state.data[id][field] = (_.isArray(value)) ? [] : '') },
    addCollection(state,{ form,collection }){
        if(!state.collection[form]) Vue.set(state.collection,form,{});
        let cForm = collection.form.id, cRel = collection.relation ? _.snakeCase(collection.relation.method) : null;
        if(!state.collectiondata[cForm]) Vue.set(state.collectiondata,cForm,{});
        Vue.set(state.collection[form],cRel,cForm); Vue.set(state.collectiondata[cForm],cRel,{});
    },
    addCollectionValue(state,{ form,collection,id }){
        let data = _.clone(state.data[form]);
        _.each(state.data[form],(val,name) => Vue.set(state.data[form],name,_.isArray(val) ? [] : ''));
        Vue.set(state.collectiondata[form][collection],id,data)
    },
    delCollectionValue(state,{ form,collection,id }){
        Vue.delete(state.collectiondata[form][collection],id);
    }
};

const getters = {
    form(state){ return (id) => state.forms[id] },
    layout(state){ return (id) => state.layout[id] },
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
    } },
    getSubmit(state){ return (id) => state.submit[id] },
    collection(state){ return (id) => state.collection[id] },
    collectiondata(state){ return (form,collection) => (collection) ? state.collectiondata[form][collection] : state.collectiondata[form] },
    option(state,getters){ return (form,field) => getters.form(form).fields[field].options },
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
            { options:_.omit(v.options,['created_at','updated_at']) }
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

function getLayoutExtract(layout,fields){
    if(_.isEmpty(layout)) return [];
    let Fields = _(fields).keyBy('id').mapValues('name').value();
    return _(layout).keyBy(function(l){ return Fields[l.form_field] }).mapValues('colspan').value();
}