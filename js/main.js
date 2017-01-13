var loginBtn = getId('loginBtn');
var registerBtn = getId('registerBtn');
var stateManager = [];

// 定义缺省页面和出错页面
var home = {};
home.partial = '../lib/home.html';
home.init = function () {};

var notFound = {}
notFound.partial = '../lib/404.html';
notFound.init = function () {
	alert('Url does not exist. please check your code.');
};

// 定义主程序
var miniSPA = {};
miniSPA.changeUrl = function () {
	var url = location.hash.replace('#', '');
	var status = 0;

	if(url === '') {
		url = 'home';
	}
	if (!url) {
		url = 'notfound';
	}
    status = myAjax({
    	url: url,
    	method: 'POST',
    	ele: 'demo'
    });
    console.log(status);
    if(status == 404) {
    	url = 'notfound';
    	myAjax({
    		url: url,
    		method: 'POST',
			ele: 'demo'
    	});
    }
};

function getId(idVal) {
	return document.getElementById(idVal);
}

function getUrlInfo () {
	var currentLink = location.pathname;
	var replaceIndex = currentLink.lastIndexOf('/');
	var thisPage = currentLink.substring(replaceIndex, currentLink.length);
	var frontUrl = currentLink.substring(0, replaceIndex);
	return {
		'thisPage': thisPage,
		'frontUrl': frontUrl
	}
}

function EveryState(stateName, stateObj) {
	this.stateName = stateName;
	this.stateObj = stateObj;
}

/**
 * [wipeRepeat 状态去重]
 * @param  {[type]} stateManager [管理状态的数组]
 * @param  {[type]} stateName    [当前页面状态的名称]
 * @return {[type]}              [返回去重后的状态数组]
 */
function wipeRepeat(stateManager, stateName) {
	if(JSON.stringify(stateManager).indexOf(stateName) > -1 ) {
		//存在
		stateManager.arrMap(function (val, index, arr) {
			if(stateManager[index].stateName == stateName) {
				stateManager.remove(val);
			}
		});
		return stateManager;
	}
}
	
loginBtn.addEventListener('click', function () {
	var stateName = 'loginState';

	// 更新状态，如果之前有删除重加
	wipeRepeat(stateManager, stateName); 
	
	var frontUrl = getUrlInfo().frontUrl;

	var stateObj = { loginInfo: "登录信息" };

	// history.pushState(state obj, document title, new url);
	history.pushState(stateObj, '登录页', frontUrl + '/login');
	document.title = '登录页';

	var loginState = new EveryState(stateName, stateObj);

	stateManager.push(loginState);
	console.log(stateManager); 
	
}, false);

registerBtn.addEventListener('click', function () {
	alert('去注册');
	var stateName = 'registerState';
	wipeRepeat(stateManager, stateName); 
	
	var frontUrl = getUrlInfo().frontUrl;
	var stateObj = { registerInfo: "注册信息" };

	history.pushState(stateObj, '注册页', frontUrl + '/register');
	document.title = '注册页';

	var registerState = new EveryState(stateName, stateObj);
	stateManager.push(registerState);
	console.log(stateManager); 
	
}, false);