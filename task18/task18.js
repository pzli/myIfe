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

	// 用一个数组存储数据
	var arr = [];
	// 4个button函数,每次点击按钮后,重新渲染页面
	leftIn.addEventListener("click",function(){
		isNum(parseInt(text.value));
		arr.unshift(text.value);
		render();
	},false);
	rightIn.addEventListener("click",function(){
		isNum(parseInt(text.value));
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

	// 判断输入文本的合法性
	function isNum(num){
		if(isNaN(num)) {
			alert("只能输入一个数字");
			return;
		}
	}

	// 渲染函数,将数组中的数字渲染到wrap中
	function render(){
		wrap.innerHTML = "";
		var inner = "";
		for(var i = 0; i < arr.length; i++) {
			inner += "<span data-index="+ i +">"+ arr[i] +"</span>";
		}
		wrap.innerHTML = inner;
	};
})(document);