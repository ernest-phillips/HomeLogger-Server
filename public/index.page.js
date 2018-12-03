function userLogin() {
    console.log("User login called")
    $('.nav-login').on('click', function() {
        $('.js-container').html(
            `<div class="login-page">
            <h1>Sign into your account</h1>
            <div class="form column">
                <form class="#" action="/api/auth/login" method="POST">
        
                    <input class="item" id="username-txt" type="text" placeholder="username" name="username" autocomplete="off">
                    <input class="item" id="password-txt" type="password" placeholder="password" name="password" autocomplete="off" />
                    <button class="login-btn" type="submit"> Log In </button>
                </form>
            </div>
            <p class="message"> Not registered?
                <a href="signup.html"> Create an account </a>
            </p>
        </div>`
        );
    });
}


function userSignUp() {
    $().on('click', function() {
        $().html(`<div class="login-page">
        <h1>Sign Up</h1>
        <div class="form column">
            <form class="#" action="/api/user" method="POST">
                <input class="item" id="name-txt" type="text" placeholder="name" name="name" />
                <input class="item" id="username-txt" type="text" placeholder="username" name="username" autocomplete="off">
                <input class="item" id="password-txt" type="password" placeholder="password" name="password" autocomplete="off" />
                <input class="item" id="email-txt" type="text" placeholder="email address" name="email" />
                <button class="item" type="submit">Register</button>
                <p class="message">Already registered? <a href="./login.html">Sign In</a></p>
            </form>
        </div>
    </div>`);
    })
}












function onPageLoad() {
    userLogin();
    userSignUp();
};

$(onPageLoad);