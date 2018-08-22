// Figure out why this is not working. Clear Divs before game starts. 
    // $("#otherplayerResultsBox").empty();

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

var connectionsRef = database.ref("/connections");

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
    $("#otherplayerResultsBox").empty();

    userPick = "Rock";

    database.ref("/clicks").push({
        LatestFirstUserChoice: userPick,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

$("#userPaper").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Paper! <b>");
    $("#otherplayerResultsBox").empty();

    userPick = "Paper";

    database.ref("/clicks").push({
        LatestFirstUserChoice: userPick,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

$("#userScissors").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Scissors! <b>");
    $("#otherplayerResultsBox").empty();

    userPick = "Scissors";

    database.ref("/clicks").push({
        LatestFirstUserChoice: userPick,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


database.ref("/clicks").on("child_added", function(shot) {

    computerChoice = shot.val().LatestFirstUserChoice;
    
    $("#otherplayerResultsBox").html("<br> The Other Player picked " + computerChoice);

});


$("#userInput").keypress(function(event) {
    
    var userComment = $("#userInput").val().trim();

    if(event.which == 13) {
        event.preventDefault();
        $("#exampleFormControlTextarea1").append("UserOne: " + userComment + "<br>")

    // Figure out why this is not working
    // $("#userInput").empty();

        database.ref("/chatcomments").push({
            UserComment: userComment
    });
    }
});

// Didn't figure out how to work this
// database.ref("/chatcomments").on("child_added", function(snapped) {

//     showComment = snapped.val().UserComment;

//     $("#exampleFormControlTextarea1").append("UserOne: " + UserComment + "<br>");

// })



// Was not able to finish but this is what the rest of the game would need...
// 1. A way to compare the first user and second user's selection and determine who won the round
// 2. A way to hide the selection of each user's pick until the winner is announced
// 3. A way to get the chatroom to update in real time with the comments the users write in it

