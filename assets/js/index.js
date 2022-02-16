$(function () {
    // 引入layui的layer
    var layer = layui.layer
    // 1.进入index页面立即,发起请求获取用户信息 ==> 可用此次的请求来进行权限的设定(无token时无法进入index页面,并跳转login页面)
    initUserData();

    // 3.退出功能
    $('#back').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

// 在外部定义 获取用户信息ajax请求 函数 ==> 后面开发 更新用户信息功能 时需要调用此函数 ==>所以写在外部
function initUserData() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户信息成功')
            console.log(res);
            // 2.将用户信息渲染到页面
            // 2.1 有user_pic,图片显示,textavatar隐藏   无user_pic,图片隐藏,textavatar显示并将username第一个大写字母显示;
            // 2.2 有nickname显示, 无nickname显示username,
            if (res.data.user_pic == null) {
                $('.layui-nav-img').hide()
                $('.textavatar').html(res.data.username[0].toUpperCase()).show();
            } else {
                $('.layui-nav-img').attr('src', res.data.user_pic).show()
                $('.textavatar').hide();
            }
            if (res.data.nickname == '') {
                $('.welcome').html('欢迎&nbsp&nbsp' + res.data.username)
            } else {
                $('.welcome').html('欢迎&nbsp&nbsp' + res.data.nickname)
            }
        }
        // 利用这个回调函数进行权限验证
        // complete: function (res) {
        //     console.log(res);
        // }
    })
}