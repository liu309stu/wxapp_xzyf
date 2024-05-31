// pages/sight_update/sight_update.js


var app = getApp()
var url = app.url
var globalData = app.globalData


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl : [],
    iamge_io : [],
    delList: [],
    sight_name :'',
    sight_location:'',
    sight_culture:'',
    sight_hot:'',
    sights_detail:''
  },


  iamgeadd(e){
    // 10 限制感觉没有任何必要
    wx.chooseImage({
      success : (res) =>{
        const tem = res.tempFilePaths ;
        let  h = this.data.imageUrl  ;
        let m = this.data.iamge_io  ;
        let  fs = wx.getFileSystemManager();
        var k = [] ;
        for (const item of tem) {
          var io = fs.readFileSync(tem[0],'base64')
          k.push(io)
        }
        this.setData({
          imageUrl : h.concat(tem) ,
          iamge_io : m.concat(k)
        })
      }
    })
  },
  image_pre(e){
    // console.log(e.currentTarget)
    var index = e.currentTarget.dataset.index
    wx.previewImage({
      urls: this.data.imageUrl,
      current : this.data.imageUrl[index]
    })
  },
  iamge_del(e){
    // console.log(e.currentTarget)
    const i = e.currentTarget.dataset.index;
    var url = this.data.imageUrl        ;
    var io  = this.data.iamge_io        ;
    var del = this.data.delList         ;
    del.push(url[i].substr(url[i].indexOf('i'),url[i].length))
    url.splice(i,1)  ;
    io.splice(i,1)   ;
    this.setData({
      imageUrl : url ,
      iamge_io : io  ,
      delList : del
    })
  },

  input1(e){
    this.setData({
      sight_name : e.detail
    })
  },
  input2(e){
    this.setData({
      sight_location : e.detail
    })
  },
  input3(e){
    this.setData({
      sight_hot : e.detail
    })
  },
  input4(e){
    this.setData({
      sight_culture : e.detail
    })
  },
  input5(e){
    this.setData({
      sights_detail :e.detail
    })
  },

  tap1(e){
    var data = {
      sight_name : this.data.sight_name,
      sight_location : this.data.sight_location  ,
      sight_hot : this.data.sight_hot ,
      sights_detail :this.data.sights_detail,
      sight_culture : this.data.sight_culture,
      sights_image : this.data.iamge_io
    };
    wx.request({
      url: url + 'sight_db_update',
      data : JSON.stringify(data),
      method : 'POST',
      success : (res) =>{
       wx.showToast({
         title: '上传成功',
       })
      },
     header: {
        'Content-Type': 'application/json'
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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