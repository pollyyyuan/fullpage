##fullpage
***
####plugin
-  通过深入与学习js后，又理解了jquery的架构，现在通过搭的框架来封装插件
####init simple
-  凭借自己现有知识，把效果做出来
-  pc端的全屏切换实现
-  功能如下：
	- 整个页面横向或竖向切换
	- 使用滚轮，键盘上下左右按键以及点击节点切换
-  html结构
	-  #container代表整个盒子
	   -  .sections代表装内容的盒子
          -  .section代表一个页面
       -  #dots代表装节点的盒子
          -  span代表单个节点
-  css结构
	-  竖向盒子（默认）
		-  .dot-horizonal节点
	-  横向盒子
		-  .section-left页面
		-  .dot-vertical节点
-  fullpage对象
	-  接口
		-  seclector选择器对象
		-  org选择参数对象（动画速度，横向/竖向）
	-  使用
		-  fullpage对象实例化
		-  init()方法，代入以上接口做参数
####standard
-  使用jquery插件方式封装
	
