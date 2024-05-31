// pages/JourneyCreator/JourneyCreator.js

var app = getApp()
var url = app.url
var globalData = app.globalData



Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id  : ''  ,
    delList  : []  ,
    imageUrl : [] ,
    iamge_io : [] ,
    isShow  :  true  ,
    titledata : "" ,
    textdata : ""   ,
    isprivate : 0   ,
    location : '添加地点'   ,
    isprivate_msg : '公开可见' ,
    isrest        : 0         ,
    priold        : 0         , 
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
          var io = fs.readFileSync(item,'base64')
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
  location_add(e){
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
  titleinput(options){
    const value = options.detail.value ;
    this.setData({
      titledata : value
    })
  },
  select_pri(e){
    wx.showActionSheet({
      itemList : ['公开可见' , '仅自己可见','仅某些人不可见'] ,
      success : (res) =>{
        if (res.tapIndex == 0){
          wx.showToast({
            title: '成功设置公开可见',
          })
          this.setData({
            isprivate : 0 ,
            isprivate_msg : '公开可见'
          })
        }
        if (res.tapIndex == 1) {
          wx.showToast({
            title: '成功设置仅自己可见',
          })
          this.setData({
            isprivate : 1 ,
            isprivate_msg : '仅自己可见'
          })
        }
        if (res.tapIndex == 2) {
          wx.showToast({
            title: '该功能暂时未开放',
          })
        }
      }
    })
  },
  textinput(options){
    const value = options.detail.value ;
    this.setData({
      textdata : value
    })
  },
  publish(e){
    if(globalData.userInfo !== null){
      if(this.data.post_id !== ''){
        var k = !(this.data.isprivate == this.data.priold);
        var data = {
          post_id : this.data.post_id,
          title : this.data.titledata ,
          article : this.data.textdata,
          file : this.data.iamge_io,
          imgdel :this.data.delList,
          location : this.data.location,
          private :this.data.isprivate,
          private_reset : k,
        }
        wx.request({
          url: url + 'post_reset',
          data : JSON.stringify(data),
          method : 'POST',
          success : (res) =>{
            // console.log(res.data)
            wx.showToast({
              title: '修改成功~~',
            });
            setTimeout( ()=>{wx.navigateBack} , 2000 )
          },
         header: {
            'Content-Type': 'application/json'
            }
        })
        console.log('not 0 ')
      }
      else{
        console.log('is 0')
        var data = {
          title : this.data.titledata ,
          article : this.data.textdata ,
          user_id : globalData.user_id ,
          location : this.data.location ,
          private : this.data.isprivate ,
          file  : this.data.iamge_io
        }
        console.log(data)
        wx.request({
          url:  url + 'create_post',
          data : JSON.stringify(data),
          method : 'POST',
          success : (res) =>{
            wx.showToast({
              title: '发布成功',
            });
            app.loginfresh(globalData.user_id,globalData.passwd);
            setTimeout(()=>{
              setTimeout( ()=>{wx.navigateBack} , 1000 )
            },2000)
          },
          header: {
            'Content-Type': 'application/json'
            }
        })
      }
    }
    else{
      wx.showToast({
        title:'登录之后才能发表哟~~',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if ((options.postid) > 0) {
      // console.log(options.postid)
      // console.log(options.)
     wx.request({
       url: url + 'post_detail',
       method : 'GET' ,
       data : {post_id : options.postid},
       success : (res)=>{
        //  console.log(res.data.success)
        var data = res.data.success ;
        var files = [] ;
        for(const m of data.files ){
          files.push(url + m)
        }
        setTimeout(
          ()=>{
            this.setData({
              priol : data.post_private,
              post_id : data.post_id,
              isrest : 1 ,
              imageUrl : files,
              location :data.location,
              textdata :data.post_article,
              titledata : data.post_title ,
              isprivate : data.post_private ,
              isprivate_msg : (data.post_private == 0) ? '公开可见' : '仅自己可见'
          })
          },100
          )
       }
     })
    }
  },
  aitap(e){
    var title = '';
    var text = '' ;
    let promisearr = [];
    promisearr.push( new Promise((reslove,reject)=>{  
      var  data = {
        titledata : this.data.titledata,
        textdata  : this.data.textdata
      }
      wx.request({
        url : url + 'AI_retouch',
        data : JSON.stringify(data),
        method : 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
           title = res.data.title;
          text = res.data.content;
          // console.log(res.data.title);
          reslove();
        }
      });
     }));
   Promise.all(promisearr).then(res =>{
     this.setData({
       titledata : title,
       textdata : text
     })
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
    // if (globalData.userInfo == null) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
    if(this.data.post_id != '0'){
      wx.setNavigationBarTitle({
        title: '游记修改',
      })
    }
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
