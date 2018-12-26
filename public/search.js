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
    console.log("Save Set Called")


    $('main').on('submit', '#saveSet', function(event) {
        console.log(event)

        event.preventDefault();
        let userInfo = window.CACHE_MODULE.getAuthenticatedUserFromCache();
        let reps = $('#POST-reps').val();
        let weight = $('#POST-weight').val();
        let exerciseName = $('#exerciseName').text();
        let date = moment().format();
        let set = 1;
        console.log(reps);
        console.log(weight);
        console.log("Your excercise name is:", exerciseName);

        window.HTTP_MODULE.createWorkout({
            newWorkout: {
                set: set,
                reps: reps,
                weight: weight,
                user: userInfo.userid,
                jwtToken: userInfo.jwtToken,
                exercise: exerciseName,
                date: date
            },
            user: userInfo.userid
        })
        document.location.replace('/home.html')
    });

}

function onPageLoadSearch() {
    clearInput();
    getUserExercises();
    selectExercise();
    saveSet();
}


$(onPageLoadSearch);