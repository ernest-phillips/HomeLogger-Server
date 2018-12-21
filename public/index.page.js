const CACHE = window.CACHE_MODULE;

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
    getWorkouts()

}


$(onPageLoad);