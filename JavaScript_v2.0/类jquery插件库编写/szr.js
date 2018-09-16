/*
 	@version:szr.js
 	@author:Jerry Smith (石展瑞)
*/

//(1)首先要一个封闭的空间,立马执行,这里就用到了函数表达式
!function(){
	//$接口函数---只能通过它来访问这个库
	//传参就要接收参数
	function $(wd){
		//alert(1);---测试$
		//要判断传入的形参是什么类型
		var typeW=(typeof wd).toLowerCase();
		//alert(typeP);---测试数据类型
		//是string类型的话,才能继续操作(只响应字符串类型)
		if(typeW=='string'){
			//调用一次$返回一个对象,这些对象拥有共同的属性和方法,就要运用到面向对象的方式
			return new Init(wd);//返回的是构造函数构造出来的对象
			
			//为什么还需要传参数呢？----因为需要根据你的参数去找对应的json对象
			
		}
	};
	//返回的是构造函数的对象,那就要创造szr对象的构造函数
	function Init(king){
		//在对象里面肯定会执行一些方法,是一些公共属性
		
		//给每一个对象设置私有属性,存储对应的js对象
		this.jsObj=this.init(king);
		
	};
	
	//在写面向对象的时候：
			        //(1)私有属性写在构造函数里面
			        //(2)公共属性写在prototype里面
	Init.prototype={
		//init 返回一个存储js对象的数组
		//通过参数找相应的js对象
		init:function(ks){
			var fstr=ks[0];//先取出ks的第一个字符
			//例如TagName,className取出的有可能是单个对象或者是多个对象,不好区分,所以把它们统统放到一个数组里面去
			var arr=[];
			//接下来判断#[attr]/.[attr]/[attr]-----用switch case去判断
			switch (fstr){
				case '#':
						//把所有的#号替换成空字符串,找到元素
						arr.push(document.getElementById(ks.replace(/#/,'')));
					break;
				case '.':
						var ksclass=ks.replace(/\./,'');
						if(document.getElementsByClassName){
							//如果是className,就把.替换成空字符串,找到元素
							//  /\./---转义点
							//由于传入的元素多个,是一个动态的,所以直接用arr=...(因为它是一个动态的类数组)是不行的,可行的方法是用for循环
							var x=document.getElementsByClassName(ksclass);
							//提前计算好长度,只需要计算一次,提高执行的效率
							var xl=x.length;
							for (var i=0;i<xl;i++) {
								arr.push(x[i]);//这样x是动态的,arr就是一个固定的数组
							}
						}
						else{
							//*方式
							//先获取到所有元素
							var allE=document.getElementsByTagName('*');
							//计算出元素的长度
							var allEl=allE.length;
							for (var i=0;i<allEl;i++) {
								//循环找到类元素,并用空格分割
								var arrclass=allE[i].classname.split(' ');
								//获取找到元素的长度
								var al=arrclass.length;
								//for循环添加到数组中去
								for (var j=0;j<al;j++) {
									if (arrclass[j]==ksclass) {
										arr.push(allE[i]);
									};
								};
							};
						}
						break;
				default :
						//还有一种情况就是获取标签了
						
						//获取到标签名称
						var x=document.getElementsByTagName(ks);
						//计算出标签的长度
						var xl=x.length;
						//for循环添加到数组中
						for (var i=0;i<xl;i++) {
							arr.push(x[i]);
						}
						break;
					
				
			}
			//这样返回一个数组就行了
			return arr;
			
		},
		//css
		css:function(){
			//不定参
			var omw=arguments;
			//
			var typeO=(typeof omw).toLowerCase();
			if(typeO=='object'){
				if(omw.length!=undefined){
					//不是json的情况
					for(var i=0;i<this.jsObj.length;i++){
						//属性=属性值
						this.jsObj[i].style[omw[0]]=omw[1];
					}
				}else{
					//是json的情况
					for(var i=0;i<this.jsObj.length;i++){
						//使用for in循环遍历
						for(var key in omw){
							this.jsObj[i].style[key]=omw[key];
						}
					}
				}
			}
		},
		//eq
		eq:function(){
			
		},
	};
	
	//外面要用这个$要怎么做呢？
	window.$=$;
}();
