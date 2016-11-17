/*common*/
var over=false,shapes=("0,1,1,1,2,1,3,1;1,0,1,1,1,2,2,2;2,0,2,1,2,2,1,2;0,1,1,1,1,2,2,2;1,2,2,2,2,1,3,1;1,1,2,1,1,2,2,2;0,2,1,2,1,1,2,2").split(";");
var content=document.getElementById("content")
function create(div,css){
		var even=document.createElement(div);
		even.className=css;
		content.appendChild(even);
		return even;

	}
function TeT(sq,t,x,y){
		var sq=sq?sq:"sq";
		this.divs=[create('div',sq),create('div',sq),create('div',sq),create('div',sq)];
		this.reset=function(){
			this.x = typeof x!='undefined'?x:3;
        	this.y = typeof y != 'undefined'?y:0;

			this.shape=t?t:shapes[Math.floor(Math.random()*(shapes.length))].split(",");
			this.show();
			if(this.container&&this.container.check(this.shape,this.x,this.y,'v')=='D'){
	                over=true;
	                this.container.fullChang(this.shape,this.x,this.y);
	                alert('game over');}

		}
		this.show=function(){
			for(var i in this.divs){
				this.divs[i].style.left=(this.shape[i*2]*1+this.x)*20+"px";
				this.divs[i].style.top=(this.shape[i*2+1]*1+this.y)*20+"px";
			}
		}
		this.rotate=function(){
			var s=this.shape;
			var newShape=[3-s[1],s[0],3-s[3],s[2],3-s[5],s[4],3-s[7],s[6]];
			var r=this.container.check(newShape,this.x,this.y,"h");
			if(r==0){
				this.shape=newShape;
				this.show();
			}

		}
		this.xmove=function(step){
			var r=this.container.check(this.shape,this.x- -step,this.y,'h');
			if(r!='N' && r==0){
				this.x-=-step;
				this.show();

			}
		}
		this.dmove=function(){
		if(this.container.check(this.shape,this.x,this.y- -1,'v')=="N"){
			this.y++;
			this.show();
			}
			else{
				this.container.fullChang(this.shape,this.x,this.y);
				this.container.findFull();
				this.reset();
			}
		}
		this.reset();	
}
	
	function Container(w,h){
		this.width=w?w:10
		this.height=h?h:20

		this.content=function(){
			var cont=create("div","con");
			cont.style.width=this.width*20+"px";
			cont.style.height=this.height*20+"px";

		}
		this.check=function(shape,x,y,d){
			var r1=0,r2="N";
			for(var i=0;i<8;i+=2){	
			 if(shape[i]- -x < 0 && shape[i]- -x <r1)
	                    {r1 = shape[i]- -x;}
	                else if(shape[i]- -x>=this.width && shape[i]- -x>r1)
	                    {r1 = shape[i]- -x;}			
				if(shape[i+1]- -y>=this.height||this[shape[i]- -x- -(shape[i+1]- - y)*this.width]){
					r2="D"
				}
			}		
			if(d=='h'&&r2=='N')return r1>0?r1-this.width- -1:r1;
			else return r2


		}
			this.findFull = function(){
	            for(var l=0;l<this.height;l++){
	                var s=0;
	                for(var i=0;i<this.width;i++){
	                    s+=this[l*this.width+i]?1:0;
						console.log(s);
	                }
	                if(s==this.width){
	                	console.log(s);
	                    this.removeLine(l);}
	                }
	            }

	        this.removeLine = function(line){
	            for(var i=0;i<this.width;i++){
	                content.removeChild(this[line*this.width+i]);
	            }
	            for(var l=line;l>0;l--){
	                for(var i=0;i<this.width;i++){
	                    this[l*this.width- -i]=this[(l-1)*this.width- -i];
	                    if(this[l*this.width- -i])this[l*this.width- -i].style.top = l*20+'px';}}
	                }
		this.fullChang=function(shape,x,y){
			var d=new TeT("d",shape,x,y);
			for(var i=0;i<8;i+=2){
	           this[shape[i]- -x- -(shape[i+1]- -y)*this.width]=d.divs[i/2];}
			}	

	}

	var con=new Container();
	con.content();
	var tet=new TeT();
	tet.container=con;
	tet.reset();
	tet.show();
	var start=document.getElementById("start");
	start.onclick=function(){ 
		setInterval(function(){if(!over)tet.dmove();},500);
	}
	
	document.getElementById("top").ontouchend=function(){
				tet.rotate();
			};
	document.getElementById("left").ontouchend=function(){
			tet.xmove(-1);
			};
	document.getElementById("right").ontouchend=function(){
			tet.xmove(1);
			};
	document.getElementById("bottom").ontouchend=function(){
			tet.dmove();
			};