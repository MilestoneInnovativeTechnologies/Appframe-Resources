
const requireComponent = require.context('../components',true,/\.vue$/);

requireComponent.keys().forEach(Name => {
    let Options = requireComponent(Name);
    Vue.component(Name.replace(/^\.\/(_\w+\/)*(.*)\.\w+$/, '$2'),Options.default || Options);
    //console.log(Name,Name.replace(/^\.\/(_\w+\/)*(.*)\.\w+$/, '$2'))
});
