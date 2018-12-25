var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        let matches;
        var substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
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
            // console.log(response.data)
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
    $('input').val("")
}
// Save exercise set to workout
// capture name of exercise
function selectExercise() {
    $('.search-btn').on('click', function() {
        let searchVal = $('.search-ex')[1].value;

        $('#exerciseName').append(`${searchVal}`);
    });

}
// unhide set adder
function showSetAdd() {

}

function saveSet() {

    let date = moment().format()

    $('form').on('submit', '#saveSet', function(event) {
        event.preventDefault();

        let userInfo = window.CACHE_MODULE.getAuthenticatedUserFromCache();
        let reps = $('#POST-reps').val()
        let weight = $('#POST-weight').val();
        let exerciseName = $('#exerciseName').val();
        console.log(reps);
        console.log(weight);
        console.log(exerciseName);
        // console.log(window.HTTP_MODULE)
        window.HTTP_MODULE.createWorkout({
            newWorkout: {
                reps: reps,
                weight: weight,
                user: userInfo.userid,
                jwtToken: userInfo.jwtToken,
                exercise: exerciseName,
                date: date
            }
        })
    });

}




function onPageLoad() {
    // typeAhead();
    clearInput();
    getUserExercises();
    selectExercise();
    saveSet();
}


$(onPageLoad)