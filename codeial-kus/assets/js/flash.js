// Initializing toast
window.addEventListener('load', function () {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    })

    toastList.forEach(element => {
                element.show();
            });

        // console.log(toastList);
}, false);

$(document).ajaxComplete(function(event,xhr,options) {
    // console.log("data", xhr, options);
    console.log($(' .toast'));
    var toastElList = [].slice.call($(' .toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    })

    toastList.forEach(element => {
                element.show();
            });
    
})