let STATE = {};
// All these modules are are defined in /public/utilities
// const RENDER = window.RENDER_MODULE;
// const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    updateAuthenticatedUI();

    if (STATE.authUser) {
        HTTP.getUserworkouts({
            jwtToken: STATE.authUser.jwtToken,
            onSuccess: RENDER.renderWorkoutsList
        });
    }

    $('#logout-btn').on('click', onLogoutBtnClick);
    $('#workout-list').on('click', '#delete-workout-btn', onDeleteWorkoutBtnClick);
    $('#workout-list').on('click', '#workout-card', onWorkoutCardClick);
}

function onLogoutBtnClick(event) {
    const confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
        CACHE.deleteAuthenticatedUserFromCache();
        window.open('/home.html', '_self');
    }
}

// Handle opening Workout details
function onWorkoutCardClick(event) {
    const workoutId = $(event.currentTarget).attr('data-workout-id');
    window.open(`Workout/details.html?id=${workoutId}`, '_self');
}

// Handle deleting Workouts
function onDeleteWorkoutBtnClick(event) {
    /**
     * Because "onWorkoutDeleteClick" and "onWorkoutClick" both are listening for clicks inside of
     * #Workout-card element, we need to call event.stopImmediatePropagation to avoid both
     * event listeners firing when we click on the delete button inside #Workout-card.
     */
    event.stopImmediatePropagation();
    // Step 1: Get the Workout id to delete from it's parent.
    const workoutId = $(event.currentTarget)
        .closest('#workout-card')
        .attr('data-workout-id');
    // Step 2: Verify use is sure of deletion
    const userSaidYes = confirm('Are you sure you want to delete this workout?');
    if (userSaidYes) {
        // Step 3: Make ajax call to delete workout
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