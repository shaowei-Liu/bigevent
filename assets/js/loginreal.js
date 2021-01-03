$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    // console.log(form);
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，并且不能有空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    $('.form_reg').on('submit', function (e) {
        alert(2)
        e.preventDefault();
        var data = {
            username: $('.form_reg [name=username]').val(),
            password: $('.form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            layer.msg('注册成功')
            $('#link_login').click();
        })
    })
    $('.form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功');
                // console.log(res);
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})