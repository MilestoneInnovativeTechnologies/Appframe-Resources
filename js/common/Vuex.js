
//
// Extract a property from an array of objects
// If array is passing as 2nd argument, extractions goes to the deep
//
export function extractPropertyFromAll(Obj, Key){
    if(_.isArray(Key))
        return _.reduce(Key,function(obj,key){ return extractPropertyFromAll(obj,key) },Obj);
    return _.flatMap(Obj,Key)
}

//
// Get object from an array with key
// Optionally each object properties can also parsed while sending 3rd argument
// or else, All properties get returned
//
export function getKeyedObject(Obj,Key,Values){
    Values = Values || _.keys(_.head(Obj));
    return _(Obj).keyBy(Key).mapValues(obj => _.pick(obj,Values)).value();
}
