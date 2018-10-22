const state = {
    token: null,
    code: null,
    details: {
        200: [true,'',''],
        400: [false,'Invalid Authentication Token!','The authentication token found is invalid or expired. Please login again to continue.','login'],
        401: [false,'Authentication Failed!','The authentication session seems to be invalid or expired. Please login to continue','login'],
        406: [false,'Not Acceptable','The requested action is not available for you.'],
        419: [false,'Authentication Failed!','The authentication session seems to be invalid or expired. Please login to continue','login'],
    }
};

const getters = {
    status(state){ return (state.code && state.details.hasOwnProperty(state.code)) ? state.details[state.code][0] : false; },
    title(state){ return (state.code && state.details.hasOwnProperty(state.code)) ? state.details[state.code][1] : 'Authentication warning'; },
    description(state){ return (state.code && state.details.hasOwnProperty(state.code)) ? state.details[state.code][2] : 'Unknown error occurred. Please login again.'; },
    extra(state){ return (state.code && state.details.hasOwnProperty(state.code) && state.details[state.code][3]) ? state.details[state.code][3] : false; },
};

const mutations = {

    respStatus(state, code) {
        state.code = code;
    },

    setToken(state,token) {
        state.token = token;
    },
};

const actions = {
    init({ commit,rootState }){
        axios({
            method: 'post',
            url: '/' + _.trim(rootState.root_path,'/') + '/token/fresh',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
            }
        }).then(function({ headers }){
            commit('setToken',headers['x-appframe-token'])
        });
    },
    requestInterceptor({ commit },config){
        config.headers['X-Appframe-Token'] = state.token;
        commit('updateConfig',config,{ root:true });
    },
    responseInterceptor({ commit },response){
        commit('respStatus',response.status);
        commit('setToken',response.headers['x-appframe-token']);
    },
};

export default {
    namespaced: true,
    state, getters, mutations, actions
}
