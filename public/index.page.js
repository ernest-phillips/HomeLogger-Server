// const CACHE = window.CACHE_MODULE;

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

function clearInputs() {
    console.log("clear inputs")
    $('input').val("");
}


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



// function typeAhead() {
//     $('.typeahead').typeahead({
//             hint: true,
//             highlight: true,
//             minLength: 1
//         }, {
//             name: 'exercises',
//             source: substringMatcher(exercises)
//         }

//     )
// }
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

function workoutHeader() {
    $('.js-container').append('<p>hello there</p>');
}
let exHeadTemp = `<section class="ex-list">
    <div class="log-header">
    <h1 class="ex-head">Exercises</h1>
        <div class="stat-labels">
        <h3 class="log-stat-lbl">Sets</h3>
        <h3 class="log-stat-lbl">Reps</h3>
        <h3 class="log-stat-lbl">Weight</h3>       
        </div><!--end stat-label-->
        <div class="delete"></div>
    </div><!--end log-header-->
</section>`

let exListTemp = `<section class="ex-list">
   <div class="log-header">
    <h3 class="ex-name js-exName">Pushups</h3>
      <div class="stat-labels">
          <p class="log-stat js-setLbl">1</p>
          <p class="log-stat js-repsLbl">10</p>
          <p class="log-stat js-weightsLbl">0</p>    
      </div><!--end stat-label-->   
     <div class="delete js-delete">x</div>
  </div><!--end log-header-->
   <h4 class="add-ex js-addEx"><a href="#">Add Exercise</a></h4>
 </section>`


let searchBar = `<p>This will be on a modal or different page</p>
         <div id="the-basics">
           <input class="search-ex typeahead" type="text" placeholder="Search Exercises"/>
         </div>`

function onPageLoad() {
    // typeAhead();
    currentDate();
    changeDate();
    workoutHeader()
    getWorkouts()
    clearInputs();
}


$(onPageLoad);