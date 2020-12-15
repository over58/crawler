function flatDeep(params) {
    return params.flat(Infinity)
}


function flatDeep2(params) {
    function flat(arr) {
        return arr.reduce((res, cur) => {
           res =  res.concat(Array.isArray(cur) ? flat(cur) : cur)
           return res
       }, [])

    }

    return flat(params)
}

function flatDeep3(params) {
    
    function flat(arr) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            let cur = arr[i]
            res = res.concat(Array.isArray(cur) ? flat(cur) : cur)
        }
        return res
    }

    return flat(params)
}



function flatDeep4(params) {
    return Array.prototype.toString.call(params).split(",").map(x => parseInt(x, 10))
}

var arr = [1, 2, [3, 4, [5, [6, [7]]]]]

console.log(
    flatDeep4(arr)
)