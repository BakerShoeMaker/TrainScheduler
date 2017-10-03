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
        //event.preventDefault();
        //Assign variables to form values
        trainName = $("#TrainName").val().trim();
        trainDestination = $("#Destination").val().trim();
        trainFrequency = $("#Frequncy").val().trim();
        trainTime = $("#TrainTime").val().trim();

        //add momemtjs here and add the minutes away
        //-----------------------------------------------------------

        var f = 60;
        var time = "04:40";
        var mTime = moment(time, "hh:mm").format('hh:mm');
        console.log(mTime);

        f = moment(f, "m mm").format(" mm");
        console.log(f);

        //nextTrain = moment(mTime).format("hh:mm").add(f);
        console.log("The next train will be here at: " +mTime);

        //-----------------------------------------------------------



        //send key/values to database.
        database.ref().push({
            db_train: trainName,
            db_destination: trainDestination,
            db_frequency: trainFrequency,
            db_trainTime: trainTime

        });



    });

    //Display values on the page.
    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val().db_train);
        console.log(childSnapshot.val().db_destination);
        console.log(childSnapshot.val().db_frequency);
        var newTrainRow = $("<tr>");

        var _trainName =$("<th scope = 'row'>").html(childSnapshot.val().db_train);
        var _destination = $("<td>").html(childSnapshot.val().db_destination);
        var _frequency = $("<td>").html(childSnapshot.val().db_frequency);
        var _trainTime = $("<td>").html(childSnapshot.val().db_trainTime);

        newTrainRow.append(_trainName)
            .append(_destination)
            .append(_frequency)
            .append(_trainTime);

        $("#TrainInformation").append(newTrainRow)


    });


});
