$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码为6-12位且不包含空格'],
        samepwd: function (value) {
            if (value == $('[name=oldPwd').val()) {
                return '两次密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd').val()) {
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('更新密码失败')
                }
                else {
                    layui.layer.msg('更新密码成功')
                    $('.layui-form')[0].reset();
                }
            }
        })
    })
})