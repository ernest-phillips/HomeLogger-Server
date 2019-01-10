// import axios from 'axios';
window.HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserWorkouts,
    createWorkout,
    deleteWorkout,
    logoutUser
};

function signupUser(options) {
    const {
        userData,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'POST',
        url: '/api/user',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function loginUser(options) {
    const {
        userData,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'POST',
        url: '/api/auth/login',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}


function logoutUser(options) {
    const {
        userData,
        onSuccess,
        onError
    } = options;

    $.ajax({
        type: 'POST',
        url: '/api/auth/logout',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function getUserWorkouts(options) {
    const {
        jwtToken,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'GET',
        url: '/api/home',
        contentType: 'application/json',
        dataType: 'json',
        data: console.log(data),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function createWorkout(options) {

    const {
        jwtToken,
        newWorkout,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'POST',
        url: '/api/home',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newWorkout),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}



function deleteWorkout(options) {
    const {
        workoutId,
        jwtToken,
        deleteSuccess,
        onError
    } = options;
    $.ajax({
        type: 'delete',
        url: `/api/home/${workoutId}`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: deleteSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}