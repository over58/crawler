/**
 * @author over58
 * @description 爬取http://www.zongheng.com/网站的小说免费章节
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { htmlToText} = require('html-to-text')

class Novel {
    constructor (bookId, output) {
        this.bookId = bookId
        this.chapterList = []
        this.output = output || path.join(__dirname, "output", ''+this.bookId)
        this.writeIndex = 1
        this.bookName = ''
        this.getChapterList(1,true)
    }

    getChapterList(pageNum = 1, refresh = false) {
        var that = this
        function handleChapterTitle(data) {
            var { chapterlist: { chapters = [], chapterCount } } = data
            that.chapterList = that.chapterList.concat(chapters)
            console.log(that.chapterList.length, chapterCount)
            if (that.chapterList.length < chapterCount) {
                that.getChapterList(pageNum + 1)
            } else {
                that.getBody()
            }
        }

        if (refresh) this.cleanUp()
        axios.get(`https://m.zongheng.com/h5/ajax/chapter/list?h5=1&bookId=${this.bookId}&pageNum=${pageNum}&asc=0&callback=handleChapterTitle`).then(res => {
            eval(res.data)
        }).catch(err => {
            console.error(`第${pageNum}页章节获取是失败~`, err)
        })
    }

    
    
    getBody() {
        var that = this
        function handleChapterContent(data) {
           const { result: { chapterName, content, bookName } } = data
            that.bookName = bookName
            const text = htmlToText(content, { wordWrap: 130})
           let p = path.join(__dirname, `./output/${that.bookId}/${that.writeIndex++}-${chapterName}.txt`)
           if (fs.existsSync(p)) {
               fs.writeFileSync(p, text)
           } else {
               fs.writeFileSync(p, text)
           }
    
           console.log(`${chapterName}  写入成功~`)
       }
        const proms = this.chapterList.map(chapter => {
            return axios.get(`https://m.zongheng.com/h5/ajax/chapter?bookId=${this.bookId}&chapterId=${chapter.chapterId}&v=1607927882186&callback=handleChapterContent`)
        })
        Promise.all(proms).then(ress => {
            ress.forEach(res => {
                eval(res.data)
            })
        })
    }

     cleanUp(){
        if(fs.existsSync(this.output)) {
            fs.readdir(this.output, (err, files) => {
                if(err) {
                    console.error(err)
                    return
                }

                files.forEach(file => {
                    fs.unlinkSync(path.join(this.output,file))
                })
            })
        }else{
            fs.mkdirSync(this.output, { recursive:true})
        }
    }

}

new Novel(981143)
new Novel(912802)