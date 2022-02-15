$(function () {
    // 使用一个过滤器,对所有的ajax请求进行options的过滤
    $.ajaxPrefilter(function (options) {
        // 为每个ajax的url补全根路径
        options.url = 'http://www.liulongbin.top:3007' + options.url;
        // 为每个请求中的url带有my的添加headers配置项
        if (options.url.indexOf('/my') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 全局的ajax请求都挂上一个complete函数用来判断 是否有权限
        options.complete = function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清除本地存储
                localStorage.removeItem('token');
                // 2.跳转回login页面
                location.href = '/login.html'
            }
        }
    })
})