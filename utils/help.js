function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
        return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}


function forEach(params, fn) {
    if(typeof params === undefined || params === null) {
        return
    }

    // 强制转为array
    if(typeof params !== 'object') {
        paras = [params]
    }

    if(Array.isArray(params)) {
        for(var i = 0; i < params.length; i++) {
            fn.call(null, params[i], i, params)
        }
    }else{
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                fn.call(null, params[key], key, params)
            }
        }
    }
}

function merge() {
    var result = {}

    function assignValue (value, key) {
        if(isPlainObject(result[key]) && isPlainObject(value)) {
            result[key] = merge(result[key], value)
        } else if (isPlainObject(value)) {
            result[key] = merge({}, value)
        }else if(Array.isArray(value)) {
            result[key] = value.slice()
        }else{
            result[key] = value
        }
    }

    for (let i = 0; i < arguments.length; i++) {
        forEach(arguments[i],assignValue)
    }
    return result;
}

console.log(

    merge({foo:4}, {foo:3, age: 30})
)