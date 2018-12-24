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
            if (onError) {
                onError(err);
            }
        }
    });
}

function displayWorkout(d) {
    axios.get(`/api/home/${d}`)
        .then(function(res) {
            console.log(res.data.sets[0])
        })
        .catch(function(error) {
            console.log(error);
        });

    $('.js-exList').append(`<div class="log-header">
    <h3 class="ex-name js-exName"></h3>
    <div class="stat-labels">
        <p class="log-stat js-setLbl"></p>
        <p class="log-stat js-repsLbl"></p>
        <p class="log-stat js-weightsLbl"></p>
    </div>
    <!--end stat-label-->
    <div class="delete js-delete">x</div>
</div>
<!--end log-header-->`)
}

function currentDate() {
    var d = moment().format("dddd, MMMM Do");
    $(".js-dateSel").html(d);
    console.log(d)
    displayWorkout(d)
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



function dateSelectTemplate() {

}




let searchBar = `<p>This will be on a modal or different page</p>
         <div id="the-basics">
           <input class="search-ex typeahead" type="text" placeholder="Search Exercises"/>
         </div>`

function onPageLoad() {
    // typeAhead();
    currentDate();
    changeDate();
    getWorkouts();
    // displayWorkout();

}


$(onPageLoad);