/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */

async function getchannels(){
    const htmlstr=await axios({
url:'/v1_0/mp/articles'
    })
    console.log(htmlstr)
    const str=`<option value="">请选择文章频道</option>`+htmlstr.data.results.map(item=>{
        console.log(item);
        return `<option value="${item.id}">${item.title}</option>`
    }).join('')
    document.querySelector('.form-select').innerHTML=str
}
getchannels()
/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */

document.querySelector('.img-file'),addEventListener('change',async e=>{
const file=e.target.files[0]
const form=new FormData()
form.append('image',file)
const result=await axios({
    url:'/v1_0/upload',
    method:'POST',
    data:form
})
document.querySelector('.rounded').src=result.data.url
document.querySelector('.rounded').classList.add('show')
document.querySelector('.place').classList.add('hide')
})
document.querySelector('.rounded').addEventListener('click',e=>{
    document.querySelector('.img-file').click()
})
/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */

document.querySelector('.send').addEventListener('click',async e=>{
    if(e.target.innerHTML!=='发布')
        return 
    const form =document.querySelector('.art-form')
    const bd=serialize(form,{hash:true,empty:true})
    //删除id属性
    delete bd.id
    console.log(bd);
    bd.cover={
        type:1,
        images:[document.querySelector('.rounded').src]
    }
    try{
      await  axios({
            url:'/v1_0/mp/articles',
            method:'POST',
            data:bd
        })
myAlert(true,'发布成功')
form.reset()
//重置封面
document.querySelector('.rounded').src=''
document.querySelector('.rounded').classList.remove('show')
document.querySelector('.place').classList.remove('hide')
//富文本编辑器重置
editor.setHtml('')
setTimeout(()=>{
    location.href='../content/index.html'
})
    }catch(error){
        console.dir(error)
        myAlert(false,error.response.data.message)
    }
},1500)
/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */
;(function(){
    //公共发布页面接收参数判断
    const stra=location.search
    const params=new URLSearchParams(stra)
    params.forEach(async (value,key)=>{
        //当有编辑的文章id传过来时
        if(key===`id`){
            //修改标题和按钮文字
            document.querySelector('.title span').innerHTML='修改文章'
            document.querySelector('.send').innerHTML='修改'
            //获取文章表单数据并回显
            const res=await axios({
                url:`/v1_0/mp/articles/${value},`

            })
            //编辑一个包含所有需要的数据对象
            const dataobj={
                channel_id:res.data.channel_id,
                title:res.data.title,
                rounded:res.data.cover.images[0],
                content:res.data.content,
                id:res.data.id
            }
            //遍历数据对象属性，映射到页面元素上
            Object.keys(dataobj).forEach(key=>{
if(key==='rounded'){
    if(dataobj[key]){
        document.querySelector('.rounded').src=dataobj[key]
        document.querySelector('.rounded').classList.add('show')
        document.querySelector('.place').classList.add('hide')
    }
}else if(key==='content'){
    editor.setHtml(dataobj[key])
}else{
    document.querySelector(`name=${key}`).value=dataobj[key]
}
            })
        }
    })
})();

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
document.querySelector('.send').addEventListener('click',async e=>{
    if(e.target.innerHTML!=='修改') return 
    const form=document.querySelector('.art-form')
    const data=serialize(form,{hash:true,empty:true})
  try{
    const dataresult=await axios({
        url:'/v1_0/mp/articles/{target}',
        method:'PUT',
        data:{
            ...data,
            cover:document.querySelector('.rounded').src? 1:0,
            images:[document.querySelector('.rounded').src]
        }
    })
    myAlert(true,'修改页面成功')
  }catch(error){
myAlert(false,error.response.data.message)
  }
})