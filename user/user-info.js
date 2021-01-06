$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度为1~6个字符'
            }
        }
    })
    initinfo();
    function initinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                else {
                    form.val('formUserInfo', res.data)
                }
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initinfo();
    })
    $('.layui-form').on('submit', function (e) {
        console.log($(this).serialize());
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('修改用户信息失败')
                }
                else {
                    layer.msg('修改用户信息成功');
                    window.parent.getinfo();
                }
            }
        })
    })
})
