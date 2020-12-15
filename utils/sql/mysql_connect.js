const mysql = require('mysql')

const client = mysql.createConnection({
    host: '127.0.0.1',  //如果需要ip方法，请详见mysql下面的ip链接相关文章。
    user: 'root',
    password: '',
    database: 'test',
    port: 3306 
}) 

client.connect();

let sql = `select * from test.todoList`
client.query(sql, function(err, results,fileds) {
    if(err){
        console.error(err)
        return
    }

    if(results) {
        for (var i = 0; i < results.length; i++) {
            console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].url);
        }
    }

    client.end()
})