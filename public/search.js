var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        let matches;
        var substringRegex;
        matches = [];
        substringRegex = new RegExp(q, 'i');

        $.each(strs, function(i, str) {
            if (substringRegex.test(str)) {
                matches.push(str);
            }
        });
        cb(matches);
    };
};

function typeAhead(exercises) {
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'exercises',
        source: substringMatcher(exercises)
    });
}
// GET EXERCISES
function getUserExercises() {

    axios.get('/api/exercises')
        .then(function(response) {
            exerciseLoop(response.data)
        })
        .catch(function(error) {
            console.log(error)
        });
}

function exerciseLoop(res) {
    let exercises = []
    res.map(item => exercises.push(item.exercise));
    typeAhead(exercises)
}

function clearInput() {
    $('input').val("");

}
// Save exercise set to workout
// capture name of exercise
function selectExercise() {
    $('.search-btn').on('click', function() {
        showSetAdd();
        $('.search-btn').attr("disabled", "disabled")
        let searchVal = $('.search-ex')[1].value;

        $('#exerciseName').append(`${searchVal}`);
    });

}

function hideSaveSet() {
    $('.set-wkout').hide();
}
// unhide set save
function showSetAdd() {
    $('.set-wkout').show();
}

function saveSet() {
    $('main').on('submit', '#saveSet', function(event) {

        event.preventDefault();
        getSetData();


    });
}

function getSetData() {
    let userInfo = CACHE.getAuthenticatedUserFromCache();

    let reps = $('#POST-reps').val();
    let weight = $('#POST-weight').val();
    let exerciseName = $('#exerciseName').text();
    let date = localStorage.getItem('currentDate');
    console.log(date)
    let set = 1;




    window.HTTP_MODULE.createWorkout({
        newWorkout: {
            set: set,
            reps: reps,
            weight: weight,
            user: userInfo.userid,
            jwtToken: userInfo.jwtToken,
            exercise: exerciseName,
            date: date,
            user: userInfo.userid
        }
    })
    document.location.replace('/home.html');

}

function onPageLoadSearch() {
    hideSaveSet();
    clearInput();
    getUserExercises();
    selectExercise();
    saveSet();

}


$(onPageLoadSearch);