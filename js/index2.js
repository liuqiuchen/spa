function getId(idVal) {
	return document.getElementById(idVal);
}

var loginBtn = getId('loginBtn');
var registerBtn = getId('registerBtn');

var settings = {};
settings.rootUrl = '/spa';
settings.partialCache = {};
settings.divDemo = document.getElementById('demo');

// 定义缺省页面和出错页面
var home = {};
home.partial = '/lib/home.html';
home.init = function () {};

var postMD = {};
postMD.partial = '/lib/postMD.html';
postMD.init = function () {};

var notFound = {};
notFound.partial = '/lib/404.html';
notFound.init = function () {
	alert('Url does not exist. please check your code.');
};

// 定义主程序
var miniSPA = {};
miniSPA.initFunc= function (partial) {
	var fn = window[partial].init;
	if(typeof fn === 'function') {
		fn();
	}
};
miniSPA.changeUrl = function () {
	var url = location.hash.replace('#', '');
	var status = 0;

	if(url === '') {
		url = 'home';
	}
	if (!window[url]) {
		url = 'notFound';
	}
	console.log(url);
    ajax({
    	method: 'Get',
    	url: settings.rootUrl + window[url].partial,
    	success: function (page) {
    		settings.divDemo.innerHTML = page;
    		miniSPA.initFunc(url);
    	},
    	error: function (err) {
    		console.log(err);
    	}
    });
};

