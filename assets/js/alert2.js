var majorName;
$(function(){
	getCurrentMajorMsg(1);
});

/**
 * 获取当前院校专业的信息
 * id 院校专业id
 */
function getCurrentMajorMsg(id) {
	request('get', '/admin/dispen/getCurrentMajorMsg', { "majorId": id }, function(data){
		console.log(data);
		majorName = $.isArray(data) ? data[0].major_name : data.major_name;
    });
}

/**
 * 订阅
 * phone 电话号码
 */
function subscribe(phone) {
    request('post', '/admin/dispen/setMajorSubscribe', {
        "majorName": majorName,
        "phone"    : phone,
        "grade"    : 1
    }, function(data){
        layer.alert("订阅成功");
        $('#tel-modal').css("display","none");
    });
}

//发送后台
function sendInformation() {

    let phone = $.trim($("#inputTel").val());
    var telephone = validatetelephone(phone);//提交前验证手机号

    if(!telephone){
        return false;
    }

    $('#tel-modal').css("display","block");

    //手机验证码
    $('#telCode').click(function () {
        sendSmsCode(phone);
    });

    $('#close-tel').click(function () {
        var code = $.trim($("#code").val());
        judgeSms(phone, code, subscribe);
    });
}