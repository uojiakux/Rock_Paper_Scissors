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

var userPick

$("#userRock").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Rock! <b>");
    $("#userResultsBox").append("<br> The Other Player picked ____");

    userPick = "Rock";

    database.ref().set({
        LatestFirstUserChoice: userPick
    });

});

$("#userPaper").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Paper! <b>");
    $("#userResultsBox").append("<br> The Other Player picked ____");

    userPick = "Paper";

    database.ref().set({
        LatestFirstUserChoice: userPick
    });
});

$("#userScissors").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Scissors! <b>");
    $("#userResultsBox").append("<br> The Other Player picked ____");

    userPick = "Scissors";

    database.ref().set({
        LatestFirstUserChoice: userPick
    });
});




