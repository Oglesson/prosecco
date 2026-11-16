$(document).ready(function () {

    //to find if request is made from TiVo app
    // var getuseragent = navigator.userAgent;
    // if (getuseragent.indexOf('iPad') >=0) {
    //    if(getuseragent.indexOf('Safari') == -1){
    //    	$('body').addClass('tivoapp');
    // 	}
    // };
    $(".login-form-area").removeClass("slide-up");
    // $(".logo").delay(1200).removeClass("slide-up-logo");
    if (!$(".login-form-area").hasClass(".slide-up")) {
        setTimeout(function () {
            $(".logo").removeClass('slide-up-logo');
        }, 700);
    }

    var standalone = window.navigator.standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test(userAgent),
        ios = /iphone|ipod|ipad/.test(userAgent),
        disabledButton = false;

    // alert("test standalone message:" + " "+ standalone);
    // alert("test userAgent message:" + " "+ userAgent);
    // alert("test safari message:" + " " + safari);
    // alert("test ios message:" + " " + ios);
    //alert("Useragent is : " + "   " + navigator.userAgent);

    if (ios) {
        if (standalone && !safari) {
            //standalone
            $('body').addClass('tivoapp');
            // alert("test :its an standalone app");
        } else if (!standalone && !safari) {
            //uiwebview
            $('body').addClass('tivoapp');
            //alert("test: inside uiwebview");
        }
    };

    function validateEmail(email) {
        if (email == "") {
            $("#username").addClass("has-error").parent().addClass("shake").removeClass("isvalid");
            $("#username-error-message").addClass("show-error");
            return false;
        }

        var emailformat = /^[_A-Za-z0-9_%+-]+(\.[_A-Za-z0-9_%+-]+)*\@[A-Za-z0-9-]+(\[A-Za-z0-9]+)*(\.[A-Za-z]{2,20}){1,3}$/;
        if (!emailformat.test(email)) {
            $(this).removeClass("has-error").parent().removeClass("shake");
            $(this).addClass("has-error");
            $("#username-error-message").addClass("show-error").html("<p>Please enter a valid email address.</p>").prev().addClass("shake").removeClass("isvalid");
            return false;
        }

        $(this).removeClass("has-error");
        $("#username-error-message").removeClass("show-error").prev().removeClass("shake").addClass("isvalid");

        return true;
    }

    function validatePassword(password) {
        var passwordformat = /^[a-zA-Z]{1}/;
        var loginpwd = $("#password").val().length;

        if (password == "") {
            $('#password').addClass("has-error").parent().addClass("shake").removeClass("isvalid");
            $('#password-error-message').addClass('show-error');
            return false;
        } else if (passwordformat.test(password) && loginpwd >= 6) { // AJ - Removed upper limit from password field
            $("#password-error-message").removeClass("show-error").html("");
            $('#password').removeClass("has-error").parent().addClass("isvalid");        
            return true;
        }else{

            $("#password-error-message").addClass("show-error").html("Your password is at least 6 characters, begins with a letter and contains a number.").prev().addClass("shake").removeClass("isvalid");
            $('#password').addClass("has-error");
            return false;
        }
    }

    $(".btn-signin").click(function (event) {
        var loginEmail = $("#username").val();
        var loginPassword = $("#password").val();

        // AJ - Removed the actual button disable, and replaced with a global variable
        // to allow submit event to fire after click returns true.
        if (validateEmail(loginEmail) && validatePassword(loginPassword)) {
            if(disabledButton){
                return false;
            } else {
                disabledButton = true;
                return true;
            }
        } else {
            disabledButton = false;
            return false;
        }
    });

    // Show and hide password
    $("#show-password").click(function () {
        if ($("#password").attr("type") == "password" && $("#password").val() != "") {
            $("#password").attr("type", "text");
            //$("#show-password").text("Hide");
        } else {
            $("#password").attr("type", "password");
            //$("#show-password").text("Show");
        }
    });

    // Increase width of recaptcha widget 
    function resizeReCaptcha() {
        if ($(".g-recaptcha").length) {
            var recaptcha = $(".g-recaptcha");
            var login = $("#login");
            var innerWidth = login.innerWidth();
            if (innerWidth >= 320 && innerWidth <= 480) {
                var newScaleFactor = innerWidth / 304;
                recaptcha.css('transform', 'scale(' + newScaleFactor + ')');
                recaptcha.css('-webkit-transform', 'scale(' + newScaleFactor + ')');
                recaptcha.css('transform-origin', '0 0');
                recaptcha.css('-webkit-transform-origin', '0 0');
                recaptcha.css('margin-bottom', '40px');
                recaptcha.css('display', 'inline-block');
            } else {
                recaptcha.css('transform', 'scale(1)');
                recaptcha.css('transform-origin', '0 0');
                recaptcha.css('-webkit-transform-origin', '0 0');
            }
        }
    }

    resizeReCaptcha();
    $(window).resize(function () {
        resizeReCaptcha();
    });

    function focusIn(id) {
        var elem = $("#" + id);
        $("input[class*='form-control']").not($(elem)).addClass("shrink").removeClass("has-error");
        elem.parent().removeClass("shake");
    }

    function focusOut(id) {
        var elem = $("#" + id);
        if (elem.val()) {
            elem.addClass("has-value");
            elem.removeClass("shrink");
        } else {
            elem.removeClass("has-value");
        }
         $("input[class*='form-control']").not($(elem)).removeClass("shrink");
    }

    $("#username").focusin(function (event) {
        focusIn("username");
    });

    $("#username").focusout(function () {
        validateEmail($(this).val());
        focusOut("username");
    });

    $("#password").focusin(function () {
        focusIn("password");
    });

    $("#password").focusout(function () {
        validatePassword($(this).val());
        focusOut("password");
        $('#username').fadeIn("slow").removeClass("shrink");
    });

    $("#password").keyup(function () {
        if ($("#password").val() != "") {
            $('#show-password').addClass("show-password");
        } else {
            $('#show-password').removeClass("show-password");
        }
    });
})