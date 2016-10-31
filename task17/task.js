/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/*时间粒度容器*/
var formGraTime = document.querySelector("#form-gra-time");
/*城市选择容器*/
var citySelect = document.querySelector("#city-select");
/*柱状图容器*/
var aqiChartWrap = document.querySelector(".aqi-chart-wrap");

/**
 * 渲染图表
 */

function renderChart() {
  var inner = "";
  var color = "";
  for(var key in chartData) {
    color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    inner += '<div style="background-color: '+ color +'; height: '+ chartData[key] +'px;" title="'+ key +': '+ chartData[key] +'"></div>';
  }
  aqiChartWrap.innerHTML = inner;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  // 知道现在选择的是哪个时间粒度
  var inputs = formGraTime.querySelectorAll("label input");
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].checked) {
      var nowSelectTime = inputs[i].value;
    }
  }
  if(nowSelectTime == pageState.nowGraTime) {
    return;
  } else {
    pageState.nowGraTime = nowSelectTime;
  }

  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var index = citySelect.selectedIndex;
  var text = citySelect.options[index].text; // 选中文本
  // 确定是否选项发生了变化 
  if (pageState.nowSelectCity == text) {
    return;
  } else {
    pageState.nowSelectCity = text;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inputs = formGraTime.querySelectorAll("label input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("click",function(){
      graTimeChange();
    },false);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var inner = "";
  for(var city in aqiSourceData) {
    inner += "<option>"+ city +"</option>";
  }
  citySelect.innerHTML = inner;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener("change",function(){
    citySelectChange();
  },false);
}



/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中

  // 当前选中的城市的92天的每天的降水量的一个JSON,key是日期,value是当天的降水量
  var cityData = aqiSourceData[pageState.nowSelectCity];

  // 根据不同的时间粒度返回不同的图表数据格式
  if(pageState.nowGraTime == "day") {
    // 如果时间粒度就是天,那么数据就是92天里每天的降水量,所以直接赋值就可以了
    chartData = cityData;
  } else if(pageState.nowGraTime == "week") {
    // 清空charDate
    chartData = {};
    // 如果是周,那么要算每周7天的平均值,最后一周天数不够单独考虑
    var week = 0, day = 0, countSum = 0;
    for(var key in cityData) {
      // 将key转换成Date对象
      var date = new Date(key);
      // 计算每周的降水量的总和
      countSum += cityData[key];
      day++;
      // 这天是星期天
      if(date.getDay() == 6) {
        week++;
        chartData["第"+ week +"周"] = Math.floor(countSum / day);
        day = 0;
        countSum = 0;
      }

    }
    // 最后一周可能到不了星期天,单独处理
    if(day != 0) {
      week++;
      chartData["第"+ week +"周"] = Math.floor(countSum / day);
    }

  } else if(pageState.nowGraTime == "month") {
    // 清空charDate
    chartData = {};
    var month = 0, day = 0, countSum = 0;
    for(var key in cityData) {
      // 将key转换成Date对象
      var date = new Date(key);
      // 这天不再是这个月
      if(date.getMonth() != month) {
        month++;
        chartData["第"+ month +"月"] = Math.floor(countSum / day);
        day = 0;
        countSum = 0;
      }
      // 计算每月的降水量的总和
      countSum += cityData[key];
      day++;
    }
    // 单独计算最后一个月
    if(day != 0) {
      month++;
      chartData["第"+ month +"月"] = Math.floor(countSum / day);
    }
  }


}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  // 刚加载网页就显示北京的每日数据
  renderChart();
}

init();