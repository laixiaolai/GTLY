/*轮播*/

function PicSlide(panel,opt){
    this.panel=typeof panel=="string"?document.getElementById(panel):panel;
    for(var k in opt)this[k]=opt[k]
    this.init()
};
PicSlide.prototype={
    current:0,
    timer:null,
    time:null,
    type:"scroll",
    act:"scroll",
    interval:4000,
    init:function (){
        var _this=this,world=this.panel.parentNode;
        this.imgs=this.panel.getElementsByTagName("li");
        for(var i=0,l=this.imgs.length;i<l;i++)
            this.imgs[i].style.cssText="position:absolute;display:"+(i==0?"":"none");
        this.createTab();
        this.interval=Math.max(this.interval,this.time);
        world.onmouseover=function (){_this.hover=true};
        world.onmouseout=function (){_this.hover=false};
        this.auto()
    },
    createTab:function (){
        var len=this.imgs.length,btn,_this=this;
        this.nav=document.getElementById(this.panel.id+"_nav");
        this.btns=this.nav.getElementsByTagName("li");
        for(var i=0;i<len;i++){
            btn=this.btns[i];
            if(i==0)btn.className="nd-active";
            btn.radioIndex=i;
            btn.onmouseover=function (){_this.focus(this.radioIndex)}
        }
    },
    focus:function (next){
        next=next%this.imgs.length;
        if(next==this.current)return;
        this.btns[this.current].className="";
        this.btns[next].className="nd-active";
        this.fade(next);
    },
    fade:function (next){
        var _this=this;
        clearInterval(this.timer);
        this.timer=this.fx(1,0,function (x){
           _this.opacity( _this.imgs[_this.current],x)
        },function (){
            _this.imgs[_this.current].style.display="none";
            _this.opacity(_this.imgs[next],0);
            _this.imgs[next].style.display="";
            _this.current=next;
            _this.timer=_this.fx(0,1,function (x){
                _this.opacity( _this.imgs[next],x)
            },0,200,.5)
        })
    },
    fx:function (f,t,fn,ed,tm,r){
        var D=Date,d=new D,e,ed=ed||D,c=tm||0,r=r||5;
        return e=setInterval(function (){
            var z=Math.min(1,(new D-d)/c);
            var stop=fn(+f+(t-f)*Math.pow(z,r),z);
            if(z==1||false===stop)ed(clearTimeout(e))
        },10)
    },
    opacity:function (el,n){
       el.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+n*100+");";
       if(n==1)el.style.filter=null;	
       el.style.opacity=n;       
    },
    auto:function (){
        var _this=this;
        setInterval(function (){if(!_this.hover)_this.focus(_this.current+1)},this.interval);
    }
};


/*获取非行间样式*/
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
}

/*运动框架*/
function startMove(obj,attr,iTarget){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=0;
        if(attr=='opacity'){
            cur=Math.round(parseFloat(getStyle(obj,attr))*100);
        }
        else{
            cur=parseInt(getStyle(obj,attr));
        }

        var speed=(iTarget-cur)/6;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);

        if(cur==iTarget){
            clearInterval(obj.timer);
        }
        else{
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
                
            }
            else{
                obj.style[attr]=cur+speed+'px';
            }
        }
    },30);
}