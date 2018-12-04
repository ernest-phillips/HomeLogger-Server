function userLogin() {

    $('.nav-login').on('click', function() {
        console.log("you clicked login");
        Window.location.replace()
    });
}


function userSignUp() {
    $(".js-signUp").on('click', function() {
        $().html(``);
    })
}


function onPageLoad() {

    userLogin();
    userSignUp();
};

// $(onPageLoad);