$(document).ready(onPageLoadAuth);

function onPageLoadAuth() {
    $('#sign-up-form').submit(onSignUpSubmit);
    $('#login-form').submit(onLoginSubmit);
    $('#logout-btn').on('click', onLogoutSubmit);

}

function onSignUpSubmit(event) {
    event.preventDefault();

    const userData = {
        name: $('#name-txt').val(),
        email: $('#email-txt').val(),
        username: $('#username-txt').val(),
        password: $('#password-txt').val()
    };

    HTTP.signupUser({
        userData,
        onSuccess: user => {
            alert(`User "${user.username}" created, you may now log in.`);
            window.open('/login.html', '_self');
        },
        onError: err => {
            alert('There was a problem processing your request, please try again later.');
        }
    });
}

function onLoginSubmit(event) {
    console.log("OnLogin Running")

    event.preventDefault();
    const userData = {
        username: $('#username-txt').val(),
        password: $('#password-txt').val()
    };

    HTTP.loginUser({
        userData,
        onSuccess: response => {
            const authenticatedUser = response.user;
            authenticatedUser.jwtToken = response.jwtToken;
            CACHE.saveAuthenticatedUserIntoCache(authenticatedUser);

            alert('Login succesful, redirecting you to homepage ...');
            window.open('/home.html', '_self');
        },
        onError: err => {
            alert('Incorrect username or password. Please try again.');
        }
    });
}

function onLogoutSubmit(event) {
    event.preventDefault();
    HTTP.logoutUser({
        onSuccess: response => {
            CACHE.deleteAuthenticatedUserFromCache();

            window.open('/', '_self');
        }
    })
}