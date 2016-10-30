/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

//全局变量
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

 // 获取数据,存在aqiData中
function addAqiData() {
	// 获取城市输入
	var cityInput = document.querySelector("#aqi-city-input");
	var city = cityInput.value;
	// 城市名字支持中英文,英文中有类似new York的城市,需要在中间加一个空格0个或者1个
	if(!city.match(/^[A-Za-z]+\s?[A-Za-z]+$/) && !city.match(/^[\u4e00-\u9fa5]+$/)) {
		alert("输入的城市名必须为中英文字符");
		return;
	}
	// 获取数据输入
	var valueInput = document.querySelector("#aqi-value-input");
	var value = valueInput.value;
	// 空气质量必须是整数
	if(!value.match(/^\d+$/)) {
		alert("空气质量指数必须为整数");
		return;
	} else {
		if(value <= 0 || value >= 100) {
			alert("空气质量指数必须在0-100范围内");
			return;
		}
		else {
			aqiData[city] = value;
		}
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.querySelector("#aqi-table");
	// 表头
    var str = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

    // 表单数据
    for (city in aqiData) {
    	str += "<tr><td>"+ city +"</td><td>"+ aqiData[city] +"</td><td><button>删除</button></td></tr>";
    }

    table.innerHTML = city ? str : "";

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(btn) {
  // do sth.
  // 找到被电击的tr的城市名称,在aqiData中删除
  var tr = btn.parentNode.parentNode;
  var city = tr.children[0].innerHTML;
  delete aqiData[city];
  // 重新渲染列表
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.querySelector("#add-btn");
  btn.addEventListener("click",function(){
  	addBtnHandle();
  },false);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  // 利用冒泡原理和target来实现代理
  var table = document.querySelector("#aqi-table");
  table.addEventListener("click",function(e){
  	if(e.target.nodeName == "BUTTON") {
  		delBtnHandle(e.target);
  	}
  },false);
}

init();
