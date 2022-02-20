$(function () {
    // 初始化富文本编辑器========
    initEditor();
    // 1. 初始化图片裁剪器=======
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    var layer = layui.layer
    var form = layui.form

    //功能1. 进入页面获取类别信息 => 动态渲染下拉选择框
    initSelect()
    function initSelect() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取类别失败');
                layer.msg('获取类别成功');
                console.log(res);
                // 渲染下拉选择框
                var htmlStr = template('tpl-select', res)
                $('[name="cate_id"]').html(htmlStr);
                form.render();
            }
        })
    }

    //功能2. 点击更换封面图片
    // 2.1点击更换封面 => 触发 input:file
    $('#coverBtn').on('click', function () {
        $('#file').click();
    })
    // 2.2为input:file绑定change事件
    $('#file').on('change', function (e) {
        var file = e.target.files
        // console.log(file);
        if (file.length === 0) return layer.msg('请选择文件')
        layer.msg('文件选择成功')
        // input里的文件更换到封面
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var state1 = '已发布';
    $('#draft').on('click', function () {
        state1 = '草稿'
    })
    //功能3. 发布文章
    // 点击按钮=>发起发布文章ajax请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append('state', state1)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // 发起ajax请求
                $.ajax({
                    method: 'post',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) return layer.msg('发布失败')
                        layer.msg('发布成功')
                    }
                })
            })
    })
})