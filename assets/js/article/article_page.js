$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 定义参数
    var q = {
        pagenum: 1,
        pagesize: 10,
        cate_id: '',
        state: ''
    }
    initTable();
    // 功能1. 进入页面获取文章ajax => 渲染表格
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章失败')
                // layer.msg('获取文章成功')
                // 渲染表格
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 功能2. 进入页面获取文章类别ajax,渲染下拉选择框
    initSelect()
    function initSelect() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) layer.msg('获取文章类别失败')
                layer.msg('获取文章类别成功')
                // 渲染类别下拉选择框
                var htmlStr = template('tpl-select', res)
                $('[name="cate_id"]').html(htmlStr)
                form.render();
            }
        })
    }

    // 功能3. 点击筛选=> 获取文章ajax => 渲染表格
    $('#filterForm').on('submit', function (e) {
        e.preventDefault();
        // 获取到下拉选择框的值
        var data = {
            cate_id: $('[name="cate_id"]').val(),
            state: $('[name="state"]').val()
        }
        console.log(data);
        // 重新定义参数
        q.cate_id = data.cate_id
        q.state = data.state
        // 发起获取文章ajax=> 渲染表格
        initTable();
    })

    // 功能4. 点击删除=> 根据id删除ajax => 获取文章ajax => 渲染表格
    $('tbody').on('click', '#delete', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/delete/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg('删除失败')
                layer.msg('删除成功')
                initTable();
            }
        })
    })
})