(function(document){
	function $(id) {
		return document.querySelector(id);
	}
	var text = $("#text");
	var leftIn = $("#left-in");
	var rightIn = $("#right-in");
	var leftOut = $("#left-out");
	var rightOut = $("#right-out");
	var wrap = $(".wrap");
	var addMore = $("#addMore");
	var search = $("#search");
	var searchBtn = $("#search-btn");

	// 用一个数组存储数据
	var arr = [];
	// 4个button函数,每次点击按钮后,重新渲染页面
	leftIn.addEventListener("click",function(){
		if(isNaN(text.value)) {
			alert("只能输入一个数字");
			return;
		}
		arr.unshift(text.value);
		render();
	},false);
	rightIn.addEventListener("click",function(){
		if(isNaN(text.value)) {
			alert("只能输入一个数字");
			return;
		}
		arr.push(text.value);
		render();
	},false);
	leftOut.addEventListener("click",function(){
		var num = arr.shift(text.value);
		render();
		alert("删除了"+num);
	},false);
	rightOut.addEventListener("click",function(){
		var num = arr.pop(text.value);
		render();
		alert("删除了"+num);
	},false);

	// 通过代理方式完成点击某一项删除
	wrap.addEventListener("click",function(e){
		if(e.target.nodeName == "SPAN") {
			var index = e.target.dataset.index;
			arr.splice(index,1);
			render();
		}
	},false);

	// 渲染函数,将数组中的数字渲染到wrap中
	function render(){
		wrap.innerHTML = "";
		var inner = "";
		for(var i = 0; i < arr.length; i++) {

			inner += "<span data-index="+ i +" style='color: #fff;'>"+ arr[i] +"</span>";
		}
		wrap.innerHTML = inner;
	};

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