$(function () {
    var layer = layui.layer;
    getart();
    function getart() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                $('tbody').html(template('tpl-table', res))
            }
        })
    }
    $('#btnaddclass').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('新增分类失败')
                }
                getart();
                layer.msg('新增分类成功');
                $('.layui-layer-close')[0].click();
            }
        })
    })
    $('tbody').on('click', '#btndelart', function () {
        layer.confirm('确认删除吗？', {
            icon: 3,
            title: '提示',
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + $(this).attr('data-id'),
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败')
                    }
                    else {
                        layer.msg('删除成功')
                        $('.layui-layer-close')[0].click();
                        getart();
                    }
                }
            })
        })
    })
})