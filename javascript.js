// Function calling
displayGIF();

// Displaying and pausing GIF
function displayGIF () {
    var something = "rock paper scissors"
    var URL = "https://api.giphy.com/v1/gifs/search?q=" + something + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: URL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

    
    var results = response.data;
    var gifDiv = $("<div>");
    var gifImage = $("<img>")

    gifImage.attr("src", results[4].images.fixed_height.url);
    gifImage.attr("data-still", results[4].images.fixed_height_still.url)

    gifDiv.prepend(gifImage);
    $("#rockpaperscissorsGIF").prepend(gifDiv);

    
    $(gifImage).on("click", function pauseORstartGIF () {

        $(this).attr("src", $(this).attr("data-still"));

    })
    })
};

// Initializing firebase
var config = {
    apiKey: "AIzaSyD9xtpXJd-Wl2RPLd7yR9wdzd4tJyIyj5I",
    authDomain: "ugonnas-rock-paper-scissors.firebaseapp.com",
    databaseURL: "https://ugonnas-rock-paper-scissors.firebaseio.com",
    projectId: "ugonnas-rock-paper-scissors",
    storageBucket: "ugonnas-rock-paper-scissors.appspot.com",
    messagingSenderId: "429425082307"
  };


firebase.initializeApp(config);

// Creating a variable to reference the database.
var database = firebase.database();

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {

        // If they are connected...
        if (snap.val()) {

            // Add user to the connections list
            var con = connectionsRef.push(true);

            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });


var userPick

$("#userRock").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Rock! <b>");
    // $("#userResultsBox").append("<br> The Other Player picked ____");
    $("#otherplayerResultsBox").empty();

    userPick = "Rock";

    database.ref("/clicks").set({
        LatestFirstUserChoice: userPick
    });

});

$("#userPaper").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Paper! <b>");
    // $("#userResultsBox").append("<br> The Other Player picked ____");
    $("#otherplayerResultsBox").empty();

    userPick = "Paper";

    database.ref("/clicks").set({
        LatestFirstUserChoice: userPick
    });
});

$("#userScissors").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Scissors! <b>");
    // $("#userResultsBox").append("<br> The Other Player picked ____");
    $("#otherplayerResultsBox").empty();

    userPick = "Scissors";

    database.ref("/clicks").set({
        LatestFirstUserChoice: userPick
    });
});

// At the page load and subsequent value changes, get a snapshot of the local data.
// This callback allows the page to stay updated with the values in firebase node "clicks"
database.ref("/clicks").on("value", function(shot) {

    computerChoice = shot.val().LatestFirstUserChoice;
    //How do I clear the console each time?
    console.log(computerChoice);
    $("#otherplayerResultsBox").append("<br> The Other Player picked " + computerChoice);



});


$("#userInput").keypress(function(event) {

    var userComment = $("#userInput").val().trim();

    if(event.which == 13) {
        event.preventDefault();
        $("#exampleFormControlTextarea1").append("UserOne: " + userComment + "<br>")

    // Figure out why this is not working
    // $("#userInput").empty();

    // Changed chatroom updates to database.ref().push() instead of database.ref().set(), because .set() will overwrite the changes
    database.ref().push({
        // LatestFirstUserChoice: userPick,
        FirstUserComment: userComment
    });
    }
});

// Retrieve the data from the database initially and every time something changes in the chat room
// database.ref().on("value", function(snapshot) {

//     // console.log(snapshot.val());





// }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//       }
// );



