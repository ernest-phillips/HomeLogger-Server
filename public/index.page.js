const axios = require('axios');
const CACHE = window.CACHE_MODULE;

function getWorkouts() {
    CACHE.getAuthenticatedUserFromCache()
    $.ajax({
        type: 'GET',
        url: '/api/workout',
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${CACHE.jwtToken}`);
        },
        success: console.log("Success"),
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function clearInputs() {
    console.log("clear inputs")
    $('input').val("");
}

function onPageLoad() {
    getWorkouts()
    clearInputs();
};

$(onPageLoad);