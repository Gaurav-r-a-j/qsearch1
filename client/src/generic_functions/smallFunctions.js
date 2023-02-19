
export const randomImage = (num) => {
    const option = ["notes", "books", "3d", "life", "study", "cars", "files"]
    return `https://source.unsplash.com/random/?${option[num]}`
}


export const getTimeAgo = (timestamp) => {
    const now = new Date();
    const givenTime = new Date(timestamp);
    const diff = (now - givenTime) / 1000; // Calculate difference in seconds

    if (diff < 60) {
        return `${Math.floor(diff)}s ago`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)}m ago`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)}h ago`;
    } else {
        return `${Math.floor(diff / 86400)}d ago`;
    }
}



// export function setCookie(cname, cvalue, exmins) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exmins * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

export function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var secure = window.location.protocol === 'https:' ? '; Secure' : '';
    var sameSite = window.location.protocol === 'https:' ? '; SameSite=None' : '';
    document.cookie = cname + "=" + cvalue + sameSite + secure + ";" + expires + ";path=/";
}
// setCookie("sessionId", "someSessionIdValue", 2);

// export const getCookie = (name) => {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//         const [cookieName, cookieValue] = cookies[i].trim().split('=');
//         if (cookieName === name) {
//             return cookieValue;
//         }
//     }
//     return null;
// }


export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// var sessionId = getCookie("sessionId");


