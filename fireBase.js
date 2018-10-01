


var config = {
    apiKey: "AIzaSyDNQUqHiSeOW7JeYDZHJoYzqJwaPOlw9J0",
    authDomain: "trainnew-71143.firebaseapp.com",
    databaseURL: "https://trainnew-71143.firebaseio.com",
    projectId: "trainnew-71143",
    storageBucket: "trainnew-71143.appspot.com",
    messagingSenderId: "647980413579"
};
firebase.initializeApp(config);


var database = firebase.database();

$("#submitInfo").on("click", function () {

    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var arrivalTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();



    database.ref().push({



        name: trainName,
        destination: destination,
        arrivalTime: arrivalTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    


    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");


});



database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.arrivalTime);
    console.log(sv.frequency);
    console.log(sv.dateAdded);


});




database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var snapName = childSnapshot.val().name;
	var snapDestination = childSnapshot.val().destination;
	var snapFrequency = childSnapshot.val().frequency;
	var snapArrivalTime = childSnapshot.val().arrivalTime;


	var timeArrive = snapArrivalTime.split(":");
	var trainTime = moment().hours(timeArrive[0]).minutes(timeArrive[1]);
	var maxMoment = moment.max(moment(), trainTime);
	var trainMinutes;
	var minutesTill;


	if (maxMoment === trainTime) {
		minutesTill = trainTime.format("hh:mm A");
		trainMinutes = trainTime.diff(moment(), "minutes");
	} else {

		var differenceTimes = moment().diff(trainTime, "minutes");
		var trainRemainder = differenceTimes % snapFrequency;
		trainMinutes = snapFrequency - trainRemainder;

		minutesTill = moment().add(trainMinutes, "m").format("hh:mm A");
	}
	


    var firstTime = "05:00 AM";
    
 
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log('firstTimeConverted = ' + firstTimeConverted);


var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % snapFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = snapFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





  $("#train-table> tbody").append("<tr><td>" + snapName + "</td><td>" + snapDestination + "</td><td>" +
minutesTill + "</td><td>" + tMinutesTillTrain + ' Minutes'+ "</td><td>");










});


