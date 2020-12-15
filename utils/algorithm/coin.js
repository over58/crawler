// 找零钱


function Sum (arr = []) {
    return arr.reduce((res, cur) => {
        res+=cur
        return res
    }, 0)
}


function isEqualArray (arr1,arr2) {
    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)

    if(arr1.length !== arr2.length) {
        return false
    }else{
        for (var i = 0; i < arr1.length; i++) {
            if(arr1[i] !== arr2[i]) {
                return false
            }
        }
    }
    return true
}

function coin( target) {
    let ret = []
    
    function findTrack(track) {
        let sum = Sum(track)
        if (sum === target && !ret.some(x => isEqualArray(x, track.slice()))) {
            ret.push(track.slice())
            return
        }else if(sum> target) {
            return
        }
        
        for(let i = 0; i < coins.length; i++) {
            track.push(coins[i])
            findTrack(track)
            track.pop()
        }
    }
    
    findTrack([])
    
    return ret
}

let coins = [10,5,2,1]
console.log(coin( 20))