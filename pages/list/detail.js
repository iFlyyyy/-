// pages/list/detail.js
Page({
  data: {
    title:"",
    source:"",
    date:"",
    readcount:"",
    container:[],
    id:"",
  },
  onPullDownRefresh(){
    this.getnow(()=>{wx.stopPullDownRefresh()})
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getnow()
  },
  getnow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id:this.data.id
      },
      success:res=>{
        console.log(res)
        let result=res.data.result
        this.set_content(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  set_content(result) {
    this.setData({
      title: result.title,
      source: result.source,
      date: result.date.substr(0, 10) + " " + result.date.substr(11, 5),
      readcount: result.readCount,
      container: result.content,
    })
    if(this.data.source){}
    else{
      this.setData({
        source:'网络来源'
      })
    }
  }
})