$(document).ready(onPageLoadHome);

function onPageLoadHome() {
    updateAuthenticatedUI();

    // if (STATE.authUser) {
    //     HTTP.getUserworkouts({
    //         jwtToken: STATE.authUser.jwtToken,
    //         onSuccess: console.log("User Authenticated")
    //             // RENDER.renderWorkoutsList
    //     });
    // }
    { /* <nav class="nav-login"><a id="logout-btn" href="">Log Out</a> </nav> */ }

    // $('#workout-list').on('click', '#delete-workout-btn', onDeleteWorkoutBtnClick);
    // $('#workout-list').on('click', '#workout-card', onWorkoutCardClick);
}


function onLogoutBtnClick(event) {
    event.preventDefault();

    try {
        CACHE.deleteAuthenticatedUserFromCache();
        window.open('/index.html', '_self')
    } catch {
        console.error(error);
    }
}

// Handle opening Workout details
function onWorkoutCardClick(event) {
    const workoutId = $(event.currentTarget).attr('data-workout-id');
    window.open(`Workout/details.html?id=${workoutId}`, '_self');
}

// Handle deleting Workouts
function onDeleteWorkoutBtnClick(event) {

    event.stopImmediatePropagation();
    const workoutId = $(event.currentTarget)
        .closest('#workout-card')
        .attr('data-workout-id');
    const userSaidYes = confirm('Are you sure you want to delete this workout?');
    if (userSaidYes) {
        HTTP.deleteWorkout({
            workoutId: workoutId,
            jwtToken: STATE.authUser.jwtToken,
            onSuccess: () => {
                // Step 4: If succesful, reload the workouts list
                alert('Workout deleted succesfully, reloading results ...');
                HTTP.getUserWorkouts({
                    jwtToken: STATE.authUser.jwtToken,
                    onSuccess: RENDER.renderWorkoutsList
                });
            }
        });
    }
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    if (authUser) {
        STATE.authUser = authUser;
        $('#nav-greeting').html(`Welcome, ${authUser.name}`);
        $('#auth-menu').removeAttr('hidden');
    } else {
        $('#default-menu').removeAttr('hidden');
    }
}