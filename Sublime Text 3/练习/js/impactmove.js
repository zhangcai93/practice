		var timer = null;
		var iSpeedX = 0;
		var iSpeedY = 0;
		 
		function startMove(obj){

			clearInterval(timer);

			timer = setInterval(function(){
				//var oDiv = document.getElementById('div1');

				iSpeedY += 3;

				var l = obj.offsetLeft + iSpeedX;
				var t = obj.offsetTop + iSpeedY;

				if(t >= document.documentElement.clientHeight - obj.offsetHeight){
					//alert(document.documentElement.clientHeight);
					iSpeedY *= -0.8;
					iSpeedX *= 0.8;
					t= document.documentElement.clientHeight - obj.offsetHeight;

				}else if(t <=0 ){
					iSpeedY *= -0.8;
					iSpeedX *= 0.8;
					t= 0;
				}
				//console.log(iSpeedY);
				if(l >= document.documentElement.clientWidth - obj.offsetWidth){
					iSpeedX *= -0.8;
					l = document.documentElement.clientWidth - obj.offsetWidth;
				}else if( l <= 0){
					iSpeedX  *= -0.8;
					l = 0;
				}

				if(Math.abs(iSpeedX) < 1){
					iSpeedX = 0;
				}if(Math.abs(iSpeedY) < 1){
					iSpeedY = 0;
				}

				if(iSpeedX == 0 && iSpeedY == 0 && t == document.documentElement.clientHeight - obj.offsetHeight){
					clearInterval(timer);
				}else{
					obj.style.left = l + 'px';
					obj.style.top = t + 'px';
				}

			}, 30)
		}