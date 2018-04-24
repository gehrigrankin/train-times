// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMw103wYrXOt0ZUGIg8mcJSuRam0eSbA0",
    authDomain: "train-time-tracker-94cfa.firebaseapp.com",
    databaseURL: "https://train-time-tracker-94cfa.firebaseio.com",
    projectId: "train-time-tracker-94cfa",
    storageBucket: "",
    messagingSenderId: "793875369775"
};

firebase.initializeApp(config);

var database = firebase.database();


//Button for adding trains
$('#add-train-btn').on('click', function(){
    //Prevents blanks?
    event.preventDefault();

    //Grabs the user input
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(),"HH:mm").format("X");
    var trainFreq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        start: trainStart,
        freq: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);


    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
});


// Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on('child_added', function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);


    //Calculating the next train
    
    

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var train = moment().diff(moment.unix(empStart, "X"), "months");
    //console.log(empMonths);

    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);

    var nextTrainPretty = moment.unix(trainStart).format("HH:mm");

    var minAway = moment().diff(moment.unix(trainStart, "X"), "minutes");

    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();

    
    if ((m + trainFreq) > 60){
        h++;
        m = 60 - (m + trainFreq);
    }
    
    


    
    // Add each train's data into the table
    $("#train-table > tbody").append(
        "<tr><td>" + trainName + 
        "</td><td>" + trainDest + 
        "</td><td>" + trainFreq +
        "</td><td>" + nextTrainPretty +
        "</td><td>" + minAway +
        "</td><td>"
    );
});
