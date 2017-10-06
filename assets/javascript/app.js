function clearFormFields()
{
    //Clear the form fields
    $("#TrainName").text("");
    $("#Destination").text("");
    $("#Frequency").text("");
    $("#FirstTrainTime").text("");
}

$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBntwLlK7FzHl0nCgyRaxX3FRVI0xfuKSU",
        authDomain: "trainschedule-82a45.firebaseapp.com",
        databaseURL: "https://trainschedule-82a45.firebaseio.com",
        projectId: "trainschedule-82a45",
        storageBucket: "trainschedule-82a45.appspot.com",
        messagingSenderId: "985612021349"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var trainDestination = "";
    var trainFrequency = "";
    var firstTrainTime = "";
    var trainMinutesAway = "";


    $("button").on("click", function(event){
        event.preventDefault();
        //Assign variables to form values
        trainName = $("#TrainName").val().trim();
        trainDestination = $("#Destination").val().trim();
        trainFrequency = $("#Frequency").val().trim();
        firstTrainTime = $("#FirstTrainTime").val().trim();

        //add momemtjs here and add the minutes away
        //-----------------------------------------------------------

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference between the current time and processed Momentjs time
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart
        var tRemainder = diffTime % trainFrequency;

        // Minutes until next train
        var minutesTillTrain = trainFrequency - tRemainder;

        // Next train calculations
        var trainNextArrival_raw = moment().add(minutesTillTrain, "minutes");
        var trainNextArrival = moment(trainNextArrival_raw).format("hh:mm");

        //-----------------------------------------------------------


        //send key/values to database.
        database.ref().push({
            db_train: trainName,
            db_destination: trainDestination,
            db_frequency: trainFrequency,
            db_trainMinutesAway: minutesTillTrain,
            db_trainNextArrival: trainNextArrival
        });
        clearFormFields();

    });


    //Display values on the page.
    database.ref().on("child_added", function(childSnapshot){
        var newTrainRow = $("<tr>");

        var _trainName =$("<th scope = 'row'>").html(childSnapshot.val().db_train);
        var _destination = $("<td>").html(childSnapshot.val().db_destination);
        var _frequency = $("<td>").html(childSnapshot.val().db_frequency);
        var _trainNextArrival = $("<td>").html(childSnapshot.val().db_trainNextArrival);
        var _trainMinutesAway = $("<td>").html(childSnapshot.val().db_trainMinutesAway);

        newTrainRow.append(_trainName)
            .append(_destination)
            .append(_frequency)
            .append(_trainNextArrival)
            .append(_trainMinutesAway);
        $("#TrainInformation").append(newTrainRow);


    });


});

