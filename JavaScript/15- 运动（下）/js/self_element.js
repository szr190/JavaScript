/**
 *
 * @authors 千寻 (68603587@qq.com)
 * @date    2017-09-26 20:35:27
 * @version $Id$
 */
    Element.prototype.animation =animation;

    // function(){
    //     alert(this);//指向调用的对象
    // };
 // (endValue[attr] - startValue[attr]) * prop + startValue[attr]
    //     c*t/d + b
    //     t current time       Date.now() - startTime 运动时长
    //     b beginning value    startValue             初始值
    //     c change in value    endValue[attr] - startValue[attr]总的路程
    //     d duration           target_time             动画总时间
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

            //动画  把变量改成对象属性
 function animation(json,dur,type,callback){
    //var this = this;//
    this.tar_v = {}/*存放目标值*/,this.init_v={}/*存放初始值*/;
    this.init_t = new Date();//获取初始时间值
    for( var attr in json){
        this.tar_v[attr] = parseFloat(json[attr]);//转化为number类型，并去除单位
        this.init_v[attr] = parseFloat(getStyle(this,attr))//获取初始值
    }
    //判断动画类型
    if( typeof type == 'function'){//如果是一个函数
        callback = type;//把回调函数给到callback
        type = 'linear';
    }else{
         type = type||'linear';//type存在就直接赋值，没有就给个'linear'
    }

    (function run(){

        var run_t = new Date()- this.init_t;//动画时长
        if(run_t>=dur){//判断是否到达目标点
            run_t=dur;
        }else{
            window.requestAnimationFrame(run.bind(this));//绑定this
        }
        for(var attr in json){
            var a = (this.tar_v[attr]-this.init_v[attr])*2/Math.pow(dur,2);//具体某个属性的加速度
            var val = a*Math.pow(run_t,2)/2;//当前路程;
            var unit = '';
            switch(attr){
                case 'opacity':
                        break;
                case 'zIndex':
                        break;
                default :
                    unit = 'px';
                    break;
            }
            //     c*t/d + b
            //     t current time       Date.now() - startTime
            //     b beginning value    startValue
            //     c change in value    endValue[attr] - startValue[attr]
            //     d duration           target_time
            var t = run_t,b=this.init_v[attr],c=this.tar_v[attr]-this.init_v[attr],d=dur;
            this.style[attr] = Tween[type](t,b,c,d)+unit;
            //this.style[attr] = this.init_v[attr]+val+unit;
        }
        run_t>=dur?callback&&callback.call(this):false;

    }).bind(this)()//绑定this
}
//获取样式
function getStyle(obj,attr){
    return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
}
