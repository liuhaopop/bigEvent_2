$(function () {
    // 整体思路: 新用户:1.获取信息 渲染头像 2.进入user_info 获取信息 init表单 => 点击重置获取信息 init表单 => 提交更新 => 获取信息,渲染头像;
    // 老用户:1.获取信息 渲染头像 2.进入user_info 获取信息 init表单 =>点击重置获取信息 init表单 => 提交更新 => 获取信息,渲染头像

    var layer = layui.layer
    var form = layui.form
    // 定义表单验证规则
    form.verify({
        nickname: function (value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
        }
    })
    // 1.进入user_info页面立即获取用户信息 => init表单
    initUserForm();
    function initUserForm() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg('用户信息初始化失败')
                // init表单
                form.val('initUser', res.data)
                layer.msg('用户信息初始化完成')
            }
        })
    }
    // 2.点击重置按钮 => 执行1
    $('#resetBtn').on('click', function () {
        initUserForm();
    })
    // 3.发起更新信息的ajax
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg('更新信息成功')
                // init表单
                initUserForm()
                // 渲染头像
                window.parent.initUserData()
            }
        })
    })

})