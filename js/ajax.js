/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(options) {
    options = options || {};
    options.method = options.method.toUpperCase() || 'POST';
    options.url = options.url || '';
    options.async = options.async || true;
    options.data = options.data || null;
    options.success = options.success || function () {};
    options.error = options.error || function () {};

    var xmlhttp = null;
    if(XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for(key in params) {
        params.push(key + '=' + params[key]);
    }
    var postData = params.join('&');

    if(options.method == 'GET') {
        xmlhttp.open(options.method, options.url, options.async);
        xmlhttp.send();
    } else if (options.method == 'POST') {
        xmlhttp.open(options.method, options.url, options.async);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(postData);
    }

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4) {
            switch (xmlhttp.status) {
                case 200:
                    options.success(xmlhttp.responseText);
                    break;
                case 404:
                    options.error('Not Found');
                    break;
                default:
                    options.error('未知错误');
            }
        }
    };
}

// 使用
/*ajax({
    method: 'POST',
    url: './server/demo_get.json',
    data: {
        data1: 'aaa',
        data2: 'bbb'
    },
    success: function (response) {
       console.log(response);
    },
    error: function (err) {
        console.log(err);
    }
});*/