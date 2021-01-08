$(function () {
    var form = layui.form;
    var layer = layui.layer;
    getclass();
    function getclass() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('获取列表失败')
                } else {
                    // layer.msg('获取陈宫')
                    $('[name=cate_id]').html(template('tpl-class', res))
                    form.render();
                }
            }
        })
    }
    initEditor();
    var iimage = $('#image');
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    iimage.cropper(options)
    $('#btnchoose').on('click', function () {
        $('#coverfile').trigger('click');
    })
    $('#coverfile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        iimage
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
    })
    $('.layui-btn-wuhu').on('click', function (e) {
        // console.log($(e.target).attr('data-state'));
        var fd = new FormData($('#form-pub')[0]);
        fd.append('state', $(e.target).attr('data-state'));
        iimage
            .cropper('getCroppedCanvas', {
                width: 400,
                height: 200
            }).toBlob(function (blob) {
                fd.append('cover_img', blob)
                $.ajax({
                    method: 'post',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status != 0) {
                            layer.msg('发布文章失败')
                        } else {
                            layer.msg('发布文章成功');
                            location.href = '/art/art-pub.html'
                        }
                    }
                })
            })

    })
})
