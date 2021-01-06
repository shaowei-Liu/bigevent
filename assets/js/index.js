$(function () {
    getinfo();
    var layer = layui.layer;
    $('.btnlogout').on('click', function () {
        layer.confirm(
            '确认退出吗', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // alert(1)
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index)
        })
    })

})
function getinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取信息失败')
            }
            avatar(res.data)
        }
    })
}
function avatar(data) {
    // console.log(data);
    let name = data.nickname || data.username;
    // console.log(name);
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    }
    else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}