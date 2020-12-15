function filter(array, predicate) {
    let index = -1
    let length = array === null ? 0 : array.length
    let result = []
    let resIndex = 0

    while (++index < length) {
        const value = array[index]
        if(predicate(value, index, array)) {
            result[resIndex++] = value
        }
    }

    return result
}


const users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred', 'active': false }
]

console.log(

    filter(users, function(item, key) {
        return item.active
    })
)