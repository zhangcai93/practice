// JavaScript Document


function startMove(obj, attr, iTarget, fn){
	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		
		var iCstyle = 0;
		if( attr == "opacity"){
			iCstyle =parseInt(parseFloat(getStyle(obj, attr))*100); 
		}else{
			iCstyle =parseInt(getStyle(obj, attr));
		}
		 
		
		var iSpeed = (iTarget- iCstyle)/8;
		iSpeed = iSpeed>0? Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(iCstyle == iTarget){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
			
			
		}else{
			
			if( attr == "opacity"){
				obj.style.filter = "alpha(opacity :'+iCstyle + iSpeed+')";
				obj.style.opacity = (iCstyle + iSpeed)/100;
			}else{
				obj.style[attr] = iCstyle + iSpeed + "px";
			}
			
		}
		
	}, 30);
}

function getStyle(obj , attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}