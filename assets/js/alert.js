var saveRegion = [];//地区名数组
var saveProject = [];//项目数组
function showRegion(){
    // $.ajax(
    //     {
    //         type:'get',
    //         url : '',
    //         dataType : 'jsonp',
    //         jsonp:"jsoncallback",
    //         success  : function(data) {
                // alert("用户名："+ data.user +" 密码："+ data.pass);
                let region_modal = $('#region-modal');
                region_modal.css("display","block");
                // var areadata = data;

                $('#close-region').click(function () {
                    region_modal.css("display","none");
                });
    //         },
    //         error : function() {
    //             alert('fail');
    //         }
    //     }
    // ); //显示地区模态框
}
function showProject() { //显示项目模态框
    // $.ajax(
    //     {
    //         type:'get',
    //         url : '',
    //         dataType : 'jsonp',
    //         jsonp:"jsoncallback",
    //         success  : function(data) {
                // alert("用户名："+ data.user +" 密码："+ data.pass);
                let project_modal = $('#project-modal');
                project_modal.css("display","block");
                // var projectdata = data;
                $('#close-project').click(function () {
                    project_modal.css("display","none");
                });
    //         },
    //         error : function() {
    //             alert('fail');
    //         }
    //     }
    // );
}

/**
 * //根据类名，判断用户是否选中。
 * 如果原来是选中，那么用户再点击第二次为取消，移除类名
 * @param object
 */
function selectionLi(object){
    if(object.className == "botton_area"){
        object.classList.remove("botton_area");
    }else{
        object.classList.add("botton_area");
    }
}

//验证用户选择的地区是否合法
function validateRegion() {
    let compelte_region;
    let region = $("#region-modal li.botton_area");
    let region_length = region.length;
    if(region_length > 3){
        layer.alert("你只能选择3个地区",function (index) {
            layer.close(index);
            showRegion();
        });
        return false;
    }
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
    if(project_length > 2){
        layer.alert("你只能选择2个项目",function (index) {
            layer.close(index);
            showProject();
        });
        return false;
    }
    for(let i = 0; i < project_length; i++){      //把项目名字存入数组
        saveProject[i] = project[i].innerHTML;
    }
    complete_project = saveProject.join('、');    //把用户选择的项目拼接成一个字符串显示出来
    $("#project-text").attr("value",complete_project);
    console.log(saveProject);
    return true;
}

//验证手机号是否合法
function validatetelephone() {
    let telephone = $("#telephone").val();
        re = /^1\d{10}$/;
    if (re.test(telephone)) {
        return telephone;
    } else {
        layer.alert("尊敬的用户：你输入的手机号有误！");
        return false;
    }
}

//发送后台
function sendInformation() {
    // var telephone = validatetelephone();//提交前验证手机号
    // var region    = validateRegion();   //提交前验证地区选择是否合法
    // var project   = validateProject();  //提交前验证项目选择是否合法
    // if(!telephone || !region || !project){
    //     console.log(555);
    //     return false;
    // }
    let tel_modal = $('#tel-modal');
    tel_modal.css("display","block");
    //手机验证码
    var oBtn = document.getElementById('telCode');
    var closetel= document.getElementById('close-tel');
    var flag = true;

    oBtn.addEventListener("click", function () {
        var time = 60;
        oBtn.classList.add('disable');
        oBtn.innerText = '60';
        oBtn.style.opacity = '0.6';
        oBtn.style.paddingLeft = '42%';
        if (flag) {
            flag = false;
            var timer = setInterval(() => {
                time--;
                oBtn.innerText = time;
                if (time === 0) {
                    clearInterval(timer);
                    oBtn.innerText = '重新获取';
                    oBtn.style.opacity = '1';
                    oBtn.style.paddingLeft = '22%';
                    oBtn.classList.remove('disable');
                    flag = true;
                }
            }, 1000)
        }
    });
    $('#close-tel').click(function () {
        tel_modal.css("display","none");
    });
    // layer.alert("提交成功");
    // console.log(66666);
}

// Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
function OnInput (event) {
    if(event.target.value != '') {
        $('#closetel').css("opacity","1"); ;
    }
}
// Internet Explorer
function OnPropChanged (event) {
    if (event.propertyName.toLowerCase () == "value") {
        if(event.target.value != '') {
            $('#closetel').css("filter","1");
        }
    }
}