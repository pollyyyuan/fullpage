// 功能结构
// 实现整个文档的全屏切换
	// 1.封装成fullpage方法
	// 2.可带参或不带
	// 3.参数为：横屏还是竖屏，速度等
// jQuery插件封装结构
;(function($){
	//对象实例化，转化为方法
	$.extend({
		"fullPage":function(dom,speed,options){
		var eg=new fullpage(options,speed);
		return eg.init(dom);
		}
	});
	//创建fullpage对象
	var fullpage=function(options,speed){
		this.options=$.extend({
			direction:"ver",//可选：ver,hor,表示方向
		},options);
		this.speed=speed||500;//速度，默认500
		this.lastIndex=0;//当前页面索引
	};	
	//创建fullpage的原型
	fullpage.prototype={
	// 初始化方法,dom表示页面节点对象，options表示修改参数
	init:function(dom){
		var me=this;
		//获取节点保存至对象
		me.parentBox=dom.parentBox;
		me.fullBox=dom.fullBox;
		me.pageBox=dom.pageBox;
		me.dotBox=dom.dotBox;
		//页面的个数
		me.pageNum=me.pageBox.length;
		console.log(me.pageNum);
		//一个页面的长度和宽度
		me.pageWidth=me.pageBox.width();
		me.pageHeight=me.pageBox.height();
		// 根据横屏竖屏不同，来修改装页面容器
		if(me.options.direction=='hor')
		{
			me.fullBox.css('width',me.pageNum*100+'%');
			me.pageBox.addClass('section-left');
			me.pageBox.css('width',100/me.pageNum+'%');
		}
		// 初始化节点
		me.initDot();
		//初始化方法
		me.initEvent();
	},
	//初始化dot点
	initDot:function(){
		var me=this;
		if(me.pageNum)
		{	
			var str='';
			//根据页面个数创建节点
			for(var i=0;i<me.pageNum;i++)
			{
				str+='<span class="dot" data-index='+i+'></span>';
			}
			//节点加到页面上
			me.dotBox.html(str);
			//增加高亮效果
			me.dotBox.find('span').eq(0).addClass('dot-active');
			var margin;
			var content;
			// 判断是横向还是竖向
			if(me.options.direction=='hor')
			{	
				margin='margin-left';
				content='width';
				me.dotBox.addClass('dots-herizonal');
			}
			else{
				margin='margin-top';
				content='height';
				me.dotBox.addClass('dots-vertical');
			}
			me.dotBox.css(margin,function(){
				var c=parseInt($(this).css(content));
				return -c/2+'px';
			});		
		}
	},
	//节点变换方法
	activeDot:function(dom){
			dom.addClass('dot-active').siblings().removeClass('dot-active');
	},
	//绑定事件
	initEvent:function(){
		var me=this;
		var span=this.dotBox.find('span');
		// 节点点击事件
		span.on('click',function(){
			me.lastIndex=$(this).attr('data-index');
			me.activeDot($(this));
			me.move(me.lastIndex);
		});
		// jquery 兼容的滚轮事件和键盘上下左右事件
		$(document).on("mousewheel DOMMouseScroll keydown", function (e) {
    		var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
			var key=e.keyCode;
        		// 向上滚
    		if ((delta > 0||key==37||key==38)&&me.lastIndex>0) {
        		me.lastIndex--;
        		console.log(me.lastIndex);
        		me.move(me.lastIndex);
        		me.activeDot(me.dotBox.find(span).eq(me.lastIndex));
   			} 
       		 // 向下滚
   			 else if ((delta < 0||key==39||key==40)&&me.lastIndex<me.pageNum-1) {
        		me.lastIndex++;
        		console.log(me.lastIndex);
        		me.move(me.lastIndex);
        		me.activeDot(me.dotBox.find(span).eq(me.lastIndex));
    		}
        	
            
		});
		// 窗口改变事件
		$(window).resize(function(){
			// 重新修改页面宽度和长度
			me.pageWidth=parseInt(me.pageBox.css('width'));
			me.pageHeight=parseInt(me.pageBox.css('height'));
		});
	},
	//页面移动动画
	move:function(index){
		if(this.options.direction=='ver'){
		this.fullBox.animate({'top':-index*this.pageHeight+'px'},this.speed);
		}
		else if(this.options.direction=='hor'){
		this.fullBox.animate({'left':-index*this.pageWidth+'px'},this.speed);	
		}
	}
};
})(jQuery);