export default {

    setPageTitle(state,payload){ state.page.title = _.isObject(payload) ? payload.title : payload; },
    pageLoading(state,payload){ state.page.loading = _.isObject(payload) ? (payload.loading || payload.status || payload.load) : payload; },

    setRouteParams(state, payload) { _.merge(state.request.head.route_params, payload); },
    setRequestData(state,data){ _.merge(state.request.data, data); },
    setRequest(state, payload) { _.merge(state.request, payload.request); },
    setRequestItems(state, payload) {
        let newItem = {}, item = state.request.item, oldParent = state.request.head.parent, parent = delMyLastParent(oldParent);
        _.forEach(state.request_items,(v) => { newItem[v] = (payload.hasOwnProperty(v)) ? payload[v] : null } );
        state.request.item = newItem; state.request.head.parent = _.merge({},item,{ parent  })
    },
    setRequestRelations(state,payload){ state.request.head.relations = payload.relations; state.request.head.relate_items = payload.relate_items;  }

}

function delMyLastParent(Obj){
    if(!hasParentProperty(Obj)) return null;
    if(!hasParentProperty(Obj.parent)) { delete Obj.parent; return Obj; }
    return _.merge({},Obj,{ parent:delMyLastParent(Obj.parent) });
}
function hasParentProperty(Obj){
    return Obj.hasOwnProperty('parent');
}