
## margin-left的负值 与 float 结合使用 ##


结构如下：

	<div style="width:500px; margin:0 auto; border:solid 1px #f3f4ec;">
	    <div style="width:100%; height:40px; background-color:#eaf691; float:left;"></div>
	    <div style="width:100px; height:30px; float:left; background-color:#bed8f9;margin-left:-100px;">①</div>
	    <div style="width:100px; height:30px; float:left; background-color:#bed8f9;margin-left:-100%;">②</div>
	</div>

解释：


        如后面的两个div，它们被包裹在一个定宽的大div中，且它们都是左浮动（float:left），且它们都是定宽，

        这时，给它们一个负的左外边距（margin-left<0），

               如果margin-left =  - 它的宽度时，它就会向上跑到第一个div 的最右面；

               如果margin-left:-100%，它就会跑到第一个div的最左面。

               注意：第一个div的属性是：float:left;width:100%;，即它也是左浮动，且是100%宽度。）

 

margin-left:-100的一个实例（详见图）

 ![](http://p1.bqimg.com/567571/f6f2b4bbae2e3397.png)


 