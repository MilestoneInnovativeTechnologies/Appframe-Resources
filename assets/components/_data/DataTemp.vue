<script>
    export default {
        name: "DataTemp",
        functional:true,
        inheritAttrs:false,
        render(h,c){
            let data = c.props.data, names = Object.assign({},getDataNames(data),c.props.names), col = c.props.col || 4, layout = c.props.layout || getLayout(data,col);
            let attrs = {}, children = [], header = null, html = [];
            $.each(c.props,function(attr,value){
                if(attr === 'title') header = h('h5',{ class:'card-header' },[value]);
                else if(['data','layout','names'].indexOf(attr) > -1) { }
                else attrs[attr] = value;
            });
            $.each(layout,function(SecORColKey,SecORColData){
                if(isLayoutCollection(SecORColData)){
                    let attrs = {}, NCObj = CollectKey2NameCol(SecORColKey), CollObj = (typeof SecORColData === 'string') ? { data:SecORColData, method:null } : SecORColData;
                    attrs['title'] = NCObj.name; attrs['col-'+NCObj.col] = true;
                    attrs['data'] = ObjGet(data,CollObj.data); attrs['method'] = CollObj.method;
                    children.push(h('view-collection',{ attrs }));
                } else if(isLayoutSection(SecORColData)){
                    let props = {}, NCObj = SecKey2NameCol(SecORColKey), Names = SecORColData;
                    props['title'] = NCObj.name; props['col-'+NCObj.col] = true; props['items'] = getSectionItems(SecORColData,names,data);
                    children.push(h('view-section',{ props }));
                }
            });
            return h('div',{ class:'card',attrs },[header,h('div',{ class:'card-body' },[h('div',{ class:'row' },children)])]);
        }
    }
    let getDataNames = function(data){
        return prefixNames(data);
    };
    let prefixNames = function(Obj,prefix = ''){
        let NewObj = {};
        $.each(Obj,function(name,value){
            if(typeof value !== "object" || value === null) NewObj[getPrefixNameKey(prefix,name)] = userFriendlyReadableText(name);
            else if(Array.isArray(value)){
                if(isSimpleArray(value)) NewObj[getPrefixNameKey(prefix,name)] = userFriendlyReadableText(name);
                else Object.assign(NewObj,prefixNames(value[0],getPrefixNameKey(prefix,name)));
            } else{
                if(ArrayLikeObject(value)) NewObj[getPrefixNameKey(prefix,name)] = userFriendlyReadableText(name);
                else Object.assign(NewObj,prefixNames(value,getPrefixNameKey(prefix,name)));
            }
        });
        return NewObj;
    };
    let getPrefixNameKey = function(Prefix,Name){
        return [Prefix,Name].join(".").replace(/^\.|\.$/g,'');
    };
    let userFriendlyReadableText = function(text){
        if(typeof text !== 'string') return text;
        return text.replace(/\W|\_/g," ").replace(/\s+/g," ").split(" ").map(function(w){ return w.substr(0,1).toUpperCase()+w.substr(1); }).join(" ");
    };
    let getLayout = function(data,colSize = 3){
        let layout = {}, main_sec_key = getSectionKey('',colSize), mainSecItems = [];
        layout[main_sec_key] = mainSecItems;
        $.each(data,function(name,description){
            if(typeof description !== 'object' || null === description){ mainSecItems.push(name); }
            else if(Array.isArray(description)){
                if(isSimpleArray(description)) { mainSecItems.push(name); }
                else if(description.length === 1 && description[0] !== null){
                    let myObj = description[0];
                    if(isSection(myObj) || true) layout[getSectionKey(userFriendlyReadableText(name),colSize)] = getNewSection(myObj,name);
                    else mainSecItems.push(getNewGroup(userFriendlyReadableText(name),myObj,name));
                } else layout[getCollectionKey(userFriendlyReadableText(name),12)] = new Object({'data':name,'method':null});
            } else {
                if(ArrayLikeObject(description)){ mainSecItems.push(name); }
                else if(isSection(description) || true) layout[getSectionKey(userFriendlyReadableText(name),colSize)] = getNewSection(description,name);
                else mainSecItems.push(getNewGroup(userFriendlyReadableText(name),description,name));
            }
        });
        return getFriendlyLayout(layout);
    };
    let getTitleFromName = function(name,names,prefix = null){
        name = (prefix) ? getPrefixNameKey(prefix,name) : name;
        if(!names[name]) console.log('getTitleFromName Error: ',name,names);
        return names[name];
    };
    let getSectionKey = function(name = '',col = 3){
        return [name,'<',col,'>'].join('');
    };
    let getCollectionKey = function(name = '',col = 12){
        return [name,'<',col,'>'].join('');
    };
    let CollectKey2NameCol = function(Key){
        let name = /(\w|\s)*/g.exec(Key)[0];
        let col = /\<(\d+)\>$/g.exec(Key)[1];
        return { name,col };
    };
    let SecKey2NameCol = function(Key){
        let name = /(\w|\s)*/g.exec(Key)[0];
        let col = /\<(\d+)\>$/g.exec(Key)[1];
        return { name,col };
    };
    let isSection = function(Obj){
        return !!Object.values(Obj).filter(function(Val){ return (Val && typeof Val === 'object' && !Array.isArray(Val) && getComplicatedObjectValues(Val).length); }).length;
    };
    let isSimpleArray = function(Obj){
        return isKeysNumeric(Obj) && !Object.values(Obj).filter(function(Val){ return (Val && typeof Val === 'object') }).length;
    };
    let ArrayLikeObject = function(Obj){
        return isKeysNumeric(Obj) && !Object.values(Obj).filter(function(Val){ return (Val && typeof Val === 'object') }).length;
    };
    let isKeysNumeric = function(Obj){
        return Array.isArray(Obj) || !Object.keys(Obj).filter(Key => (Key && isNaN(Key))).length
    };
    let hasObjectValues = function(Obj){
        return !!getObjectValues(Obj).length
    };
    let getObjectValues = function(Obj){
        return Object.values(Obj).filter(function(Val){ return (Val && typeof Val === 'object'); })
    };
    let hasComplicatedObjectValues = function(Obj){
        return !!getComplicatedObjectValues(Obj);
    };
    let getComplicatedObjectValues = function(Obj){
        return Object.values(Obj).filter(function(Val){ return (Val && typeof Val === 'object' && !isSimpleArray(Val)); })
    };
    let getItemObjFromSimpleArray = function(Ary,title = null){
        return { title,description:Ary.join(", ") };
    };
    let getItemObjFromArrayLikeObj = function(Obj,title = null){
        return { title,description:Object.values(Obj).join(", ") };
    };
    let getNewGroup = function(Title,Obj,Prefix = ''){
        let myGrp = {}, grpItems = []; myGrp[Title] = grpItems;
        $.each(Obj,function(term,desc){
            if(typeof desc !== 'object' || desc === null) grpItems.push(getPrefixNameKey(Prefix,term));
            else if(Array.isArray(desc)){
                if(isSimpleArray(desc)) grpItems.push(getPrefixNameKey(Prefix,term));
                else grpItems.push(getFetchableValueNameFromCollection(desc,getPrefixNameKey(Prefix,term)))
            } else {
                console.log(`View Layout -> Main Section -> Group: Ignoring many items of ${Prefix}, as its again nested object.`,desc);
                grpItems.push(getFetchableValueName(desc,getPrefixNameKey(Prefix,term)));
            }
        });
        return myGrp;
    };
    let getNewSection = function(data, Prefix = ''){
        let section_items = [];
        $.each(data,function(name,description){
            let prefixedName = getPrefixNameKey(Prefix,name);
            if(typeof description !== 'object' || null === description){ section_items.push(prefixedName); }
            else if(Array.isArray(description)){
                if(isSimpleArray(description)) { section_items.push(prefixedName); }
                else if(description.length === 1 && description[0] !== null){
                    let myObj = description[0];
                    if(isSection(myObj)) console.log(`Section inside Array of A Section. IGNORING...${prefixedName}...`,myObj);
                    else section_items.push(getNewGroup(userFriendlyReadableText(name),myObj,prefixedName));
                } else {
                    console.log(`Collection received inside A section. IGNORING...${prefixedName}...`,description);
                }
            } else {
                if(ArrayLikeObject(description)){ section_items.push(prefixedName); }
                else if(isSection(description)){ console.log(`Section inside Section. IGNORING...${prefixedName}...`,description) }
                else section_items.push(getNewGroup(userFriendlyReadableText(name),description,prefixedName));
            }
        });
        return section_items;
    };
    const fetchableKeys = ['name','description','details','display'];
    let getFetchableValueName = function(Obj,Prefix = ''){
        for(let x in fetchableKeys) if(Obj.hasOwnProperty(fetchableKeys[x])) return getPrefixNameKey(Prefix,fetchableKeys[x]);
        return getPrefixNameKey(Prefix,Object.keys(Obj)[0]);
    };
    let getFetchableValueNameFromCollection = function(Ary,Prefix = ''){
        for(let x in fetchableKeys) if(Ary[0].hasOwnProperty(fetchableKeys[x])) return getPrefixNameKey(Prefix,fetchableKeys[x]);
        return getPrefixNameKey(Prefix,Object.keys(Ary[0])[0]);
    };
    let isLayoutSection = function(Data){
        return (Data !== null && typeof Data === 'object' && Array.isArray(Data));
    };
    let isLayoutCollection = function(Data){
        return ((typeof Data === 'string') || (Data !== null && typeof Data === 'object' && !Array.isArray(Data)));
    };
    let ObjGet = function(Obj,name){
        let name_parts = name.split(".");
        return name_parts.reduce(function(ac,cv){ return (!cv || !ac) ? null : ac[cv] },Obj)
    };
    let getSectionItems = function(Ary,Names,Data){
        let SecItems = {};
        $.each(Ary,function(i,Name){
            if(Name && typeof Name === 'object'){
                let myTitle = Object.keys(Name)[0];
                let myItems = Name[myTitle];
                SecItems[myTitle] = getSecGroupItems(myItems,Names,Data);
            } else if(Name){
                SecItems[getTitleFromName(Name,Names)] = getCorrectedDescription(ObjGet(Data,Name),Data,Name);
            }
        });
        return SecItems;
    };
    let getSecGroupItems = function(Ary,Names,Data){
        return $.map(Ary,function(Name){
            let title = getTitleFromName(Name,Names);
            let description = ObjGet(Data,Name);
            description = getCorrectedDescription(description,Data,Name)
            return { title,description };
        })
    };
    let getCorrectedDescription = function(description,Data,Name){
        if (description === null || description === undefined) return ObjGetMergableValues(Data, Name);
        if(typeof description === 'object') {
            if (Array.isArray(description) && isSimpleArray(description)) return description.join(', ');
            if(ArrayLikeObject(description)) return Object.values(description).join(", ");
        }
        return description;
    };
    let ObjGetMergableValues = function(Data,Name){
        let OutAry = Data;
        $.each(Name.split("."),function(i,Key){
            OutAry = (isKeysNumeric(OutAry)) ? ObjectIndex(OutAry,Key) : ObjGet(OutAry,Key);
        });
        return getMergedData(OutAry)

    };
    let getMergedData = function(Obj){
        if(typeof Obj !== 'object' || !Obj) return Obj;
        if(Array.isArray(Obj) && isSimpleArray(Obj)) return Obj.join(", ");
        if(!Array.isArray(Obj) && ArrayLikeObject(Obj)) return Object.values(Obj).join(", ");
    };
    let ObjectIndex = function(Ary,Index){
        return $.map(Ary,Obj => (Obj && Obj.hasOwnProperty(Index)) ? Obj[Index] : null )
    };
    let getFriendlyLayout = function(layout){
        return layout;
    }

</script>
