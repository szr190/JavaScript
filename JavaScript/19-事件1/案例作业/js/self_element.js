/**
 *
 * @authors 千寻 (68603587@qq.com)
 * @date    2017-09-20 20:20:06
 * @version $Id$
 */

/*------------ 为元素对象添加animation方法 --------------*/
    Element.prototype.animation = animation;





/*------------ tween  动画速度曲线 --------------*/
    // (endValue[attr] - startValue[attr]) * prop + startValue[attr]
    //     c*t/d + b
    //     t current time       Date.now() - startTime
    //     b beginning value    startValue
    //     c change in value    endValue[attr] - startValue[attr]
    //     d duration           this.target_time


        var Tween = {
                linear: function (t, b, c, d){  //匀速
                    return c*t/d + b;   //  t/d = prop;
                },
                easeIn: function(t, b, c, d){  //加速曲线
                    return c*(t/=d)*t + b;
                },
                easeOut: function(t, b, c, d){  //减速曲线
                    return -c *(t/=d)*(t-2) + b;
                },
                easeBoth: function(t, b, c, d){  //加速减速曲线
                    if ((t/=d/2) < 1) {
                        return c/2*t*t + b;
                    }
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInStrong: function(t, b, c, d){  //加加速曲线
                    return c*(t/=d)*t*t*t + b;
                },
                easeOutStrong: function(t, b, c, d){  //减减速曲线
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
                    if ((t/=d/2) < 1) {
                        return c/2*t*t*t*t + b;
                    }
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
                    if (t === 0) {
                        return b;
                    }
                    if ( (t /= d) == 1 ) {
                        return b+c;
                    }
                    if (!p) {
                        p=d*0.3;
                    }
                    if (!a || a < Math.abs(c)) {
                        a = c;
                        var s = p/4;
                    } else {
                        var s = p/(2*Math.PI) * Math.asin (c/a);
                    }
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
                    if (t === 0) {
                        return b;
                    }
                    if ( (t /= d) == 1 ) {
                        return b+c;
                    }
                    if (!p) {
                        p=d*0.3;
                    }
                    if (!a || a < Math.abs(c)) {
                        a = c;
                        var s = p / 4;
                    } else {
                        var s = p/(2*Math.PI) * Math.asin (c/a);
                    }
                    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                },
                elasticBoth: function(t, b, c, d, a, p){
                    if (t === 0) {
                        return b;
                    }
                    if ( (t /= d/2) == 2 ) {
                        return b+c;
                    }
                    if (!p) {
                        p = d*(0.3*1.5);
                    }
                    if ( !a || a < Math.abs(c) ) {
                        a = c;
                        var s = p/4;
                    }
                    else {
                        var s = p/(2*Math.PI) * Math.asin (c/a);
                    }
                    if (t < 1) {
                        return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    }
                    return a*Math.pow(2,-10*(t-=1)) *
                            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
                },
                backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
                    if (typeof s == 'undefined') {
                       s = 1.70158;
                    }
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                backOut: function(t, b, c, d, s){
                    if (typeof s == 'undefined') {
                        s = 3.70158;  //回缩的距离
                    }
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                backBoth: function(t, b, c, d, s){
                    if (typeof s == 'undefined') {
                        s = 1.70158;
                    }
                    if ((t /= d/2 ) < 1) {
                        return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    }
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                },
                bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
                    return c - Tween['bounceOut'](d-t, 0, c, d) + b;
                },
                bounceOut: function(t, b, c, d){
                    if ((t/=d) < (1/2.75)) {
                        return c*(7.5625*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                    }
                    return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
                },
                bounceBoth: function(t, b, c, d){
                    if (t < d/2) {
                        return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
                    }
                    return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
                }
            };



/*------------ requestAnimationFrame 兼容 --------------*/

window.requestAnimationFrame = window.requestAnimationFrame || function(fn){
    return setTimeout(fn,1000/60);
}
window.cancelAnimationFrame = window.cancalAnimationFrame || clearTimeout;


/*------------ animation 动画函数 --------------*/
       /*

        json        json属性
        d           duration 动画时长
        type        动画类型
        callback    回调函数

       */
        function animation(obj,json,d,type,callback){
                if(obj.tagName){
                    _animation(obj,json,d,type,callback);
                }else{
                     _animation(this,obj,json,d,type);

                }
        }
        function _animation(obj,json,d,type,callback){//指定接受形参

            obj.target = {}/*目标值*/,obj.init={}/*初始值*/,obj.styleV/*样式*/;

            for(var attr in json){
                obj.target[attr] = parseFloat( json[attr] );//目标值转化为number类型
                obj.init[attr] = parseFloat( getStyle(obj,attr));//获取初始样式值并转化为number类型

            }


            if( typeof type =='function'){
                callback = type;//
                type = 'linear';
                //alert('function');
            }else{
                type = type || 'linear';
            }

            obj.init_t = new Date();//获取开始时间

            (function rQAF(){

                var t = new Date()-obj.init_t;//获取当前时间与开始时间的差值--动画执行时长
                if( t>= d){//判断动画执行时长是否大于预设目标
                       t=d;//让动画执行时长等于预设目标
                }else{
                    window.requestAnimationFrame(rQAF);//调用rQAF函数一次
                }

                for(var attr in json){

                   var b = obj.init[attr];

                   var c = obj.target[attr]-obj.init[attr];
                    // var a = 2*()/Math.pow(d,2);//获取对象属性的加速度
                    // this.styleV = a*Math.pow(t,2)/2;//根据动画时长设置样式

                    //alert(Tween);
                    var unit = '';

                    switch(attr){
                        case 'opacity':
                            obj.style.filter = 'alpha(opacity='+Tween[type](t,b,c,d)*100+')';//opacity兼容
                                break;
                        case 'zIndex':
                                 break;
                        default :
                             unit = 'px';
                                 break;

                    }

                     obj.style[attr] = Tween[type](t,b,c,d)+unit;//设置样式

                }
                t==d?callback&&callback.call(obj):'';//根据动画时长是否等于了预设目标，true执行回调函数，并绑定this

            })()
        }

/*------------ getStyle  获取样式 --------------*/

        function getStyle(obj,attr){//定义获取样式函数
            return window.getComputedStyle? window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
        }

/*------------ addEvent  注册事件处理函数 --------------*/

         function addEvent(obj,eventType,fn,boolean){
            //事件兼容处理
            boolean=boolean?boolean:false;
            window.handle = handle;//把处理函数赋值给window，便于后面的清除
             obj.addEventListener?obj.addEventListener(eventType,window.handle,boolean):obj.attachEvent('on'+eventType,window.handle);

             //兼容:鼠标滚动
             if(eventType=='mousewheel'){
                obj.onmousewheel = window.handle;//兼容ie chrome
                obj.addEventListener?obj.addEventListener('DOMMouseScroll',window.handle,boolean):false;   //兼容firefox

             }
             //滚动函数event对象处理

             function handle(e){
                e = e || window.event;
                console.log( 'ok')
                e.wheel = e.wheelDelta?e.wheelDelta:-e.detail*40;
                fn.call(obj,e);
            }

        }


/*------------ removeEvent  注销事件处理函数 --------------*/

        function removeEvent(obj,eventType,fn,boolean){
            boolean=boolean?boolean:false;
            obj.removeEventListener?obj.removeEventListener(eventType,window.handle,boolean):obj.detachEvent('on'+eventType,window.handle);
            //兼容:鼠标滚动
             if(eventType=='mousewheel'){
                obj.onmousewheel = null;//兼容ie chrome
                eventType ='DOMMouseScroll';
                obj.removeEventListener?obj.removeEventListener(eventType,window.handle,boolean):false;   //兼容firefox

             }


        }

