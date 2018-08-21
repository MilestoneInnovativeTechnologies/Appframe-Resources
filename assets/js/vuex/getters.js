import * as VX from '../common/Vuex';

export default {
    config(state){ return state.serverConfig; },
    response(state){ return state.serverResponse; },
    logout(state){ return state.logout_url },
    user(state){ return getUser(state.data); },
    groups(state){ return VX.getKeyedObject(state.data.groups,'id',['name','title']) },
    roles(state){ return VX.getKeyedObject(VX.extractPropertyFromAll(state.data.groups,'roles'),'id',['name','title']) },
    _resources(state){ return VX.extractPropertyFromAll(state.data.groups,['roles','resources']) },
    resources(state,getters){ return _.mapValues(_.keyBy(getters._resources,'resource.id'),'resource.title') },
    _actions(state,getters){ return _.flatten(_.map(getters._resources,'actions')) },
    actions(state,getters){ return VX.getKeyedObject(getters._actions,'id',['confirm','on','icon','set','type','title','method','resource']) },
    menu(state,getters){ return _.mapValues(_.groupBy(getters._actions,'resource'),function(_ary){ return VX.getKeyedObject(_ary,'id',['menu','id']) }) },

    authToken(state){ return state['AUTH'].token; },
}

function getUser(Obj){
    return _.pick(Obj,['name','email']);
}

