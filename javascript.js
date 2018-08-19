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


$("#userRock").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Rock! <b>");
    $("#userResultsBox").append("<br> The Other Player picked ____");

});

$("#userPaper").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Paper! <b>");
    $("#userResultsBox").append("<br> The Other Player picked ____");
});

$("#userScissors").on("click", function() {

    $("#userResultsBox").empty();
    $("#userResultsBox").append("You chose <b> Scissors! <b>");
    $("#userResultsBox").append("<br> The Other Player picked ____");
});



