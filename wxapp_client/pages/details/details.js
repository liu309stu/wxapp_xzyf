// pages/details/details.js

var app = getApp()
var url = app.url
var globalData = app.globalData


Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylove : globalData.my_love_post,
    touchkey : 0,
    id : 0 ,
    mode_index : 1,
    message : null,
    comment : [],
    url : url , 
    globalData : globalData
  },
  pre_view(e){
    var index = e.currentTarget.dataset.index;
    console.log(1);
    wx.previewImage({
      urls: this.data.message.files,
      current :this.data.message.files[index]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showActionSheet({
      itemList : ['长图模式' , '9宫格模式' , '其他'],
      success: (res) =>{
        if (res.tapIndex == 0) {
          wx.showToast({
            title: '长图模式选择成功',
          })
          this.setData({
            mode_index : 1
          })
        }
       if(res.tapIndex == 1 ){
         wx.showToast({
           title: '9宫格模式选择成功',
         })
         this.setData({
           mode_index : 0
         })
       }
       if(res.tapIndex == 2 ){
        wx.showToast({
          title: '功能尚未开发',
        })
      }
      }
    })
    if (options.id) {
      this.setData({
        id : parseInt(options.id),
        namee : parseInt(options.namee)
      })
    };
    this.get_msg(this.data.id)
   },
  get_msg : function(id){
      var data = {
        post_id : id
      }
    
      wx.request({
            url: url + 'post_detail',
            data : (data),
            method : 'GET',
            success : (res) =>{
              var data = res.data.success ;
              var list_o = [] ;
              for(const a of data.files){
                list_o.push(url + a)
              }
              setTimeout( ()=>{
                data.files = list_o ;
                this.setData({
                  message : data
                })
              },200 )
            },
          header: {
              'Content-Type': 'application/json'
              }
          })
  } ,


  correct(e){
    if (globalData.user_id ==  this.data.message.user_id) {
      if (this.data.touchkey > 0 && this.data.touchkey %2 == 0) {
        var k = this.data.id ;
        console.log('/pages/JourneyCreator/JourneyCreator?postid=' + k )
        wx.navigateTo({
          url: '/pages/JourneyCreator/JourneyCreator?postid=' + k ,
        })
      }
      var i = this.data.touchkey ;
      i = i+ 1;
      this.setData({
        touchkey : i 
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})