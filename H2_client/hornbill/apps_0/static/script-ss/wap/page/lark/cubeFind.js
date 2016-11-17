/*common*/
var zepto = require('wap/zepto')
    ,Alert = require('wap/ui/alert')


// 模拟数据
var data = {
  bgImgUrl : 'http://i.meilishuo.net/css/images/yaoyaotest/test0.jpg'
  ,smCubeImgUrl : 'http://i.meilishuo.net/css/images/yaoyaotest/test1.jpg'
  ,checkPointArray : [2,2,3,3,3,4,4,5,5,6,6,7,7,8,8,8,9,9,10]
  ,time : 60
  ,satgeInfo : [
    '技术有点水哦'
    ,'还可以1'
    ,'还可以2'
    ,'还可以3'
    ,'还可以4'
    ,'还可以5'
    ,'还可以6'
    ,'还可以7'
    ,'还可以8'
    ,'还可以9'
    ,'还可以10'
    ,'还可以11'
    ,'还可以12'
    ,'还可以13'
    ,'还可以14'
    ,'还可以15'
    ,'还可以16'
    ,'还可以17'
    ,'就差一点点啦~'
    ,'太叼了!'

  ]
}

// 获取屏幕及初始化数据
var stage = -1
var restTime = data.time
var stageLength = data.checkPointArray.length
var windowWidth = $(window).width()
    ,windowHeight = $(window).height()
    ,titleHeight = $('.timeerCent').height()
    ,cubesWidth = windowWidth*0.9

// 初始
var init = (function(){
  $('html')
    .height(windowHeight)
    .on('touchmove', function(e){
      e.preventDefault()
    })
  $('.bigCube').width(cubesWidth)
    .height(cubesWidth)
    .css({
      marginTop : (windowHeight - windowWidth)/2-titleHeight
      ,backgroundImage:'url('+data.bgImgUrl+')'
    })
  $('.smallCube').css({
    backgroundImage:'url('+data.smCubeImgUrl+')'
  })
})()

// 游戏停止后的事件清楚
var endGame = function(){
  clearInterval(timmering)
  $('body').off('tap')
  $('.smallCube').off('tap')
}

// 倒计时
var timeDowning = function(){
  restTime--
  $('.timeer').html(restTime)
  $('.timeerBg').width(restTime/data.time*100+'%')
}

var timeer = function(){
  timeDowning()
  timmering = setInterval(function(){
    timeDowning()
    if(restTime <= 0){
      var alertItem = new Alert({
        content : '时间到, 你已经搞定了' + stage + '关 ' + data.satgeInfo[stage]
      })
      endGame()
    }
  }, 1000)
}

// 下一关操作
var nextStage = function(){
  stage ++
  if(stage >= stageLength)
  {
    var alertItem = new Alert({
      content : '你已经通关了,用了' + (data.time - restTime) + '秒 ' + data.satgeInfo[stageLength]
    })
    endGame()
    return
  }
  var roundNumber1 = Math.floor(Math.random()*100)%data.checkPointArray[stage]
    ,roundNumber2 = Math.floor(Math.random()*100)%data.checkPointArray[stage]
  var cubesCount = data.checkPointArray[stage]
    ,cubeWidth = cubesWidth/cubesCount
  $('.bigCube').css({
    backgroundSize: cubesWidth/data.checkPointArray[stage]
  })
  $('.smallCube')
    .width(cubeWidth)
    .height(cubeWidth)
    .css({
      top : cubeWidth*roundNumber1
      ,left : cubeWidth*roundNumber2
      ,backgroundSize: cubeWidth
    })
}

// 过关触发
var beginStage = 0
var Search = (function(){
  $('body').on('tap', function(){
    if(!beginStage){
      timeer()
    }
    beginStage ++
  })
  $('.smallCube').on('tap', function(){
    nextStage()
  })
})()


nextStage()
