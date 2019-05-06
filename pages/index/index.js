const typeMap={
  '国内':'gn',
  '国际':'gj',
  '财经':'cj',
  '娱乐':'yl',
  '军事':'js',
  '体育':'ty',
  '其他':'other'
}
Page({
  data: {
    types: ['国内','国际','财经','娱乐','军事','体育','其他'],
    hot_im:'',
    hot_title:'',
    hot_date:'',
    hot_source:'',
    hot_id:'',
    list_item:[],
    type:"gn",
    cur_index:0,
  },
  onLoad: function () {
    this.getnow()
  },
  getnow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {
        console.log(res)
        let result = res.data.result;
        this.set_hot(result)
        this.set_list(result)
      },
      complete:()=>{
        callback && callback()    //仅在传入参数时调用关闭下拉函数
      }
    })
  },
  set_hot(result) {   //设置hot数据
    this.setData({
      hot_im: result[0].firstImage,
      hot_title: result[0].title,
      hot_source: result[0].source,
      hot_date: result[0].date.substr(11, 5),
      hot_id: result[0].id,
    })
    if (this.data.hot_im) { }
    else {
      this.setData({
        hot_im: '../images/noimage.jpg'    //hot若未接收到图片，则使用默认图片
      })
    }
  },
  set_list(result) {    //设置列表数据
    for (let i of result) {
      i.date = i.date.substr(0, 10) + " " + i.date.substr(11, 5)    //日期标准化
      if (i.firstImage) { }
      else {
        i.firstImage = '../images/noimage.jpg'    //列表项中若未接收到图片，则使用默认图片
      }
    }
    this.setData({
      list_item: result.slice(1)
    })
  },
  classified(event){
    console.log(event)
    this.setData({
      type:typeMap[event.currentTarget.dataset.id],    //使用点击后传回的id找到对应的type
      cur_index:event.currentTarget.dataset.index,    //保存点击后传回的index
    }) 
    this.getnow()
  },
  onPullDownRefresh() {
    this.getnow(() =>wx.stopPullDownRefresh())    //下拉时传入关闭下拉函数作为参数
  },
  onTap_hot(){
    wx.navigateTo({
      url: '../list/detail?id='+this.data.hot_id,   //点击后传回的Id传入详情页
    })
  },
  onTap_list(event){
      let list_id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../list/detail?id=' + list_id,    //点击后传回的Id传入详情页
    })
  }
})