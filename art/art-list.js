$(function () {
    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date);
        let yy = dt.getFullYear();
        let mo = zero(dt.getMonth() + 1);
        let da = zero(dt.getDate());
        let ho = zero(dt.getHours());
        let mi = zero(dt.getMinutes());
        let se = zero(dt.getSeconds());
        return yy + '-' + mo + '-' + da + '' + ho + ':' + mi + ':' + se;
        function zero(x) {
            return x > 9 ? x : '0' + x;
        }
    }
    gettaband();
    getclaand();
    function gettaband() {
        $.ajax({
            mthod: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败')
                }
                else {
                    layer.msg('获取文章列表成功');
                    console.log(res);
                    $('tbody').html(template('tpl-table', res))
                    renderpage(res.total)
                }
            }
        })
    }
    function getclaand() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('获取分类数据失败')
                } else {
                    // layer.msg('获取分类成功')
                    $('[name=cate_id]').html(template('tpl-cate', res))
                    form.render();
                }
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // console.log($('[name=cate_id]').val());
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        gettaband();
    })
    function renderpage(data) {
        laypage.render({
            elem: 'pageBox',
            count: data,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    gettaband();
                }
            }
        })
    }
    $('tbody').on('click', '#btndelart', function () {
        let artid = $(this).attr('data-id');
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示',
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete' + artid,
                success: function (res) {
                    if (res.status != 0) {
                        layer.msg('删除失败')
                    } else {
                        layer.msg('删除成功');
                        if ($('#btndelart').length == 1) {
                            q.pagenum == 1 ? q.pagenum = 1 : pagenum - 1;
                        }
                        gettaband();
                    }
                }
            })
            layer.close(index);
        })
    })
})