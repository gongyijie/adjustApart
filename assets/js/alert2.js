var majorName;

(function($) {
    var re = /([^&=]+)=?([^&]*)/g,
        decodeRE = /\+/g,
        decode = function (str) { return decodeURIComponent( str.replace(decodeRE, " ") ); };
    $.parseParams = function(query) {
        let params = {}, e;

        while ( e = re.exec(query) ) params[ decode(e[1]) ] = decode( e[2] );
        return params;
    };
})(jQuery);


$(function(){
    // request('get', 'www.lishanlei.cn/admin/dispen/getCurrentMajorMsg', function(data){
		// getCurrentMajorMsg(data.majorId);
    // });
    var url =  window.location.href;
    var  param = $.parseParams(url.split('?')[1] || ''); // 解析问号后的 url 参数
    
	getCurrentMajorMsg(param.majorId);
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
        layer.alert("订阅成功！<br/> MBA Helper将以短信形式推送您订阅范围内的调剂动态，请留意查收。祝您金榜题名！");
        $('#tel-modal').css("display","none");
        $('.modal').css("display","none");
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
    $('#imgClosess').click(function () {
         $('#tel-modal').css("display","none");
    });
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
	$('#title').html('2019'+data.major_name+'调剂招生');
	$('#telephone').text(data.telephone);
	$('#major_logo').attr("src",data.major_logo);
	$('#major_icon_logo').attr("href",data.major_logo);
	$('#wc_image').attr("src",data.wc_image);
	$('#address').text(data.address);
	$('#index_web').attr("href",data.index_web);
	$('#pg_index_web').attr("href",data.pg_index_web);
	addProjectTag(data.project);
	addImg(data.major_confirm_id, data.major_follow_id);
	if (data.mode == 0) {
		$('#download').attr("href",data.online_application);
		$('#download').text('去申请');
		$('#download').attr("style","background-image:url(../assets/img/bottom_a.png)");
		$('#informations').html(data.mode_intro);
	}else if (data.mode == 1) {
		$('#download').attr("href",data.file_download);
		$('#informations').html(data.mode_intro);
	};

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
	    if (value.other_explain == null || value.other_explain == undefined){
	        value.other_explain = "";
        }
        // value.graduation_certificate = htmlDecode(value.graduation_certificate);

        var arr = value.graduation_certificate.split("\n");

	    //表格的形式 生成每一行
	    let strP = "";
	    for (var i = 0;i < arr.length; i++ ){
	        strP += "<tr><td><b>" + arr[i] + "</b></td></tr>";
        }
        //拼凑table
        strP = "<table class='bold' style='text-align: left;color: #121737'>" + strP + "</table>";

	    //将生成的table
	    value.graduation_certificate = strP;

        var content =  "<div class='c-div div_I6ztIv'><div class='c-div div_9BBDvp' onclick='change("+index+")' id='c"+(index+1)+"'><a class='c-linkblock linkblock_NYYJrX c-action-click' href='javascript:void(0);'></a><a class='c-linkblock c-initHide linkblock_P7Ic5f c-action-click' href='javascript:void(0);'></a><div class='c-div div_FWJAe9'><h1 class='c-heading heading_7ouMSJ'>"+value.project_name+"</h1><h1 class='c-heading heading_7ouMSJ fubiaoti'></h1></div></div><div class='c-div div_I85Us5'><div class='row c-row row_wX75UL'><div class='col-lg-6 col-md-6 col-sm-6 col-xs-12 c-column cs-repeatable column_sjvm7k'><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_one.png'><h1 class='c-heading heading_58QPWV'>项目费用</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.cost+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_two.png'><h1 class='c-heading heading_58QPWV'>招生名额</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.student_count+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_three.png'><h1 class='c-heading heading_58QPWV'>授课语言</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.language+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_four.png'><h1 class='c-heading heading_58QPWV'>班级情况</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.class_situation+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_five.png'><h1 class='c-heading heading_58QPWV'>学制</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.eductional_systme+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_six.png'><h1 class='c-heading heading_58QPWV'>报考条件</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.can_conditions+"</p></div></div><div class='col-lg-6 col-md-6 col-sm-6 col-xs-12 c-column cs-repeatable column_sjvm7k'><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_seven.png'><h1 class='c-heading heading_58QPWV'>分数线描述</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.score_describe+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_eight.png'><h1 class='c-heading heading_58QPWV'>分数线类型</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.score_type+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_nine.png'><h1 class='c-heading heading_58QPWV'>统招模式</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.recruitment_pattern+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_ten.png'><h1 class='c-heading heading_58QPWV'>招生模式</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.enrollment_mode+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_ele.png'><h1 class='c-heading heading_58QPWV'>毕业证书</h1></div><p class=''style='display: none' >"+value.graduation_certificate+"</p></div><div class='c-div div_0oZzVH xiangqingye'><div class='c-div div_eQPG16'><img class='c-image image_3wYLxF' src='../assets/img/lo_tw.png'><h1 class='c-heading heading_58QPWV'>其他说明</h1></div><p class='c-paragraph heading_58QPWV bold'>"+value.other_explain+"</p></div></div></div></div></div>";
	    $('#project_item').append(content);
    });
}

function addImg(major_confirm, major_follow){
	$.each(major_confirm, function (index, value) {
        $('#major_confirm').append("<img src='../assets/img/"+value+".png' alt=''>");
    });
    $.each(major_follow, function (index, value) {
        $('#major_follow').append("<img src='../assets/img/"+value+".png' alt=''>");
    });
}