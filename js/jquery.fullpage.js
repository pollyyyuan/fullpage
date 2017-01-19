// 功能结构
// 实现整个文档的全屏切换
	// 1.封装成名为fullpage方法
	// 2.可带参或不带
	// 3.参数为：横屏还是竖屏，速度等
// jQuery插件封装结构
;(function($){
	// 封装fullpage对象,闭包形式
	var fullpage=(function(){
		//创建fullpage构函
		function fullpage(dom,org){
			//深拷贝，合并默认和自定义参数
			this.options=$.extend(true,org,$.fn.fullpage.defaults.org)||{};
			this.lastIndex=0;//当前页面索引
			this.init(dom);//初始化dom
		}
		//创建fullpage原型
		fullpage.prototype={
			init:function(dom){
				var me=this;
				// 获取最终dom内容
				var doms=$.extend(true,dom,$.fn.fullpage.defaults.dom)||{};
				me.fullBox=doms.fullBox;
				me.pageBox=doms.pageBox;
				me.dotBox=doms.dotBox;
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
			//初始化dot点,创建节点
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
					var margin,
						content;
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
		}
		return fullpage;
	})();
	$.fn.fullpage=function(dom,org){
		var me=$(this),
			instance=me.data('fullpage');
		if(!instance)
		{
			me.data("PageSwitch", (instance = new fullpage(dom,org)));
		}
		return instance;
	}
	$.fn.fullpage.defaults={
		dom:{
			fullBox:$('#container .sections'),
			pageBox:$('#container .section'),
			dotBox:$('#dots')
		},
		org:{
			speed:500,
			direction:'ver'
		}
	};
})(jQuery);