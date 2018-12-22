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
		$.isArray(data) ? setInfo(data[0]) : setInfo(data);
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

/**
 * 设置院校信息
 * data 信息
 */
function setInfo(data){
	majorName = data.major_name;
	$('#major_name').html(majorName+'<br>调剂招生');
	$('#major_logo').attr("src",data.major_logo);
	$('#address').text(data.address);
	addProjectTag(data.project);
}

/*
"<div class='c-div div_I6ztIv'>
    <div class='c-div div_9BBDvp' onclick='change("+index+")' id='c"+(index+1)+"'>
	    <a class='c-linkblock linkblock_NYYJrX c-action-click' href='javascript:void(0);'></a>
	    <a class='c-linkblock c-initHide linkblock_P7Ic5f c-action-click' href='javascript:void(0);'></a>
	    <div class='c-div div_FWJAe9'>
	        <h1 class='c-heading heading_7ouMSJ'>"+value.project_name+"</h1>
	        <h1 class='c-heading heading_7ouMSJ fubiaoti'>非全日制</h1>
	    </div>
	</div>
	<div class='c-div div_I85Us5'>
	    <div class='row c-row row_wX75UL'>
	        <div class='col-lg-6 col-md-6 col-sm-6 col-xs-12 c-column cs-repeatable column_sjvm7k'>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_one.png'>
	                    <h1 class='c-heading heading_58QPWV'>项目费用</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.cost+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_two.png'>
	                    <h1 class='c-heading heading_58QPWV'>招生名额</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.student_count+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_three.png'>
	                    <h1 class='c-heading heading_58QPWV'>授课语言</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.language+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_four.png'>
	                    <h1 class='c-heading heading_58QPWV'>班级情况</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.class_situation+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_five.png'>
	                    <h1 class='c-heading heading_58QPWV'>学制</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.eductional_systme+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_six.png'>
	                    <h1 class='c-heading heading_58QPWV'>报考条件</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.can_conditions+"</p>
	            </div>
	        </div>
	        <div class='col-lg-6 col-md-6 col-sm-6 col-xs-12 c-column cs-repeatable column_sjvm7k'>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_seven.png'>
	                    <h1 class='c-heading heading_58QPWV'>分数线描述</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.score_describe+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_eight.png'>
	                    <h1 class='c-heading heading_58QPWV'>分数线类型</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.score_type+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_nine.png'>
	                    <h1 class='c-heading heading_58QPWV'>统招模式</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.recruitment_pattern+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_ten.png'>
	                    <h1 class='c-heading heading_58QPWV'>招生模式</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.enrollment_mode+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_ele.png'>
	                    <h1 class='c-heading heading_58QPWV'>毕业证书</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.graduation_certificate+"</p>
	            </div>
	            <div class='c-div div_0oZzVH xiangqingye'>
	                <div class='c-div div_eQPG16'>
	                    <img class='c-image image_3wYLxF' src='../assets/img/lo_tw.png'>
	                    <h1 class='c-heading heading_58QPWV'>其他说明</h1>
	                </div>
	                <p class='c-paragraph heading_58QPWV bold'>"+value.other_explain+"</p>
	            </div>
	        </div>
	    </div>
	</div>
</div>";
*/
function addProjectTag(data){
	if(null == data || 0 == data.length){
		$('#project').css("display","none");
		return;
	}
	$.each(data, function (index, value) {
        var content =  "<div class='c-div div_I6ztIv'><div class='c-div div_9BBDvp' onclick='change("+index+")' id='c"+(index+1)+"'><a class='c-linkblock linkblock_NYYJrX c-action-click' href='javascript:void(0);'></a><a class='c-linkblock c-initHide linkblock_P7Ic5f c-action-click' href='javascript:void(0);'></a><div class='c-div div_FWJAe9'><h1 class='c-heading heading_7ouMSJ'>"+value.project_name+"</h1><h1 class='c-heading heading_7ouMSJ fubiaoti'>非全日制</h1></div></div><div class='c-div div_I85Us5'><div class='row c-row row_wX75UL'><div class='col-lg-6 col-md-6 col-sm-6 col-xs-12 c-column cs-repeatable column_sjvm7k'><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_one.png'><h1 class='c-heading heading_58QPWV'>项目费用</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.cost+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_two.png'><h1 class='c-heading heading_58QPWV'>招生名额</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.student_count+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_three.png'><h1 class='c-heading heading_58QPWV'>授课语言</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.language+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_four.png'><h1 class='c-heading heading_58QPWV'>班级情况</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.class_situation+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_five.png'><h1 class='c-heading heading_58QPWV'>学制</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.eductional_systme+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_six.png'><h1 class='c-heading heading_58QPWV'>报考条件</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.can_conditions+"</p></div></div><div class='col-lg-6 col-md-6 col-sm-6 col-xs-12 c-column cs-repeatable column_sjvm7k'><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_seven.png'><h1 class='c-heading heading_58QPWV'>分数线描述</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.score_describe+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_eight.png'><h1 class='c-heading heading_58QPWV'>分数线类型</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.score_type+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_nine.png'><h1 class='c-heading heading_58QPWV'>统招模式</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.recruitment_pattern+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_ten.png'><h1 class='c-heading heading_58QPWV'>招生模式</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.enrollment_mode+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_ele.png'><h1 class='c-heading heading_58QPWV'>毕业证书</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.graduation_certificate+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_tw.png'><h1 class='c-heading heading_58QPWV'>其他说明</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.other_explain+"</p></div></div></div></div></div>";
	    $('#project_item').append(content);
    });
}