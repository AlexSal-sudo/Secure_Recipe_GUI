function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

if(getCookie('csrftoken') === null) {
    document.querySelector(".buttonAccount").style.display = "none";
    document.querySelector(".buttonLogout").style.display = "none";
} else {
    document.querySelector(".buttonLogIn").style.display = "none";
    document.querySelector(".buttonSignIn").style.display = "none";
}