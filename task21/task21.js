(function(document){
	var createTag = (function(){
		// 创建构造函数
		function _tag(input, container, button){
			/*存储数据的数组*/
			this.arr = [];
			/*input或者textarea,数据从此输入*/
			this.input = document.querySelector(input);
			/*将输入的数据渲染到此处*/
			this.container = document.querySelector(container);
			/*添加的按钮*/
			this.button = document.querySelector(button);
			/*根据是否有btn来判断渲染上半部分或者下半部分*/
			this.button ? this.init(true) : this.init(false);
		}

		// 原型方法
		_tag.prototype = {
			/*渲染函数*/
			render: function(){
				this.container.innerHTML = "";
				var inner = "";
				for(var i = 0; i < this.arr.length; i++) {
					inner += "<span data-index="+ i +">"+ this.arr[i] +"</span>";
				}
				this.container.innerHTML = inner;
			},

			/*检测数据是否重复,重复返回true*/
			dereplication: function(str, arr){
				for(var i = 0; i < arr.length; i++) {
					if(arr[i] == str) {
						return true;
					}
				}
			},

			/*初始化函数*/
			init: function(isBtn){
				var self = this;
				//当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
				this.container.addEventListener("mouseover",function(e){
					if(e.target.nodeName == "SPAN") {
						e.target.textContent = "删除:" + e.target.textContent;
					}
				},false);
				this.container.addEventListener("mouseout",function(e){
					if(e.target.nodeName == "SPAN") {
						e.target.textContent = e.target.textContent.replace("删除:","");
					}
				},false);
				this.container.addEventListener("click",function(e){
					if(e.target.nodeName == "SPAN") {
						var index = e.target.dataset.index;
						self.arr.splice(index,1);
						self.render();
					}
				},false);
				if(!isBtn) { //不存在按钮,说明是上半部分
					// 遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
					document.addEventListener("keyup",function(e){
						if(/(,| |\，)$/.test(self.input.value) || e.keyCode == 13) {
							// 将输入input的value处理匹配
							// match返回一个数组
							var str = self.input.value.trim().match(/[^, \，]*/)[0];
							if(self.dereplication(str, self.arr) || str == "") {// 如果arr数组中存在了str
								self.input.value = "";
								return;
							}else {// 如果arr数组中不存在str
								if(self.arr.length >= 10) { // 如果数量已经大于等于10
									self.arr.shift();
								}
								self.arr.push(str);
								self.input.value = "";
								self.render();
							}
						}
					},false);
				}else {
					// 批量增加的方法
					this.button.addEventListener("click",function(){
						var txt = self.input.value;
						//console.log(txt);
						// 将文本框中的按非数字字母中文分隔,并且加一个过滤器,去掉空字符串
						var textArr = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(v){
							if(v != null && v.length > 0) {
								return true;
							} else {
								return false;
							}
						});
						for(var i = 0; i < textArr.length; i++) {
							if(!self.dereplication(textArr[i], self.arr)) { // 不存在
								if(self.arr.length >= 10) {
									self.arr.shift();
								}
								self.arr.push(textArr[i]);
							}
						}
						self.render();
					},false);
				}
			}
		}
		return _tag;
	})();
	



	var tag = new createTag("#tag",".tagContainer");
	var hobby = new createTag("#hobby",".hobbyContainer","#btn");

	
})(document);