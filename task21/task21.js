(function(document){
	function $(id) {
		return document.querySelector(id);
	}

	// 上半部分
	// 存储已经添加的tag,Tag不能有重复的，遇到重复输入的Tag，自动忽视。
	var tagArr = [];
	var input = $("#tag");
	var tagContainer = $(".tagContainer");
	// 遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
	document.addEventListener("keyup",function(e){
		if(/(,| |\，)$/.test(input.value) || e.keyCode == 13) {
			// 将输入input的value处理匹配
			// match返回一个数组
			var str = input.value.trim().match(/[^, \，]*/)[0];
			if(dereplication(str, tagArr) || str == "") {// 如果arr数组中存在了str
				input.value = "";
				return;
			}else {// 如果arr数组中不存在str
				if(tagArr.length >= 10) { // 如果数量已经大于等于10
					tagArr.shift();
				}
				tagArr.push(str);
				input.value = "";
				render(tagContainer, tagArr);
			}
		}
	},false);

	//当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
	tagContainer.addEventListener("mouseover",function(e){
		if(e.target.nodeName == "SPAN") {
			e.target.textContent = "删除:" + e.target.textContent;
		}
	},false);
	tagContainer.addEventListener("mouseout",function(e){
		if(e.target.nodeName == "SPAN") {
			e.target.textContent = e.target.textContent.replace("删除:","");
		}
	},false);
	tagContainer.addEventListener("click",function(e){
		if(e.target.nodeName == "SPAN") {
			var index = e.target.dataset.index;
			tagArr.splice(index,1);
			render(tagContainer, tagArr);
		}
	},false);

	/*渲染函数,将数组中的数字渲染到wrap中*/
	function render(container, arr){
		container.innerHTML = "";
		var inner = "";
		for(var i = 0; i < arr.length; i++) {
			inner += "<span data-index="+ i +">"+ arr[i] +"</span>";
		}
		container.innerHTML = inner;
	};

	/*检测数据是否重复,重复返回true*/
	function dereplication(str, arr){
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == str) {
				return true;
			}
		}
	}

	

	// 下方，实现一个兴趣爱好输入的功能

	
	var hobbyArr = [];
	var hobbyContainer = $(".hobbyContainer");
	// 批量增加点击的方法
	$("#btn").addEventListener("click",function(){
		var txt = $("#text").value;
		//console.log(txt);
		// 将文本框中的按非数字字母中文分隔,并且加一个过滤器
		var textArr = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(v){
			if(v != null && v.length > 0) {
				return true;
			} else {
				return false;
			}
		});
		for(var i = 0; i < textArr.length; i++) {
			if(!dereplication(textArr[i], hobbyArr)) { // 不存在
				if(hobbyArr.length >= 10) {
					hobbyArr.shift();
				}
				hobbyArr.push(textArr[i]);
			}
		}
		render(hobbyContainer, hobbyArr);
	},false);
})(document);