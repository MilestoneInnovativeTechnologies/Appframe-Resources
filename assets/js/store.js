
import getters from './vuex/getters'
import mutations from './vuex/mutations'
import actions from './vuex/actions'

import MACT from './vuex/modules/menuaction';
import AUTH from './vuex/modules/authentication';
import SPST from './vuex/modules/serverpost';
import CONT from './vuex/modules/content';
import FORM from './vuex/modules/form';
import LIST from './vuex/modules/list';
import ACTN from './vuex/modules/appaction';

const modules = {
    MACT, AUTH, SPST, CONT, FORM, LIST, ACTN
};

global.AppVuexStore = new Vuex.Store({
    state: {
        ...(window.VuexStoreState),
        ...require('./vuex/state').default,
    },
    getters, mutations, actions,
    modules
});