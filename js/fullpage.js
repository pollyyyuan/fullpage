
// 创建fullpage全屏切换对象
function fullpage(){
	// 默认参数
	this.org={
		direction:"vertical",//可选：vertical,horizonal,表示方向
		duriation:500,//表示速度
		loop:false//表示是否循环
	};
	//当前页面索引
	this.lastIndex=0;
	this.key=0;
}
fullpage.prototype={
	// 初始化方法,dom表示页面节点对象，options表示修改参数
	init:function(dom,options){
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
		me.pageWidth=parseInt(me.pageBox.css('width'));
		me.pageHeight=parseInt(me.pageBox.css('height'));
		//修改默认参数
		if(options)
		{
			me.org.direction=options.direction;
			me.org.duriation=options.duriation;
			me.org.loop=options.loop;
		}
		if(me.org.direction=='horizonal')
		{
			me.fullBox.css('width',me.pageNum*100+'%');
			me.pageBox.addClass('section-left');
			me.pageBox.css('width',100/me.pageNum+'%');
		}
		me.initDot();
		me.initEvent();
	},
	//初始化dot点
	initDot:function(){
		var me=this;
		if(me.pageNum)
		{	
			var str='';
			for(var i=0;i<me.pageNum;i++)
			{
				str+='<span class="dot" data-index='+i+'></span>';
			}
			me.dotBox.html(str);
			me.dotBox.find('span').eq(0).addClass('dot-active');
			var margin;
			var content;
			// 判断是横向还是竖向
			if(me.org.direction=='horizonal')
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
		span.on('click',function(){
			me.lastIndex=$(this).attr('data-index');
			me.activeDot($(this));
			me.move(me.lastIndex);
		});
		// jquery 兼容的滚轮事件
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
		$(window).resize(function(){
			me.pageWidth=parseInt(me.pageBox.css('width'));
			me.pageHeight=parseInt(me.pageBox.css('height'));
		});
	},
	move:function(index){
		if(this.org.direction=='vertical'){
		this.fullBox.animate({'top':-index*this.pageHeight+'px'},this.org.duriation);
		}
		else if(this.org.direction=='horizonal'){
		this.fullBox.animate({'left':-index*this.pageWidth+'px'},this.org.duriation);	
		}
	}

}