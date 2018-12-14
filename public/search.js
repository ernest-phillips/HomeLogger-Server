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
    })
}
// GET EXERCISES
function getUserExercises() {
    console.log("Exercises listed")
    axios.get('/api/exercises')
        .then(function(response) {
            // console.log(response.data)
            exerciseLoop(response.data)
        })
        .catch(function(error) {
            console.log(error)
        });
}

function showExercises(item) {
    let exercises = [];
    console.log(item)
        // exercises.push(item.exercise);    
        // for (let i=0; i < item.length)
        // $('.js-container').append(`<p class="ex-item">${item.exercise}</p>`)
        // typeAhead(exercises);
}

function exerciseLoop(res) {
    let exercises = []
        // res.map((item, index) => showExercises(item));
    res.map(item => exercises.push(item.exercise))
    console.log(exercises)
    typeAhead(exercises)
}

function onPageLoad() {
    typeAhead();
    getUserExercises();

}


$(onPageLoad)