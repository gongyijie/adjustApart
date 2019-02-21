var saveRegion = [];//地区名数组
var saveProject = [];//项目数组
var lock = true;


$(function(){
    getProvinces();
    getDisPro();
});

/**
 * 添加元素
 * data 添加的值
 * id 加入元素标签的id
 * length 每一行添加元素的数量
 */
function addTag(data, id, length){
    var content = "";
    var count   = data.length;
    $.each(data, function (index, value) {
        content += "<li onclick='selectionLi(this)' tname='"+id+"'>" + value + "</li>";
        if((index+1) % length == 0 || (index+1) == count){
            content = "<ul>" + content + "</ul>"
            $(id).append(content);
            content = "";
        }
    });
}


//获取省份
function getProvinces(){
    request('get', 'http://tiaoji.mbahelper.cn:8889/admin/dispen/getProvinces', {}, function(data){
        addTag(data, "#provinces", 6);
    });
}

//获取项目
function getDisPro(){
    request('get', 'http://tiaoji.mbahelper.cn:8889/admin/dispen/getDisPro', {}, function(data){
        addTag(data, "#dispro", 4);
    });
}

 //显示省份模态框
function showRegion(){
    let region_modal = $('#region-modal');
    region_modal.css("display","block");

    $('#close-region').click(function () {
        region_modal.css("display","none");
    });

    $('#imgClose').click(function () {
        region_modal.css("display","none");
    });
}

 //显示项目模态框
function showProject() {
    let project_modal = $('#project-modal');
    project_modal.css("display","block");

    $('#close-project').click(function () {
        project_modal.css("display","none");
    });
    $('#imgCloses').click(function () {
        project_modal.css("display","none");
    });
}

/**
 * //根据类名，判断用户是否选中。
 * 如果原来是选中，那么用户再点击第二次为取消，移除类名
 * @param object
 */
function selectionLi(object){
    if ($(object).attr("tname") == "#provinces"){
        let region = $("#region-modal li.botton_area");
        if (region.length >= 5 && object.className != "botton_area" ){
            layer.alert("你只能订阅5个地区的调剂消息",function (index) {
                layer.close(index);
                showRegion();
            });
        }else {
            if(object.className == "botton_area"){
                object.classList.remove("botton_area");
            }else{
                object.classList.add("botton_area");
            }
        }
    }else {
        let region = $("#project-modal li.botton_area");
        if (region.length >= 3 && object.className != "botton_area" ){
            layer.alert("你只能订阅3个项目",function (index) {
                layer.close(index);
                showProject();
            });
        }else {
            if(object.className == "botton_area"){
                object.classList.remove("botton_area");
            }else{
                object.classList.add("botton_area");
            }
        }
    }


}

//验证用户选择的地区是否合法
function validateRegion() {
    let compelte_region;
    let region = $("#region-modal li.botton_area");
    let region_length = region.length;

    if(region_length > 5){
        layer.alert("你只能选择5个地区",function (index) {
            layer.close(index);
            showRegion();
        });
        return false;
    }
    saveRegion = [];
    for(var i = 0; i < region_length; i++){     //把地区名字存入数组
        saveRegion[i] = region[i].innerHTML;
    }
    compelte_region = saveRegion.join('、');    //把用户选择的地区拼接成一个字符串显示出来
    $("#region-text").attr("value",compelte_region);
    console.log(saveRegion);
    return true;
}

//验证用户选择的项目是否合法
function validateProject() {
    let complete_project;
    let project = $("#project-modal li.botton_area");
    let project_length = project.length;
    if(project_length > 3){
        layer.alert("你只能选择3个项目",function (index) {
            layer.close(index);
            showProject();
        });
        return false;
    }
    saveProject = [];
    for(let i = 0; i < project_length; i++){      //把项目名字存入数组
        saveProject[i] = project[i].innerHTML;
    }
    complete_project = saveProject.join('、');    //把用户选择的项目拼接成一个字符串显示出来
    $("#project-text").attr("value",complete_project);
    console.log(saveProject);
    return true;
}

/**
 * 订阅
 * phone 电话号码
 */
function subscribe(phone) {
    request('post', 'http://tiaoji.mbahelper.cn:8889/admin/dispen/subscribe', {
        "proArr" : saveRegion,
        "jectArr": saveProject,
        "phone"  : phone,
        "grade"  : 0
    }, function(data){
        layer.alert("订阅成功！MBA Helper将以短信形式及时推送您订阅范围内的调剂专题，请注意查收。祝您金榜题名！" , function (index) {
            layer.close(index);
            initRegionAndProject();
        });

        $('#tel-modal').css("display","none");
    });
}

//发送后台
function sendInformation() {
    let phone = $.trim($("#telephone").val());
    var region    = validateRegion();   //提交前验证地区选择是否合法
    var project   = validateProject();  //提交前验证项目选择是否合法
    if (this.saveRegion.length==0 || this.saveProject.length == 0) {
        layer.alert("请选择至少一个地区和项目！");
        return false;
    };
    var telephone = validatetelephone(phone);//提交前验证手机号
    
    if(!telephone || !region || !project){
        return false;
    }

    $('#tel-modal').css("display","block");

    $('#imgClosess').click(function () {
         $('#tel-modal').css("display","none");
    });
    //手机验证码
    $('#telCode').click(function () {
        if (($('#telCode').text() == "获取验证码" || $('#telCode').text() == "重新获取") && lock ){
            countDown('#telCode', 60);
            lock = false;
            sendSmsCode(phone);
        }
    });

    $('#close-tel').click(function () {
        var code = $.trim($("#code").val());
        judgeSms(phone, code, subscribe);
    });
}
function initRegionAndProject() {

    //清空选项
    let regions = $("#region-modal li.botton_area");
    let projects = $("#project-modal li.botton_area");

    var i = 0;
    for (i = 0 ; i < regions.length ; i ++ ){
        regions[i].classList.remove("botton_area");
    }
    i = 0;
    for (i = 0 ; i < projects.length ; i ++ ){
        projects[i] . classList.remove("botton_area");
    }

    // 清空input
    $("#project-text").attr("value","");
    $("#region-text").attr("value","");
    $("#telephone").val("");

}