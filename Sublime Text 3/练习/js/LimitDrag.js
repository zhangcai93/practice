function LimitDrag(id){

	//1.继承Drag类的属性
	Drag.call(this, id);

}

//2.继承Drag类的方法
for( var i in Drag.prototype){
	LimitDrag.prototype[i] = Drag.prototype[i];
}

LimitDrag.prototype.fnMove =function(ev){ 
//父类也有fnMove方法，现在会把它覆盖掉，执行时会执行子类的fnMove。

	var oEvent = ev || event;

	var l = oEvent.clientX - this.disX;
	var t = oEvent.clientY - this.disY;

	if( l < 0){
		l = 0;
	}else if(l > document.documentElement.clientWidth - this.oDiv.offsetWidth){
		l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
	}
	if( t < 0){
		t = 0;
	}else if(t > document.documentElement.clientHeight - this.oDiv.offsetHeight){
		t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
	}

	this.oDiv.style.left = l + 'px';
	this.oDiv.style.top = t +'px';
}