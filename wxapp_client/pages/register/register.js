// pages/register/register.js

var app = getApp()
var url = app.url
var globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    // 静态数据
    buttondata : '',
    pagefor : '注册',
    // 动态数据
    image_head : '/image/add.png',
    user_id    : '',
    username   : '',
    passwd     : '',
    signature  : '',
    notes      : '',
    location   : '' ,
    iamge_io   : '' ,
    list :  ['chooseImage' , 'taptoloc' ,'register' ] ,
    disabled : ''
  },
  chooseImage(e){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success : (res)=>{
        const a = res.tempFilePaths[0];
        const fs = wx.getFileSystemManager()
        var base64 = fs.readFileSync(a,'base64')
        this.setData({
          image_head : a ,
          iamge_io : base64
        })
      }
    }),
    this.onLoad();
  },
  taptoloc(e){
    wx.choosePoi({
      success: (res)=>{
        // console.log(res) ;
        const a = res.address ;
        this.setData({
          location : a
        })
      },
    })
  },
  register(e){
    var data = this.data;
    if (data.iamge_io == '') {
      wx.showToast({
        title: '请选择头像',
      })
    }
    else if(data.username=='' || data.user_id == ''|| data.passwd==''){
      wx.showToast({
        title: '请输入昵称，密码，账户等关键信息',
      })
    }
    else {
      const formData = {
        user_id    : data.user_id,
        username   : data.username,
        passwd     : data.passwd,
        signature  : data.signature,
        notes      : data.notes,
        location   : data.location,
        image      : data.iamge_io
      };
      wx.request({
        url: url+'register',
        data : JSON.stringify(formData),
        method : 'POST',
        success : (res) =>{
          wx.showToast({
            title: '注册成功',
          })
          setTimeout(res=>{
            wx.navigateTo({
              url: '/pages/login/login',
            })
          },1000)
        },
       header: {
          'Content-Type': 'application/json'
          }
      })
    }

  },

  toreset(e){
    wx.navigateTo({
      url: '/pages/register/register?id=2',
    })
  },

  idinput(e){
    this.data.user_id = e.detail.value 
  },
  nameinput(e){
    this.data.username = e.detail.value
  },
  pwdinput(e){
    this.data.passwd = e.detail.value
  },
  siginput(e){
    this.data.signature = e.detail.value
  },
  noteinput(e){
    this.data.notes = e.detail.value
  },
  adsinput(e){
    this.data.location = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // id = 0 注册 id =1 查看 id =2 修改
  onLoad(options) {
    if (options.id == 0){
      wx.setNavigationBarTitle({
        title: '注册',
      })
    }
    else if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '查看信息',
      })
      this.setData({
        list : ['','','toreset'] ,
        disabled  : 'true' ,
        pagefor : '修改信息'
      })
    }
    else if(options.id == 2){
      wx.setNavigationBarTitle({
        title: '修改信息',
      })
      this.setData({
        pagefor : '修改信息'
      })
    }
    if(globalData.user_id !== '' && options.id >0  ){
      // post 请求
      this.setData({
        user_id : globalData.user_id  ,
        image_head : globalData.imagehead ,
        location: globalData.location  ,
        username : globalData.name,
        notes : globalData.notes,
        passwd :  globalData.passwd  ,
        signature : globalData.signature  
      })
      console.log('not 0')
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