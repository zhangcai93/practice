
		var iSpeed = 0;


		function startMove(obj, attr, iTarget){
			clearInterval(obj.timer);

			obj.timer = setInterval(function(){

				var iCur = parseInt(getStyle(obj, attr));

				iSpeed += (iTarget - iCur)/5;
				iSpeed *= 0.7;

				if( Math.abs(iSpeed)<1 && Math.abs(iCur - iTarget)<1 ){
					clearInterval(obj.timer);
					obj.style[attr] = iTarget + 'px';
				}else{

					iCur += iSpeed;
					
					obj.style[attr]= iCur + 'px';
				}
	
			}, 30)
		}

function getStyle(obj , attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}
