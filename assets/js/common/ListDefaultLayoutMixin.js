export const listDefaultLayoutMixin = {

    methods: {
        defaultLayout(lists){
            return _(_.head(_.values(lists))).pickBy((val) => !(_.isArray(val) || _.isObject())).keys().mapKeys((field) => _.startCase(_.replace(field,/(\W|_)/g,' '))).mapValues((field) => _.zipObject(['field','path'],[field,''])).value();
        }
    }

}