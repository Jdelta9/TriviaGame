var DEBUG = true;
var questionNumber = 1;
var answerSheet = ['Mac & Cheese', 'Pensacola', '7', 'All the above', 'Frozen'];
var count = 0;

var questions = {
    1: {
        question: "What is my favorite pasta dish?",
        response: ['chicken Alfredo','Mac & Cheese','Carbonara','Bow Tie with Meat Sauce']
    },
    2: {
        question: "Where in Florida was I born?",
        response: ['Miami', 'Orlando', 'Pensacola', 'Tallahassee']
    },
    3: {
        question: "How many weeks early was I born?",
        response: ['4', '2', '10', '7']
    },
    4: {
        question: "What is my favorite hobby?",
        response: ['Drawing ', 'Singing', 'Bicycling', 'All the above']
    },
    5: {
        question: "What is my favorite Disney movie?",
        response: ['Frozen', 'Snow White', 'Beauty & the Beast', 'Cinderella']
    }

};


var stopwatch = {

    time: 15,
    isValid: true,

    reset: function () {
        stopwatch.stop();
        stopwatch.time = 15;
        stopwatch.isValid = true;
        var converted = stopwatch.timeConverter(stopwatch.time);
        $(".display").html(converted);
    },
    start: function () {
        // DONE: Use setInterval to start the count here.
        intervalId = setInterval(stopwatch.count, 1000);
    },
    stop: function () {
        // DONE: Use clearInterval to stop the count here.
        clearInterval(intervalId);
    },
    count: function () {
        stopwatch.timeIsUP();
        if (stopwatch.isValid) {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);
            $(".display").html(converted);
        }
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 15) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    },
    timeIsUP: function () {
        //console.log(questionNumber);
        if (this.time === 0) {
            this.isValid = false;
            this.stop();
            saveAnswer(questionNumber, 9);
            clearButtons();
        }
    }
};


function displayQuestion(num) {
    /**
     * This function retrieves the the object from an array and displays the responses as buttons.
     * @method displayQuestion
     * @param {num} int - integer which is used to determine which object to retrieve from the array, questions.
     */

    if (num <= Object.keys(questions).length) {
        stopwatch.start();
        $('.question').html(questions[num].question);
        for (var i = 0; i < questions[num].response.length; i++) {
            var temp = questions[num].response[i];
            $("#" + i + "").html(temp);
        }
    } else {
        console.log('there are no more questions, and get the score');
        stopwatch.stop();
        results();

    }
}
function results() {
    /**
     * This function displays the results of the trivia game as a table and invokes the function updatePie()
     * @method results
     * @param none
     */

    $(".myTable").removeClass('hide');
    $(".display, .timeText").addClass('hide');
    $(".response").fadeOut('slow');
    $(".question").html('<p>SCORE</p>');
    for (var i = 0; i < Object.keys(questions).length; i++) {
        var index = i + 1;
        var id = "userAns" + index.toString();
        var credit = "answer" + index.toString();
        var ans = questions[index].guess;
        $("#" + id + "").html(questions[index].response[ans]);
        $("#" + credit + "").html(answerSheet[i]);
        if (questions[index].response[ans] === answerSheet[i]) {
            console.log('they match at i:' + i);
            var points = "point" + index.toString();
            $("#" + points + "").html("1");
            count++;
        }
    }
    $("#score").html(count);
    $(".pie").removeClass('hide');
    updatePie();
}


function clearButtons() {
    /**
     * This function removes the 'start' button and displays the first question and responds.
     * @method clearButton
     * @param none
     */

    $(".start").fadeOut('slow');
    displayQuestion(questionNumber);

}

function saveAnswer(qN, answer) {
    /**
     * This function saves the input and places the answer as a new property(guess) in the question object.
     * @method savaAnswer
     * @param {qN} int - Used as an index to retrieve an object from the questions array.
     * @param {answer} int - Is the response given by the id of the button, or  9 which signifies time ran out.
     */

    if (stopwatch.isValid) {
        questions[qN].guess = answer;
        questionNumber++;
        stopwatch.reset();
    } else if (qN <= Object.keys(questions).length) {
        questions[qN].guess = answer;
        questionNumber++;
        stopwatch.reset();
    }
    if (DEBUG) {
        console.log('saving answer:' + qN);
        console.log(questions);
    }
}

function updatePie() {
    /*
     * This function displays a Pie chart
     * @method updatePid
     * @param none
     */
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Correct", "Wrong"],
            datasets: [{
                backgroundColor: [
                    "#ad416c",
                    "#e4c7d3"

                ],
                data: [count, 5 - count]
            }]
        }
    });
}

window.onload = function () {
    $(".start").click(function () {


        if (DEBUG) {
            console.log('click');
            console.log(Object.keys(questions).length);
        }
        clearButtons();
        $('#0, #1, #2, #3').removeClass("hide");

    });
    //on click on answer
    $("#0, #1, #2, #3").click(function (e) {

        if (DEBUG) {
            //which button was pushed
            console.log(e.target.id);
            console.log(questionNumber);
        }
        saveAnswer(questionNumber, e.target.id);
        //erase first options
        clearButtons();

    })

};