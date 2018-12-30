function getWorkouts() {
    CACHE.getAuthenticatedUserFromCache()
    $.ajax({
        type: 'GET',
        url: '/api/home',
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${CACHE.jwtToken}`);
        },
        success: console.log("Success"),
        error: err => {
            console.error(err);
            // if (onError) {
            //     onError(err);
            // }
        }
    });

}

function retrieveSets(d) {
    console.log("retrieving sets")
    let user = window.CACHE_MODULE.getAuthenticatedUserFromCache();
    console.log(d)
    axios.get(`/api/home/${user.userid}/${d}`)
        .then(function(res) {
            formatWorkout(res.data)
        })
        .catch(function(error) {
            console.log(error);
        });


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

function currentDate() {
    let d = moment().format("dddd, MMMM Do");
    $(".js-dateSel").html(d);
    let refresh = moment().format('MM-DD-YYYY')
    retrieveSets(refresh);

}

function refreshDate() {
    let date =
        $('js-dateSel').attr('data-setID', "")
    retrieveSets(refresh);
}

function changeDate() {
    let count = 0;
    let d = moment(new Date()).subtract(count, 'day');
    $('.js-caretLFT').on('click', function() {

        d = d.subtract(1, 'day');
        count++
        $(".js-dateSel").html(d.format("dddd, MMMM Do"));
        let isoDate = d.startOf('day');
        $('.js-exList').html('');
        retrieveSets(isoDate.format("MM-DD-YYYY"));

    });

    $('.js-caretRT').on('click', () => {

        d = d.add(1, 'day');

        $(".js-dateSel").html(d.format("dddd, MMMM Do"));
        let isoDate = d.startOf('day');
        $('.js-exList').html('');
        retrieveSets(isoDate.format("MM-DD-YYYY"));
    });
}

function dateSelectTemplate() {

}

function deleteSet() {
    let userInfo = CACHE.getAuthenticatedUserFromCache()
    $('body').on('click', '.delete', function() {
        let workoutId = $(this).parent('.log-header').attr('data-setID');
        HTTP.deleteWorkout({
            jwtToken: userInfo.jwtToken,
            workoutId
        });
        console.log(workoutId);

    });
}

function onPageLoad() {
    currentDate();
    changeDate();
    getWorkouts();
    deleteSet();

}


$(onPageLoad);