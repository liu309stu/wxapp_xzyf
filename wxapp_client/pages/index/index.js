// index.js

// 注意复制到其他目录下
var app = getApp()
var url = app.url
var globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_swi   : ['https://ts1.cn.mm.bing.net/th/id/R-C.2ca61a8ea560c57b9495b39686230998?rik=KhT4IFfXQM3PkQ&riu=http%3a%2f%2fwww.deskcar.com%2fdesktop%2ffengjing%2f2013221124410%2f10.jpg&ehk=jgrmBsXn5MDQkZ49DruA41VSiNvyvFmqJZCajuH0eQo%3d&risl=&pid=ImgRaw&r=0','https://img.zcool.cn/community/011aad554be56f000001bf72c38864.jpg@1280w_1l_2o_100sh.jpg'],
    iamge_head : '' ,
    list_s : ['注册' ,'登录','团体','景区','导航','游记','发布','退出'],
    list_sights : [],
    list_notes : []  ,
    list_ok    : []  ,
    sight_ok   : []  ,
    url        : url 
  },
  bartap(options){
    var index = options.currentTarget.dataset.index;
    var uto = ['/pages/register/register?id=0','/pages/login/login','/pages/ots/ots','/pages/sight_list/sight_list','/pages/ots/ots','/pages/square/square','/pages/JourneyCreator/JourneyCreator?postid=0'];
    if(index == 7 ){
      if (globalData.userInfo == null) {
        wx.showToast({
          title: '请先登录，才能退出的哈',
        })
      }
      else{
        app.logout();
        wx.showToast({
          title: '退出成功，欢迎下次登录',
        })
      }
    }
    else if (index == 5) {
      wx.switchTab({
        url: uto[index],
      })
      console.log(uto[index])
    }
    else if (index == 6) {
      if (globalData.userInfo == null) {
        wx.showToast({
          title: '登录之后才能进行发布哟',
        })
      }
      else{
        wx.navigateTo({
          url: uto[index],
        })
      }
    }
    else{
      wx.navigateTo({
        url: uto[index],
      })
    }
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
  post_r: function(){
    console.log(1);
    var list = this.data.list_notes       ;
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
          list_notes : list
        })
      },500
    )

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

  tapsights(e){
    wx.navigateTo({
      url: '/pages/sight_list/sight_list',
    })
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
    this.post_request();
    this.sight_request();
  },


  sight_request(){
    wx.request({
      url:  url + 'sight_request',
      data : {num : 2,
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



