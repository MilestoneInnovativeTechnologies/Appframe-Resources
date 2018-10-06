const state = {
    first: 5,
    last: 3,
    page: 1,
    cont: '...',
    list: {},
    items: {},
    handler: {
        List: 'setListPageOneItems',
        ListData: 'setList',
        ListPageItems: 'setListPageItems'
    },
};

const actions = {
    setListPageOneItems({ commit },{ List,_response_data }){
        if(_response_data.Resolve) _.each(List,(Ary,list) => commit('setListPageItem',{ list,page:1,items:_.map(Ary,'id') }) )
    },
    setListPageItems({ commit },{ ListPageItems }){
        _.each(ListPageItems,(pageItems,list) => _.each(pageItems,(items,page) => commit('setListPageItem',{ list,page,items })))
    },
    pageWiseArrange({ state,commit },{ list }){
        let all = _.uniq(_.flatMap(state.items[list]));
        _.each(_.chunk(all,state.list[list].items),(items,idx) => commit('setListPageItem',{ list,page:idx+1,items}) )
    }
};

const mutations = {
    setPage(state,page){ state.page = page },
    setList(state,{ ListData }){ state.list = Object.assign({},state.list,ListData); _.each(ListData,(data,list) => Vue.set(state.items,list,{})) },
    setListPageItem(state,{ list,page,items }){ Vue.set(state.items[list],page,items) },
};

const getters = {
    list(state){ return (id) => state.list[id] },
    pages(state,getters){ return (id) => Math.ceil(parseInt(getters.list(id).count)/parseInt(getters.list(id).items)) },
    items(state){ return (id) => state.items[id][state.page] },
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