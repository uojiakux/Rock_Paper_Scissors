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

displayGIF();