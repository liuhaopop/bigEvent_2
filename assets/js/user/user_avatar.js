$(function () {
    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素===============
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    //==================================================

    // 1.点击上传触发input:file
    $('#upPic').on('click', function () {
        $('#file').click();
        // 为input:file绑定change事件
        $('#file').on('change', function (e) {
            console.log(e.target.files);
            var file = e.target.files
            // 判断input内是否有文件
            if (file.length === 0) {
                // 无 提示选择文件
                layer.msg('请选择文件')
            } else {
                // 有 获取内部文件=>调用cropper渲染页面
                layer.msg('文件选择成功')
                var newImgURL = URL.createObjectURL(file[0])
                $image
                    .cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', newImgURL)  // 重新设置图片路径
                    .cropper(options)        // 重新初始化裁剪区域
            }
        })
    })

    // 2.点击确定,发起更换头像请求
    $('#right').on('click', function () {
        // 获取64图片(上来就获取cropper的图片转换为64格式,所以需要cropper里面有了图片再执行)
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发起更换头像ajax
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('更新头像失败')
                layer.msg('更新头像成功')
                // 更新头像区域
                window.parent.initUserData();
            }
        })
    })
})