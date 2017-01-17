##single-page application (SPA)

将网站打造成单页应用 A single-page application (SPA)  

参考案例：
GitHub、微博、百度

要实现单页面应用，现在已经有很多现成的框架了，
比如AngularJS、Ember.js、Backbone.js等等。
它们都是很全面的开发平台，为单页面应用开发提供了必需的页面模板、路径解析和处理、后台服务api访问、DOM操作等功能。

可以尝试原生写spa，框架臃肿。

优点：
可以在页面切换间平滑过渡，增加Loading动画。  
可以在各个页面间传递数据，不依赖URL。  
可以选择性的保留状态，如音乐网站，切换页面时不会停止播放歌曲。  
所有的标签都可以用来跳转，不仅仅是a标签。  
避免了公共JS的反复执行，如无需在各个页面打开时都判断是否登录过等等。  
减少了请求体积，节省流量，加快页面响应速度。  
平滑降级到低版本浏览器上，对SEO也不会有影响。
 

原理：
1. 拦截a标签的默认跳转动作。
2. 使用Ajax请求新页面。
3. 将返回的Html替换到页面中。
4. 使用HTML5的`History API`或者`Url的Hash修改Url`。

可以将页面所有的跳转替换为AJAX请求，把网站改造成单页面应用。  
note: 由于浏览器限制，history.pushState() + ajax需要在服务器环境下使用，
即不要使用file://xxx.html运行。

 

