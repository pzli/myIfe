(function(){
	function $(id) {
		return document.querySelector(id);
	}

	/*将各个div按不同的需要渲染的顺序添加到数组中*/
	var arr = [];
	var timer = null;
	var root = $(".one");
	/*前序遍历*/
	$("#preorder").addEventListener("click",function(){
		reset();
		preOrder(root);
		console.log(arr);
		render();
	},false);
	/*中序遍历*/
	$("#inorder").addEventListener("click",function(){
		reset();
		inOrder(root);
		render();
	},false);
	/*后序遍历*/
	$("#postorder").addEventListener("click",function(){
		reset();
		postOrder(root);
		render();
	},false);


	function reset(){
		arr = [];
		// 全部的div,如果上次动画还没完就再点击按钮,先将所有的背景变为白色
		var divs = document.querySelectorAll("div");
		for(var i = 1; i < divs.length; i++) {
			divs[i].style.backgroundColor = "white";
		}
		// 再去掉计时器,防止越点越快
		clearInterval(timer);

	}

	function preOrder(node){
		if(node != null) {
			arr.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
	}
	function inOrder(node){
		if(node != null) {
			inOrder(node.firstElementChild);
			arr.push(node);
			inOrder(node.lastElementChild);
		}
	}
	function postOrder(node){
		if(node != null) {
			postOrder(node.firstElementChild);
			postOrder(node.lastElementChild);
			arr.push(node);
		}
	}
	
	/*渲染函数*/
	function render(){
		var i = 0;
		arr[i].style.backgroundColor = "black";
		timer = setInterval(function(){
			i++;
			if(i >= arr.length) { // 已经渲染完毕	
				clearInterval(timer);
				arr[i-1].style.backgroundColor = "white";
			} else {
				arr[i].style.backgroundColor = "black";
				arr[i-1].style.backgroundColor = "white";
			}
		},500);
	}
})();