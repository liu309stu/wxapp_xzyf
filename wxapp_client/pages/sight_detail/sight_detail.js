// pages/sight_detail/sight_detail.js
var app = getApp()
var url = app.url
var globalData = app.globalData

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id : null ,
    msg : null,
    url : url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id1  = options.id;
    this.setData({
      id : id1
    });
    setTimeout(()=>{
      this.sight_load();
    },100)
  },


  sight_load(){
    wx.request({
      url: url + 'sight_detail',
      data : {sights_id : this.data.id},
      method : 'GET',
      success : (res) =>{
        this.setData({
          msg : res.data.success
        })
      },
     header: {
        'Content-Type': 'application/json'
        }
    })
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