//FireBase Init
var config = {
    apiKey: "AIzaSyAroWQjq4W1MO2qiTtS9wbw_8b4P7iU0XE",
    authDomain: "homework7-7d2ad.firebaseapp.com",
    databaseURL: "https://homework7-7d2ad.firebaseio.com",
    storageBucket: "homework7-7d2ad.appspot.com",
    messagingSenderId: "376242529638"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

  $("#submit_time").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train_name").val().trim();
  	var trainDestination = $("#destination").val().trim();
  	var firstTrainTime = $("#first_train_time").val().trim();
  	var frequency = $("#frequency").val().trim();

  	var tempObject = {
  		trainName: trainName,
  		trainDestination: trainDestination,
  		firstTrainTime: firstTrainTime,
  		frequency: frequency
  	}
  	
  	database.ref().push(tempObject);

  	  $("#train_name").val("");
  	  $("#destination").val("");
 	  $("#first_train_time").val("");
  	  $("#frequency").val("");

  	  return false;

  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  	console.log(childSnapshot.val());
	
	var trainNameDisplay = childSnapshot.val().trainName;
	var destinationDisplay = childSnapshot.val().trainDestination; 
	var firstTrainTimeDisplay = childSnapshot.val().firstTrainTime; 
	var frequencyDisplay = childSnapshot.val().frequency;

	//apparently moment errors out when the current time is behind the first train time so we subtract a year. 
	var convertedFirstTrainTime = moment(firstTrainTimeDisplay, "hh:mm").subtract(1, "years");  
	var diffTime = moment().diff(moment(convertedFirstTrainTime), "minutes");
	var remainder = diffTime % frequencyDisplay;
	var timeTillTrain = frequencyDisplay - remainder;
	var nextTrain = moment().add(timeTillTrain, "minutes");
	var displayNextTrain = moment(nextTrain).format("hh:mm");

  	$("#train_table").append("<tr><td>" + trainNameDisplay + "</td><td>" + destinationDisplay + "</td><td>" +
  frequencyDisplay + "</td><td>" + displayNextTrain + "</td><td>" + timeTillTrain + "</td></tr>");
});


