$(function () {
    var layer = layui.layer
    var form = layui.form
    // 1. 进入页面 ajax获取数据 => 渲染表格
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取类别失败')
                layer.msg('获取类别成功')
                console.log(res);
                // 渲染表格
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 2.添加文章分类 
    // 2.1点击按钮=>弹出层
    var index = null
    $('#addCate').on('click', function () {
        // 弹出层
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#tpl-layer').html()
        });
    })
    // 2.2发起新增分类请求
    $('body').on('submit', '#layerForm', function (e) {
        e.preventDefault();
        // 发起请求
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('添加失败')
                layer.msg('添加成功')
                initTable()
            }
        })
        layer.close(index)
    })

    // 3.编辑文章分类
    // 3.1点击编辑btn => 弹出层
    var index1 = null
    $('body').on('click', '#editBtn', function () {
        index1 = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#tpl-layerEdit').html()
        });
        // 3.2 根据id获取文章分类=>填充表单
        var id = $(this).attr('data-edit')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取当前id分类失败')
                layer.msg('获取当前id分类成功')
                // console.log(res.data);
                // 填充表单
                form.val('edit', res.data)
            }
        })
    })
    // 3.3 确认编辑
    // 点击确认编辑发起请求 => 重新渲染表格
    $('body').on('submit', '#layerFormEdit', function (e) {
        e.preventDefault();
        // 发起请求
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('编辑失败')
                layer.msg('编辑成功')
                layer.close(index1)
                initTable()
            }
        })
    })

    // 4.删除文章分类
    // 点击删除发起ajax请求
    $('tbody').on('click', '#deleteBtn', function () {
        var id = $(this).attr('data-delete');
        console.log(id);
        // 发起根据id删除对应数据
        $.ajax({
            method: 'get',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg('删除失败')
                layer.msg('删除成功')
                // 重新渲染表格
                initTable();
            }
        })
    })


})