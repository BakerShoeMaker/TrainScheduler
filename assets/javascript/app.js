$(document).ready(function(){

    console.log("hello world!");

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
    var trainNextArrival = "";
    var trainMinutesAway = "";

    $("button").on("click", function(){
        //Assign variables to form values
        trainName = $("#TrainName").val().trim();
        trainDestination = $("#Destination").val().trim();
        trainFrequency = $("#Frequncy").val().trim();

        //send key/values to database.
        database.ref().push({
            db_train: trainName,
            db_destination: trainDestination,
            db_frequency: trainFrequency

        });
        //Display values on the page.
        database.ref().on("child_added", function(){
            var _newRow = $("<tr>");
            var _trainName = $("<th scope='row'>").html(childSnapshot.val().db_train);
            var _destination = $("<td>").html(childSnapshot.val().db_destination);
            var _freqency = $("<td>").html(childSnapshot.val().db_frequency);
            //add next arrival
            //add minutes away

            _newRow.append(_trainName)
                .append(_destination)
                .append(_freqency);

            $("#TrainInformation").append(_newRow);
        });


    });


});









