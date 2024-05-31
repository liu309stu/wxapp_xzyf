// pages/sight_list/sight_list.js

var app = getApp()
var url = app.url
var globalData = app.globalData



Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_sights : [],
    sight_ok   : []  ,
    url : url
  },
  tapsightdetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/sight_detail/sight_detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.sight_request();
  },
  sight_request(){
    wx.request({
      url:  url + 'sight_request',
      data : {num : 8,
        list_over : this.data.sight_ok},
      method : 'GET',
      success : (res) =>{
        this.setData({
          sight_ok : res.data.success.list_send
        })
        console.log(res)
      },
     header: {
        'Content-Type': 'application/json'
        }
    });
    setTimeout( ()=>{
      this.sight_load();
    },200 )
  },
  sight_load(){
    var list = [];
    for(const item of this.data.sight_ok){
      wx.request({
        url: url + 'sight_detail',
        data : {sights_id : item},
        method : 'GET',
        success : (res) =>{
          list.push(res.data.success);
          // console.log(res)
        },
       header: {
          'Content-Type': 'application/json'
          }
      })
    };
    setTimeout(()=>{
      this.setData({
        list_sights : list
      })
    },300)
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