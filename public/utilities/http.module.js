window.HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserNotes,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout
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
    console.log("login user called")
    const {
        userData,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'POST',
        url: '/',
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

function getUserNotes(options) {
    const {
        jwtToken,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'GET',
        url: '/api/workout',
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
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

function getNoteById(options) {
    const {
        noteId,
        onSuccess
    } = options;
    $.getJSON(`/api/workout/${workoutId}`, onSuccess);
}

function createNote(options) {
    const {
        jwtToken,
        newNote,
        onSuccess,
        onError
    } = options;

    $.ajax({
        type: 'POST',
        url: '/api/workout',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newNote),
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

function updateNote(options) {
    const {
        jwtToken,
        noteId,
        newNote,
        onSuccess,
        onError
    } = options;

    $.ajax({
        type: 'PUT',
        url: `/api/workout/${noteId}`,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newNote),
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

function deleteNote(options) {
    const {
        noteId,
        jwtToken,
        onSuccess,
        onError
    } = options;
    $.ajax({
        type: 'delete',
        url: `/api/workout/${workoutId}`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
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