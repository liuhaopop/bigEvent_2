$(function () {
    // 使用一个过滤器,对所有的ajax请求进行options的过滤
    $.ajaxPrefilter(function (options) {
        options.url = 'http://www.liulongbin.top:3007' + options.url;
    })
})