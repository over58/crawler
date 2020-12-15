function quanpailie( nums) {
    let ret = []

    function findTrack(track, nums) {
        // 满足条件，退出
        if(track.length === nums.length) {
            ret.push(track.slice())
            return
        }
        
        for(var i = 0; i < nums.length; i++) {
            // 决定如何做出选择
            if(track.includes(nums[i])) {
                continue
            }
    
            // 做出选择
            track.push(nums[i])
            // 进入下一层选择树
            findTrack(track, nums)
            // 撤销选择
            track.pop()
        }
    }

    findTrack([], nums)
    return ret

}

console.log(
    quanpailie( [1, 2, 3, 4,5,6,7,8, 9,10])
)