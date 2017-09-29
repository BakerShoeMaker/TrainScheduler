
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
            train: trainName,
            destination: trainDestination,
            frequency: trainFrequency

        });


    });


});









