/**
 * 请求
 * type 请求类型
 * url 请求路径
 * data 请求参数
 * callback 回调函数
 */
function request(type, url, data, callback){
	let root = "http://www.lishanlei.cn"
    $.ajax({
        type : type,
        url  : root+url,
        dataType : 'json',
        data : data,
        success  : function(data) {
        	if(data.code == 0){
        		callback(data.result);
        	} else {
        		layer.alert(data.msg);
        	}
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        	console.log(textStatus);
        }
    });
}

//验证手机号是否合法
function validatetelephone(telephone) {
        re = /^1\d{10}$/;
    if (re.test(telephone)) {
        return telephone;
    } else {
        layer.alert("尊敬的用户：你输入的手机号有误！");
        return false;
    }
}

/**
 * 倒计时
 * id 标签id
 * time 时间
 */
function countDown(id, time){
    let tempTag = $(id);
    tempTag.addClass('disable');
    tempTag.text('60');
    tempTag.css('opacity','0.6');
    tempTag.css('paddingLeft','42%');
    tempTag.css('paddingRight','42%');
    var flag = true;
    if (flag) {
        flag = false;
        var timer = setInterval(() => {
            time--;
            tempTag.text(time);
            if (time === 0) {
                clearInterval(timer);
                tempTag.text('重新获取');
                tempTag.removeClass('disable');
                tempTag.css('opacity','1');
                tempTag.css('paddingLeft','22%');
                tempTag.css('paddingRight','22%');
                flag = true;
            }
        }, 1000)
    }
}

/**
 * 发送验证码
 * phone 电话号码
 */
function sendSmsCode(phone){
    request('post', '/admin/dispen/sendSmsCode', { 'phone' : phone }, function(data){
        countDown('#telCode', 60);
    });
}

/**
 * 校验验证码
 * phone 电话号码
 * code 验证码
 */
function judgeSms(phone, code, callback){
    request('post', '/admin/dispen/judgeSms', {
        "phone" : phone,
        "smCode": code
    }, function(data){
        callback(phone);
    });
}

// Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
function OnInput (event) {
    if(event.target.value != '') {
        $('#close-tel').css("opacity","1"); ;
    }
}
// Internet Explorer
function OnPropChanged (event) {
    if (event.propertyName.toLowerCase () == "value") {
        if(event.target.value != '') {
            $('#close-tel').css("filter","1");
        }
    }
}