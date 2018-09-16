 /*
    获取ID
 */
function $(param){
    if(typeof(param) == 'function'){
        window.onload = param;
    }else if(typeof(param) == 'string'){
        return document.getElementById(param);
    }
}
/*
    运动框架(位移/折叠/淡入淡出)
 */
function move(dom , json , callback){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var mark = true;
        for(var attr in json){
            //开始没设置值 给0
            var start = null;
            if(attr == "opacity"){
                start = getStyle(dom , attr)*100;
            }else{
                start = parseInt(getStyle(dom , attr))||0;
            }
            var target = json[attr];
            //给一个摩擦系数 依次减小并且取整
            var speed = (target - start) * .3;
            /*
            if(speed>0)speed = Math.ceil(speed);
            if(speed<0)speed = Math.floor(speed);
            */
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            if(start != target){
                if(attr == "opacity"){
                    dom.style.filter = "alpha(opacity="+((start+speed))+")";
                    dom.style[attr] =  (start + speed)/100;
                    console.log(speed+"=="+start+"=="+(start + speed));
                }else{
                    dom.style[attr] =  start + speed + 'px';
                }
                mark = false;
            }
        }
        if(mark){
            clearInterval(dom.timer);
            if(callback)callback.call(dom);
        }
    },30);
};

/*
    siblings节点
 */
function siblings(dom , callback){
    var pDom = dom.parentNode.children;
    for(var i=0;i<pDom.length;i++){
        if(pDom[i] != dom){
            callback.call(pDom[i]);
        }
    }
    /*
    var pDom = dom.parentNode.children;
    var tabs = [].slice.call(pDom);
    tabs.filter(function(obj){
        if(obj != dom){
            callback.call(obj);
        }
    })
    */
}

/*
    获取行间样式
 */
function getStyle(obj , attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}