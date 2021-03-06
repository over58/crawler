/**
 * @description 批量执行异步代码，同一时间只能执行指定最大数量的异步操作
 */
class BatchRequest {
    constructor(max = 3) {
        this.queue = [];
        this.max = max

    }

    addRequest(fn) {
        this.queue.push(fn)
    }

    run() {
        let count = 0

        let timer = setInterval(() => {
            if (this.queue.length) {
                Array.from({ length: Math.max(0, this.max - count) }).forEach(() => {
                    let fn = this.queue.shift()
                    if (fn) {
                        count++
                        fn().then(() => {
                            count--
                        })
                    }
                })
            } else {
                clearInterval(timer)
            }
        }, 10)

    }
}

function createPromise(time, text) {
    return function () {
        console.log('执行中~')
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log(text)
                resolve(text)
            }, time)
        })
    }
}

var client = new BatchRequest(5);
client.addRequest(createPromise(5000, '1000'))
client.addRequest(createPromise(5000, '2000'))
client.addRequest(createPromise(3000, '3000'))
client.addRequest(createPromise(3000, '3000'))
client.addRequest(createPromise(3000, '3000'))
client.addRequest(createPromise(3000, '3000'))
client.addRequest(createPromise(3000, '3000'))
client.addRequest(createPromise(3000, '3000'))

client.addRequest(createPromise(4000, '2000-2'))
client.addRequest(createPromise(2000, '1000-2'))
client.addRequest(createPromise(3000, '3000-2'))

client.run()