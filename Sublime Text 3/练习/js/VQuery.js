/*
	封装自己的VQuery
*/

function myAddEvent(obj, sEv, fn) {
	if (obj.attachEvent) {
		obj.attachEvent('on'+sEv, function(){
			//fn.call(obj);   //解决IE的this问题
			if(fn.call(obj) == false){
				event.cancelBubble = true;  //阻止冒泡
				return false;   //阻止默认事件
			}
		});
	} else {
		obj.addEventListener(sEv, function(ev){
			if(fn.call(obj) == false){
				ev.cancelBubble = true;  //阻止冒泡
				ev.preventDefault();   //阻止默认事件
			}
		}, false);
	}
}

function getByClass(oParent, sClass){
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	for (var i = 0; i <aEle.length; i++) {
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

function getStyle(obj, attr){  //获取样式(包括非行间样式)
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}

/*
	面向对象——VQuery类
		elements属性，存储选中的元素
	参数vArg：
		typeof判断类型：
			1：函数function：时间绑定
			2：字符串string：id、class、tagName
			3：对象object：直接插入
	$函数：使用时不用每次new了
*/
function $(vArg){
	return new VQuery(vArg);
}

function VQuery(vArg){

	//用来保存选中的元素
	this.elements = [];

	switch(typeof vArg){

		case 'function':
			//window.onload = vArg;
			myAddEvent(window, 'load', vArg);
			break;

		case 'string':
			switch(vArg.charAt(0)){
				case '#':  //id
				//substring取子字符串
					var obj = document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case '.':  //class
					this.elements = getByClass(document, vArg.substring(1) );
					break;
				default:   //TagName
					this.elements = document.getElementsByTagName(vArg);
			}
			break;

		case 'object':
			this.elements.push(vArg);
	}
}

VQuery.prototype.click = function(fn) {
	for (var i = 0; i< this.elements.length; i++) {
		myAddEvent(this.elements[i], 'click', fn);
	}
	return this;
};

VQuery.prototype.show = function(fn) {
	for (var i = 0; i< this.elements.length; i++) {
		this.elements[i].style.display = 'block';
	}
	return this;
};

VQuery.prototype.hide = function(fn) {
	for (var i = 0; i< this.elements.length; i++) {
		this.elements[i].style.display = 'none';
	}
	return this;
};

VQuery.prototype.hover = function(fnOver, fnOut) {
	for (var i = 0; i< this.elements.length; i++) {
		myAddEvent(this.elements[i], 'mouseover', fnOver);
		myAddEvent(this.elements[i], 'mouseout', fnOut);
	}
	return this;
};

VQuery.prototype.toggle = function() {

	//var count = 0;
	var _arguments = arguments;
	//console.log(_arguments);
	for (var i = 0; i< this.elements.length; i++) {
		addToggle(this.elements[i]);
	}
	function addToggle(obj){
		var count = 0;
		myAddEvent(obj, 'click', function(){
			//alert(count++)
			_arguments[count%_arguments.length].call(obj);
			count++; 
		});
	}
	return this;
};

//css()方法：一个参数获取样式；两个参数设置样式
VQuery.prototype.css = function(attr, value) {

	if(arguments.length == 2){ //设置样式
		for (var i = 0; i< this.elements.length; i++) {
			this.elements[i].style[attr] = value ;
		}
	}else if(arguments.length == 1){ 
			if(typeof attr == 'string' ){//获取样式,获取第一个匹配的样式
				return getStyle(this.elements[0],attr);
			}else{  //json形式的设置样式,for-in循环json
				for(var i=0; i<this.elements.length; i++){
					for(var k in attr){
						this.elements[i].style[k] = attr[k];
					}
				}
			}		
	}
	return this;  //函数的链式操作
};

VQuery.prototype.attr = function(attr, value) {

	if(arguments.length == 2){ //设置属性
		for (var i = 0; i< this.elements.length; i++) {
			this.elements[i][attr] = value ;
		}
	}else if(arguments.length == 1){ //获取属性
			return this.elements[0][attr];
	}
	return this;
};

VQuery.prototype.eq = function(n) {
    //this.elements[n];    //这是一个原生的元素,JS对象
    return $(this.elements[n]);    //$()包装一下变为JQ/VQ对象
};

VQuery.prototype.find = function(str) {
    //str可以是标签名或者class

    var aResult = [];

    for (var i = 0; i< this.elements.length; i++) {
		switch(str.charAt(0)){
			
			case '.':  //class
				var aEle = getByClass(this.elements[i], str.substring(1) );
				aResult = aResult.concat(aEle);
				break;

			default:   //TagName
				var aEle = this.elements[i].getElementsByTagName(str);
				//getElementsByTagName()返回的是一个collection元素集合而不是数组
				//concat方法只能用在数组之间
				//aResult = aResult.concat(aEle);
				appendArr(aResult, aEle);
		}	
	}
	var newVquery = $();  //空对象
	newVquery.elements = aResult;  //更改空对象的elements为aResult
	return newVquery;   //返回更改的对象
};
function appendArr(arr1, arr2){  //解决集合不能使用concat连接的问题
	for(var i=0; i<arr2.length; i++){
		arr1.push(arr2[i]);
	}
}

VQuery.prototype.index = function() {
	//index方法就是求一个元素在同级中的位置（序号）
	return getIndex(this.elements[0]);
}
function getIndex(obj){
	var aBrother=obj.parentNode.children;
	var i=0;
	
	for(i=0;i<aBrother.length;i++)
	{
		if(aBrother[i]==obj)
		{
			return i;
		}
	}
}

/*
	VQuery高级特性

	return this;返回VQuery对象，以便于链式操作

	阻止冒泡和默认事件

	插件机制——核心：extend方法
*/

VQuery.prototype.bind = function(sEv, fn) {

	for (var i = 0; i< this.elements.length; i++) {
		myAddEvent(this.elements[i], sEv, fn);
	}
};

VQuery.prototype.extend = function(name, fn) {

	VQuery.prototype[name] = fn;
};
/*$().extend('show', function(){
	alert('abc')
})
相当于：VQuery.prototype['show'] = function(){
	alert('abc')
}
$().show();*/

