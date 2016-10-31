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
		if(isNaN(text.value)) {
			alert("只能输入一个数字");
			return;
		} else {
			if(text.value < 10 || text.value > 100) {
				alert("只能输入10-100的数字");
				return;
			}
		}
		if(arr.length >= 60) {
			alert("数量超过60,不能添加");
			return;
		}
		arr.unshift(text.value);
		render();
	},false);
	rightIn.addEventListener("click",function(){
		if(isNaN(text.value)) {
			alert("只能输入一个数字");
			return;
		} else {
			if(text.value < 10 || text.value > 100) {
				alert("只能输入10-100的数字");
				return;
			}
		}
		if(arr.length >= 60) {
			alert("数量超过60,不能添加");
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
		if(e.target.nodeName == "DIV") {
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
			inner += '<div data-index='+ i +' style="height: '+ arr[i] +'px"></div>';
		}
		wrap.innerHTML = inner;
	};
})(document);