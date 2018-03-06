/*
* @Author: Administrator
* @Date:   2018-03-05 21:12:19
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-06 09:04:04
*/

var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

//1.设置canvas尺寸，监听window变化
autoSetCanvasSize(yyy)

///////////////////////////////////////////////////////////////////////////////////

//2.监听用户动作
listenToUser(yyy)

/////////////////////////////////////////////////////////////////////

//控制橡皮擦状态
var eraserEnabled = false
eraser.onclick = function(){
	eraserEnabled = true
	actions.className = 'actions x'
}
brush.onclick = function(){
	eraserEnabled = false
	actions.className = 'actions'
}

/////////////////////////////////////////////////////////////////////////////////////////////

//设置canvas尺寸，监听window变化
function autoSetCanvasSize(canvas){
    setCanvasSize()

    window.onresize = function(){
    	setCanvasSize()
    }

    function setCanvasSize(){
    	var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//画圆函数
function drawCircle(x,y,radius){
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2) 
    context.fill()    //实心
}

//画线函数
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1,y1)     //起点
    context.lineWidth = 5
    context.lineTo(x2,y2)   //终点
    context.stroke()
    context.closePath()
}

//监听用户动作
function listenToUser(canvas){
	var using = false	//是否进入绘画状态
    var lastPoint = {
        x:undefined,
        y:undefined
    }

    //特性检测，检测的不是设备
	if(document.body.ontouchstart !== undefined){
		//触屏设备
		yyy.ontouchstart = function(aaa){
			var x = aaa.touches[0].clientX
	        var y = aaa.touches[0].clientY
	        using = true
	        if(eraserEnabled){
	        	context.clearRect(x-5,y-5,10,10)
	        }else{
	            lastPoint = {
	            	"x":x,
	            	"y":y
	            }
	            drawCircle(x,y,3)
	        }
		}
		yyy.ontouchmove = function(aaa){
			var x = aaa.touches[0].clientX
	        var y = aaa.touches[0].clientY
	        if(!using){return}
	        if(eraserEnabled){
	        	context.clearRect(x-5,y-5,10,10)
	        }else{
	        	var newPoint = {
	                "x":x,
	                "y":y
	            }
	            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
	            lastPoint = newPoint    //上一个点变为当前的点
	        }
		}
		yyy.ontouchend = function(aaa){
			using = false
		}
	}else{
		//非触屏设备
		canvas.onmousedown = function(aaa){
	        var x = aaa.clientX
	        var y = aaa.clientY
	        using = true
	        if(eraserEnabled){
	        	context.clearRect(x-5,y-5,10,10)
	        }else{
	            lastPoint = {
	            	"x":x,
	            	"y":y
	            }
	            drawCircle(x,y,3)
	        }
	    }
	    canvas.onmousemove = function(aaa){
	        var x = aaa.clientX
	        var y = aaa.clientY
	        if(!using){return}
	        if(eraserEnabled){
	        	context.clearRect(x-5,y-5,10,10)
	        }else{
	        	var newPoint = {
	                "x":x,
	                "y":y
	            }
	            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
	            lastPoint = newPoint    //上一个点变为当前的点
	        }
	    }
	    canvas.onmouseup = function(aaa){
	        using = false
	    }
	}
}

/*
yyy.ontouchstart = function(){
	console.log('按下')
}
yyy.ontouchmove = function(){
	console.log('开始摸')
}
yyy.ontouchend = function(){
	console.log('摸完了')
}
*/