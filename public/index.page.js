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

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

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



function typeAhead() {
    $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'exercises',
            source: substringMatcher(exercises)
        }

    )
}
count = 1

function currentDate() {
    var d = moment().format("dddd, MMMM Do");
    $(".js-dateSel").html(d);
    console.log(d)
}

function changeDate(count) {
    $('.js-caretLFT').on('click', function() {
        count = count - 1
        let d = moment(new Date()).subtract(count - 1, 'days');
        $(".js-dateSel").html(d.format("dddd, MMMM Do"));
        console.log(d);
    });

    $('.js-caretRT').on('click', () => {
        count = count + 1
        let d = moment(new Date()).add(count, 'days');
        $(".js-dateSel").html(d.format("dddd, MMMM Do"));
        console.log(d)
    });
}

function onPageLoad() {
    typeAhead();
    currentDate();
    changeDate();
}

$(onPageLoad);