const os = require('os');


function getLocalIP () {
    const interfaces = os.networkInterfaces()
    for (const key in interfaces) {
        let interface =  interfaces[key]
        if(key === 'en0') {
            return interface.reduce((res, cur) => {
                res[cur.family] = cur
                return res
            }, {})
        }
    }
}


