const page = {
    title: null,
    loading: false,
};

const request_items = [
    'action', //Requesting Action
    'type', //Requesting Content type ex: Form, List, Data
    'item', //Requesting Content type's id ex: Form ID, List ID, Data ID
    'page', //Page no to load a list
    'force', //Force if any particular actions
];

const request = {
    head: {
        parent: {
            ...requestItemObject(),
            parent: {
                ...requestItemObject(),
                parent: {
                    ...requestItemObject(),
                }
            }
        },
        route_params: {}, //Route Parameters
        source: {
            route: null, //Route name
            component: null, //Component Name
        },
        relations: [], //Data relations, ids of relations
        relate_items: {}, //Relation ID:Data ID
    },
    item: requestItemObject(),//_(request_items).mapKeys(v => v).mapValues(() => null).value(),
    data: {}, //User submitted data, name:value pair.
    action: null, //All server communications entry point, action must be set.
};

export default {
    page, request_items, request
}

function requestItemObject(){
    return _(request_items).mapKeys(v => v).mapValues(() => null).value()
}