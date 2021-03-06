$(function () {
    var form = layui.form
    var layer = layui.layer
    // 1.定义表单规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        pwds: function (value) {
            if ($('[name="oldPwd"]').val() === value) {
                return '新密码与原密码不能一样'
            }
        },
        repwd: function (value) {
            if ($('[name="newPwd"]').val() !== value) {
                return '新密码两次不一致'
            }
        }
    })
    // 2.更新密码发起ajax请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新密码失败')
                layer.msg('更新密码成功')
                $('#pwdForm')[0].reset();
            }
        })
    })

})