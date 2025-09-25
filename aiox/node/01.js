const fs=require('fs')
const path=require('path')
//写入文件
fs.writeFile(path.join(__dirname,'./text.txt'),'hello world',err=>{
    if(err) console.log(err);
    else console.log('写入成功');
})
fs.readFile('./text.txt',(err,data)=>{
    if(err) console.log(err)
        else 
    //console.log(data)
console.log(data.toString())
})