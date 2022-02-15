$(function () {
    // 引入 layui的form/layer
    var form = layui.form;
    var layer = layui.layer;
    // 1.点击登录/注册跳转到对应的页面
    $('#loginAndReg #regLink').on('click', function () {
        $('#reg').show()
        $('#login').hide()
    })
    $('#loginAndReg #loginLink').on('click', function () {
        $('#reg').hide()
        $('#login').show()
    })

    // 2.注册页面功能
    // 2.1表单的正则匹配
    form.verify({
        // 用户名规则
        username: function (value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
        },
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            if ($('#regForm #pwd').val() !== value) {
                return '两次密码输入不一致';
            }
        }
    })
    // 2.2发起起注册ajax请求
    // 监听到注册form的submit事件
    $('#regForm').on('submit', function (e) {
        e.preventDefault();
        // 获取form下所有表单键值对
        var data = $(this).serialize();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) return layer.msg('注册失败');
                layer.msg('注册成功,请登录');
                // 注册成功后自动跳转登录界面
                $('#loginAndReg #loginLink').click();
            }
        })
    })

    // 3.登录页面功能
    // 监听到登录form的submit事件
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        // 获取到form下所有表单的键值对
        var data = $(this).serialize();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功');
                // 将token存于本地
                localStorage.setItem('token', res.token);
                // 跳转到index页面
                location.href = '/index.html';
            }
        })
    })
})