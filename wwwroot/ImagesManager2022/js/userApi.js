const apiUserURL = "https://vincent-lepage-api-server-pfi.glitch.me/accounts";
const loginApiURL = "https://vincent-lepage-api-server-pfi.glitch.me/token";
function USER_HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiUserURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function USER_POST(data, successCallBack, errorCallBack, querystring) {
    $.ajax({
        url: apiUserURL + "/" + querystring,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
} 
function USER_GET(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiUserURL + "/index/" + id,
        type: 'GET',
        success: data => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
} 
function USER_GET_VERIFICATION_CODE(userId, code, successCallBack, errorCallBack)
{
    $.ajax({
        url: apiUserURL + "/verify?id=" + userId + "&code="+code,
        type: 'GET',
        success: data => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function USER_MODIFY(user, successCallBack, errorCallBack) {
    $.ajax({
        url: apiUserURL + "/modify",
        type: 'PUT',
        contentType: 'application/json',
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("access_token")}`},
        data: JSON.stringify(user),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function USER_DELETE(id, successCallBack, errorCallBack, access_token) {
    $.ajax({
        url: apiUserURL + "/remove/" + id,
        type: 'GET',
        headers: {'Authorization': `Bearer ${access_token}`},
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function USER_LOGIN(data, successCallBack, errorCallBack) {
    $.ajax({
        url: loginApiURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function USER_LOGOUT(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiUserURL + "/logout/" + id,
        type: 'GET',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
