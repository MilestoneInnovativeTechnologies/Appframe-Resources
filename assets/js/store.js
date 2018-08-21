
import getters from './vuex/getters'
import mutations from './vuex/mutations'
import actions from './vuex/actions'

const vuexModules = {
    'AUTH': './vuex/modules/authentication',
    'FRSH': './vuex/modules/fresh',
    'MACT': './vuex/modules/menuaction',
    'SPST': './vuex/modules/serverpost',
    'CONT': './vuex/modules/content',
    'FORM': './vuex/modules/form',
    'LIST': './vuex/modules/list',
    'ACTN': './vuex/modules/appaction',
};

const modules = {
    ..._.mapValues(vuexModules,(Path) => require(Path + '.js').default)
};

global.AppVuexStore = new Vuex.Store({
    state: {
        ...(window.VuexStoreState),
        ...require('./vuex/state').default,
    },
    getters, mutations, actions,
    modules
});