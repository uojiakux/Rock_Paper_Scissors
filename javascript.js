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

    gifDiv.prepend(gifImage);
    $("#rockpaperscissorsGIF").prepend(gifDiv);

    
    $(gifImage).on("click", function pauseORstartGIF () {


    // Import code from finished homework here



    })
    })
};

displayGIF();