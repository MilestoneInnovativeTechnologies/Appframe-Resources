
//
// Extract a property from an array of objects
// If array is passing as 2nd argument, extractions goes to the deep
//
export function extractPropertyFromAll(Obj, Key){
    if(Array.isArray(Key)){
        $.each(Key,function(i,key){ Obj = extractPropertyFromAll(Obj,key); });
        return Obj;
    }
    return $.map(Obj,function(ObjProp){ return ObjProp[Key]; });
}

//
// Get object from an array with key
// Optionally each object properties can also parsed while sending 3rd argument
// or else, All properties get returned
//
export function getKeyedObject(Obj,Key,Values){
    let KeyedObject = {}; Values = Values || Object.keys(Obj[Object.keys(Obj)[0]]);
    $.each(Obj,function(i,objProp){ KeyedObject[objProp[Key]] = _.pick(objProp,Values); });
    return KeyedObject;
}
