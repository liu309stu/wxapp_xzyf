// mine.js

var app = getApp()
var url = app.url
var globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex : 1 , 
    imagehead :'',
    name :'',
    signature :'',
    url : url ,
    list : null ,
    list1 : [{
      files : ['image/4.png'],
      username : '1' ,
      post_title : '大物实验',
      post_love_num:0,
      image_head : 'image/4.png' ,
    }]
  },

  tabFun(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    // 对应多种模式
    // my notes
    // my love
    // my star
    // my extern
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (globalData.userInfo == null ) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  // 推荐写一个navigator的监听函数，提供一个页面渲染的条件。

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var my_post = globalData.my_post.split(' ');
    console.log(my_post);
    var list1 = [] ;
    if (globalData.my_post.length !== 0) {
      for (const item of my_post){
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
                  list1.push(res.data.success);
                  // console.log(res.data.success)
                },
              header: {
                  'Content-Type': 'application/json'
                  }
              })
        }
      }
    }

    console.log(list1);
    setTimeout(()=>{
      this.setData({
        imagehead : globalData.imagehead,
        name : globalData.name                ,
        signature  : globalData.signature  ,
        list : list1
      })
    },200)
    // console.log(this.data.list)
  },
  navtap(e){
    var id = e.currentTarget.dataset.id ;
    wx.navigateTo({
      url: '/pages/details/details?id=' + id,
    })
  },
  // love(e){
  //   wx.showToast({
  //     title: '点赞成功',
  //   })
  // },
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
    // 这个下拉触底，emm，for循环的条件改变 ，
    // 重新获取一些数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

// data : {
//   // 由app.data 提供
//   image_head : 'url' ;
//   user_name : ''     ;
//   signature   :""     ;
//   // 由wxwx.request()提供
//   list      : [{url : '' , iamgeurl : '' , title: '' , ismylove : 1 , lovekey :'1.2k'}]
// }

