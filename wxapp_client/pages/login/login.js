// login.js

var app = getApp()
var url = app.url
var globalData = app.globalData


Page({ 
  data: { 
    user_id: '', 
    password:'' 
  }, 
 
// 获取输入账号 
  phoneInput :function (e) { 
    this.setData({ 
      user_id:e.detail.value 
    }) 
  }, 
 
// 获取输入密码 
  passwordInput :function (e) { 
    this.setData({ 
      password:e.detail.value 
    })   
  }, 
// 登录 
  login: function () { 
    if(this.data.user_id == '' || this.data.password.length == ''){ 
      wx.showToast({   
        title: '账号或密码不能为空',   
        icon: 'none',   
        duration: 2000    
      })   
  }else { 
    // app.login(this.data.user_id ,this.data.password)
    wx.request({
      url: url+'login',
      data : JSON.stringify({
        user_id : this.data.user_id ,
        passwd : this.data.password 
      }),
      method : 'POST',
      success : (res) =>{
        // console.log(res.data)
        const success = res.data.success ;
        if (res.data.success !== "") {
          wx.showToast({
            title: '登录成功',
          })
          // 数据修改 针对app.js 里面的全局数据段
         globalData.userInfo = 1 ;
         globalData.user_id = success.user_id ,
         globalData.imagehead = url + success.imagehead,
         globalData.location = success.location ,
         globalData.my_love_post = success.my_love_post,
         globalData.name  = success.name,
         globalData.notes = success.notes,
         globalData.passwd = success.passwd ,
         globalData.signature = success.signature ,
         globalData.my_post = success.my_post
        }
        if (res.data.error !== '' ) {
          wx.showToast({
            title: res.data.error,
          })
        }
      },
      header: {
        'Content-Type': 'application/json'
        }
    })
  // 这里修改成跳转的页面 
  //     wx.showToast({   
  //       title: '登录成功',   
  //       icon: 'success',   
  //       duration: 2000   
  //     })  
  //     跳转至index页面
  //    wx.redirectTo({
  //      url: '../index/index'
  //    })
    }   
  } 
}) 
