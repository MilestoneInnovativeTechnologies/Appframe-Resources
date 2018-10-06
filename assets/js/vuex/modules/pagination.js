const state = {
    first: 5,
    last: 3,
    page: 1,
    cont: '...',
    list: {},
    handler: {
        'ListData': 'setList',
    },
};

const actions = {
};

const mutations = {
    setPage(state,page){ state.page = page },
    setList(state,{ ListData }){ state.list = Object.assign({},state.list,ListData); },
};

const getters = {
    list(state){ return (id) => state.list[id] },
    pages(state,getters){ return (id) => Math.ceil(parseInt(getters.list(id).count)/parseInt(getters.list(id).items)) },
    range_start(state,getters){ return (id) => {
        let pages = getters.pages(id);
        let start = (state.page + Math.ceil(state.first / 2)) - state.first; start = (pages <= (state.first + state.last) || start < 1) ? 1 : start;
        let end = start + state.first; end = (end >= pages) ? pages + 1 : end;
        return _.range(start,end);
    }},
    range_end(state,getters) { return (id) => {
        let pages = getters.pages(id) + 1, start = (pages - state.last) < 1 ? 1 : (pages - state.last);
        return _.range(start, pages)
    }},
    range(state,getters){ return (id) => {
        let start = getters.range_start(id), end = getters.range_end(id);
        if(_.head(start) !== 1) start.unshift(state.cont);
        if(_.head(end) - _.last(start) > 1) end.unshift(state.cont);
        else if(_.head(end) - _.last(start) < 1) end = _.difference(end,start);
        return _.concat(start,end);
    }}
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}