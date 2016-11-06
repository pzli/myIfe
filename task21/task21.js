(function(document){
	function $(id) {
		return document.querySelector(id);
	}

	// 上半部分
	// 存储已经添加的tag,Tag不能有重复的，遇到重复输入的Tag，自动忽视。
	var arr = [];
	var input = document.querySelector("#tag");
	var tagContainer = document.querySelector(".tagContainer");
	// 遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
	document.addEventListener("keyup",function(e){
		if(/(,| |\，)$/.test(input.value) || e.keyCode == 13) {
			// 将输入input的value处理匹配
			// match返回一个数组
			var str = input.value.trim().match(/[^, \，]*/)[0];
			if(arr.indexOf(str) > -1 || str == "") {// 如果arr数组中存在了str
				input.value = "";
				return;
			}else {// 如果arr数组中不存在str
				if(arr.length >= 10) { // 如果数量已经大于等于10
					arr.push(str);
					arr.shift();
					input.value = "";
					render();
				} else { // 小于10
					arr.push(str);
					render();
					input.value = "";
				}
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
			arr.splice(index,1);
			render();
		}
	},false);

	// 渲染函数,将数组中的数字渲染到wrap中
	function render(){
		tagContainer.innerHTML = "";
		var inner = "";
		for(var i = 0; i < arr.length; i++) {
			inner += "<span data-index="+ i +">"+ arr[i] +"</span>";
		}
		tagContainer.innerHTML = inner;
	};

	

	// 通过代理方式完成点击某一项删除
	wrap.addEventListener("click",function(e){
		if(e.target.nodeName == "SPAN") {
			var index = e.target.dataset.index;
			arr.splice(index,1);
			render();
		}
	},false);

	

	// 批量增加点击的方法
	addMore.addEventListener("click",function(){
		var txt = text.value;
		//console.log(txt);
		// 将文本框中的按非数字字母中文分隔,并且加一个过滤器
		var textArr = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(v){
			if(v != null && v.length > 0) {
				return true;
			} else {
				return false;
			}
		});
		// console.log(textArr);
		arr = arr.concat(textArr);
		console.log(arr);
		render();
	},false);
	// 查询按钮点击的方法
	searchBtn.addEventListener("click",function(){
		var text = search.value.toString();
		var array = [];
		// 将需要变色的索引号添加到一个新数组中
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].toString().indexOf(text) != -1) {// 判断文本框中的数是否是数组中的某几项的子串
				array.push(i);
			}
		}
		// 将该数组中的歌索引值对应的span变色
		for(var j = 0; j < array.length; j++) {
			var spans = wrap.children;
			spans[array[j]].style.backgroundColor = "black";
		}
	},false);

})(document);