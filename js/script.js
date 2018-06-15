// JavaScript Document
/*封装一个代替getElementById（）的方法*/
function byId(id){
    'use strict';
    return typeof(id) === "string"?document.getElementById(id):id;
}
//全局变量
var index = 0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    len = pics.length,
    dots = byId("dots").getElementsByTagName("span"),
    prev = byId("prev"),
    next = byId("next"),
    menu = byId("menu-content"),
    menuItems = menu.getElementsByClassName("menu-item"),
    subMenu = byId("sub-menu"),    
    innerBox = subMenu.getElementsByClassName("inner-box");




function slideImg() {
    'use strict';
    var main=byId("main");
    //滑过清除定时器，离开继续。
    main.onmouseover = function(){
        //滑过清除定时器
        if(timer) {
            clearInterval(timer);
        }
    };
    main.onmouseout = function(){
        timer = setInterval(function(){
          index++;
            if(index>=len){
                index=0;
            }
           // 切换图片
            changeImg();
        },3000);   //间歇调用
    };
    //自动在main上触发鼠标滑过事件。
    main.onmouseout();
    //遍历所有点击，且绑定点击事件，点击圆点切换图片
    for(var d=0; d<len; d++){
        //给所有span添加一个id的属性，值为d，作为当前span的索引。
        dots[d].id = d;
        dots[d].onclick = function(){
           // 改变index为当前span的索引
            index = this.id;
            
            //调用函数，切换图片。
            changeImg();
        };
    }
     //上一张
    prev.onclick=function(){
        index--;
        if(index<0){
            index=2;
        }
       changeImg();
    };
    //下一张
    next.onclick = function(){
        index++;
        if(index>= len){
            index=0;
        }
        changeImg();
    };
    // 导航菜单
    //遍历主菜单且绑定事件；
    for (var m=0; m<menuItems.length; m++){
        //给每一个menu-item定义data-index属性，作为索引。
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover=function(){
            subMenu.className = "sub-menu";
           var idx=this.getAttribute("data-index");
            //遍历所有子菜单，将每一个都隐藏。
            for(var j=0; j<innerBox.length; j++){
                innerBox[j].style.display="none";
                menuItems[j].style.background="none";
            }
           menuItems[idx].style.background='rgba(0,0,0,0.1)';
           innerBox[idx].style.display="block";
        }
    }
   
    menu.onmouseout = function(){
        subMenu.className="sub-menu hide";
    }
    subMenu.onmouseover=function(){
        this.className="sub-menu";
    }
    subMenu.onmouseout=function(){
        this.className="sub-menu hide"; 
    }
}
// 切换图片
function changeImg(){
    'use strict';
    // 遍历banner下所有div将其隐藏
    for(var i = 0; i<len; i++){
        pics[i].style.display='none';
        dots[i].className="";
    }
    //根据index索引找到当前div将其显示出来。
    pics[index].style.display='block';
    dots[index].className="active";
}
slideImg();



























