
const requireComponent = require.context('../components',true,/\.vue$/);

requireComponent.keys().forEach(Name => {
    let Options = requireComponent(Name);
    Vue.component(Name.replace(/^\.\/(_\w+\/)*(.*)\.\w+$/, '$2'),Options.default || Options);
});

import GraphLine3D from 'vue-graph/src/components/line3d.js'
import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'

Vue.component(GraphLine3D.name, GraphLine3D);
Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);
