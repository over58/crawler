const fs = require('fs');
const path = require('path');


/**
 * @description 删除文件或文件夹
 * @example
  deleteDirectoryOrFile(path.join(__dirname, './a'))
  deleteDirectoryOrFile(path.join(__dirname, './1.txt'))
 */
function deleteDirectoryOrFile (p) {

    if(fs.existsSync(p)) {

        if(fs.statSync(p).isDirectory()) {
            const files = fs.readdirSync(p)
            files.forEach((file) => {
                let curPath = path.join(p, file)
                console.log(curPath)
                deleteDirectoryOrFile(curPath)
            })

            fs.rmdirSync(p)
        }else{
            fs.unlinkSync(p)
        }
    }else{
        console.warn('路径不存在')
        return 
    }
}




/**
* @example
* @description 检测文件夹下的大文件
*
   checkLargeFileSize(path.join(__dirname,"../images"), function(file, stat){
       let size = Number(stat.size /1024).toFixed(2)
       if(/\.(jpg|png|gif|jpeg)$/ig.test(file) && size > 50 ) {
           console.log(`${file}  --- ${stat.size/1024}KB`)
       }
   })
*/

function checkLargeFileSize(p, callback) {
    if(fs.existsSync(p)) {
        fs.readdir(p, function(err,files) {
            if(err) {
                console.error(err)
                return
            }

            files.forEach(file => {
                let curPath = path.join(p, file)
                let stat = fs.statSync(curPath);
                if(stat.isFile()) {
                    callback && callback(curPath, stat)
                }else{
                    checkLargeFileSize(curPath, callback)
                }
            })
        })
    }else{
        console.warn('文件不存在')
    }
}



