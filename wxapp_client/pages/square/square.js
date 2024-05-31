// pages/square/square.js


var app = getApp()
var url = app.url
var globalData = app.globalData


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [] ,
    list_ok : [] ,
    url : url
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.post_request();
  },

  post_request: function(){
    console.log(2);
    var list = this.data.list_ok;
    var data = {
      post_id_list : this.data.list_ok
    };
    wx.request({
      url: url + 'post_request',
      method : 'POST' ,
      data : JSON.stringify(data),
      method : 'POST',
      success : (res) =>{
        list = list.concat(res.data.list);
      },
      header: {
        'Content-Type': 'application/json'
        }
    });
    setTimeout(
      ()=>{
        this.setData({
          list_ok : list
        });
        this.post_r();
      },200
    );
  },
  love(e){
    // console.log(e.currentTarget.dataset.id)
    app.love(e.currentTarget.dataset.id);
  },
  navtap(e){
    var id = e.currentTarget.dataset.index;
    // console.log(e.currentTarget)
    console.log(id)
    wx.navigateTo({
      url: "/pages/details/details?id="+id 
    })
  },
  post_r: function(){
    console.log(1);
    var list = this.data.list       ;
    var list_ok = this.data.list_ok ;
    for(const item of list_ok){
      if(item !== ""){
        console.log(item)
        var data = {
          post_id : item
         }
        wx.request({
              url: url + 'post_detail',
              data : data,
              method : 'GET',
              success : (res) =>{
                list.push(res.data.success);
                // console.log(res.data.success)
              },
            header: {
                'Content-Type': 'application/json'
                }
            })
      }
    };
    setTimeout(
      ()=>{
        this.setData({
          list : list
        })
      },500
    )

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
    wx.redirectTo({
      url: '/pages/square/sqaure',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.post_request();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})