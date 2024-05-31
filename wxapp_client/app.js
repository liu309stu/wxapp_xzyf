// app.js
App({
  logout(){
    this.globalData.userInfo = null ,
    this.globalData.user_id = ''   ,
    this.globalData.imagehead = "",
    this.globalData.location= "",
    this.globalData.my_love_post= "",
    this.globalData.name="",
    this.globalData.notes= "",
    this.globalData.passwd= "",
    this.globalData.signature= "",
    this.globalData.user_id= "",
    this.globalData.my_post = "";
    console.log(this.globalData)
  },
  loginfresh( a , b){
    wx.request({
      url: this.url+'login',                                                                                                 
      data : JSON.stringify({
        user_id :a,
        passwd : b 
      }),
      method : 'POST',
      success : (res) =>{
        // console.log(res.data)
        const success = res.data.success ;
        if (res.data.success !== "") {
          // 数据修改 针对app.js 里面的全局数据段
         this.globalData.userInfo = 1 ;
         this.globalData.user_id = success.user_id ,
         this.globalData.imagehead = this.url + success.imagehead,
         this.globalData.location = success.location ,
         this.globalData.my_love_post = success.my_love_post,
         this.globalData.name  = success.name,
         this.globalData.notes = success.notes,
         this.globalData.passwd = success.passwd ,
         this.globalData.signature = success.signature ,
         this.globalData.my_post = success.my_post
        }
        if (res.data.error !== '' ) {
        }
      },
      header: {
        'Content-Type': 'application/json'
        }
    })
  },
  love(post_id){
    if (this.globalData.user_id == '') {
      wx.showToast({
        title: '要先登录才能点赞哟~~',
      })
    }
    else{ 
      if ( this.globalData.my_love_post.indexOf(post_id.toString()) < 0  ) {
      wx.request({
        url: this.url + 'love',
        data : JSON.stringify({
          user_id : this.globalData.user_id ,
          post_id  : post_id
        }),
        method : 'POST',
        success : (res) =>{
          wx.showToast({
            title:'点赞成功',
          })
          this.globalData.my_love_post = this.globalData.my_love_post + post_id.toString()
        },
        fail : ()=>{
          wx.showToast({
            title: '点赞失败，请检查设备',
          })
        },
       header: {
          'Content-Type': 'application/json'
          }
      })
  
    }
    else{
      wx.request({
        url: this.url + 'love_del',
        data : JSON.stringify({
          user_id : this.globalData.user_id ,
          post_id  : post_id
        }),
        method : 'POST',
        success : (res) =>{
          wx.showToast({
            title:'点赞取消',
          })
          this.globalData.my_love_post = this.globalData.my_love_post.replace(post_id.toString(),'')
        },
        fail : ()=>{
          wx.showToast({
            title: '点赞失败，请检查设备',
          })
        },
       header: {
          'Content-Type': 'application/json'
          }
      })
    }}
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    userInfo: null ,
    user_id : ''   ,
    imagehead: "",
    location: "",
    my_love_post: "",
    name: "",
    notes: "",
    passwd: "",
    signature: "",
    user_id: "",
    my_post : ""
  },
  url : "http://10.70.73.148:5000/"
})