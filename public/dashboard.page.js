function welcomeUser() {
    let user = CACHE.getAuthenticatedUserFromCache();
    $('.welcome').html(`<h4>Welcome <a href="#">${user.username}</a></h4>`)
}

function checkDate() {
    let count = 0;

    if (localStorage.getItem('currentDate') == null) {
        let cDate = moment(new Date()).subtract(count, 'day');
        console.log("No local storage date: ", cDate)
        changeDate(count, cDate);
    } else {
        let cDate = moment(localStorage.getItem('currentDate'));
        console.log("Moment Converted:", moment(localStorage.getItem('currentDate')));
        changeDate(count, cDate);
    }


    // localStorage.setItem('currentDate', cDate.format('YYYY-MM-DD'));


}

function changeDate(count, cDate) {

    console.log("The current date is:", cDate)
    $('.js-caretLFT').on('click', function() {
        cDate = cDate.subtract(1, 'day');
        count++
        $(".js-dateSel").html(cDate.format("dddd, MMMM Do"));

        $('.js-exList').html('');
        localStorage.setItem('currentDate', cDate.format('YYYY-MM-DD'));
        localStorage.setItem('dateString', cDate.format("dddd, MMMM Do"))
        getSetDataFromAPI();
        // retrieveSets(cDate.format('YYYY-MM-DD'));

    });

    $('.js-caretRT').on('click', () => {
        cDate = cDate.add(1, 'day');

        $(".js-dateSel").html(cDate.format("dddd, MMMM Do"));

        $('.js-exList').html('');
        localStorage.setItem('currentDate', cDate.format('YYYY-MM-DD'));
        localStorage.setItem('dateString', cDate.format("dddd, MMMM Do"))
        getSetDataFromAPI();
        // retrieveSets(cDate.format('YYYY-MM-DD'));
    });
}

function getSetDataFromAPI() {
    console.log("retrieving sets")

    let user = window.CACHE_MODULE.getAuthenticatedUserFromCache();

    if (localStorage.getItem('currentDate') == null) {
        let d = moment().format('YYYY-MM-DD')
        axios.get(`/api/home/${user.userid}/${d}`)
            .then(function(res) {
                formatWorkout(res.data)
            })
            .catch(function(error) {
                console.log(error);
            });
    } else {
        let d = localStorage.getItem('currentDate');
        axios.get(`/api/home/${user.userid}/${d}`)
            .then(function(res) {
                formatWorkout(res.data)
            })
            .catch(function(error) {
                console.log(error);
            });
    }

}

function retrieveSets(d) {

    if (d == null) {
        d = moment().format('YYYY-MM-DD');
    } else {
        d = d;
    }

    $('.ex-container').append(`<div class="this-date" date="${d}">`);

}

function formatWorkout(data) {
    data.map((item, index) => displayWorkout(item, index))

}

function displayWorkout(item, index) {

    let exercise = item.sets.exercise;
    let weight = item.sets.weight;
    let reps = item.sets.reps
    let setID = item._id

    $('.js-exList').append(`<div class="log-header" data-setID="${setID}">
    <h3 class="ex-name js-exName ">${exercise}</h3>
    
    <div class="stat-labels">
        <p class="log-stat js-exerLbl">${index +1}</p>
        <p class="log-stat js-repsLbl">${reps}</p>
        <p class="log-stat js-weightsLbl">${weight}</p>
    </div>
    <!--end stat-label-->
    <div class="delete js-delete">
    <i class="fas fa-minus-circle"></i>
    </div>
</div>
<!--end log-header-->`)
}

function displayDate() {
    if (localStorage.getItem('dateString') == null) {
        let cDate = moment().format("dddd, MMMM Do");
        $(".js-dateSel").html(cDate);
        console.log("Using today's date", cDate)
    } else {
        let cDate = localStorage.getItem('dateString');
        $(".js-dateSel").html(cDate);
        console.log("Using local storage date", cDate)
    }
}


function deleteSet() {
    let userInfo = CACHE.getAuthenticatedUserFromCache();

    $('body').on('click', '.delete', function() {
        $('.js-exList').html('')
        let workoutId = $(this).parent('.log-header').attr('data-setID');
        HTTP.deleteWorkout({
            jwtToken: userInfo.jwtToken,
            workoutId,
            deleteSuccess: getSetDataFromAPI()
        });

    });
}

function onPageLoad() {
    welcomeUser();
    displayDate();
    checkDate();
    getSetDataFromAPI();

    deleteSet();


}


$(onPageLoad);