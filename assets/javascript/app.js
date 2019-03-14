$(document).ready(function () {

    $(".card").hide();

    var elements = ["potassium", "neon", "gold", "silver", "copper", "uranium", "krypton", "nitrogen", "carbon"];



    function searchForElementGifs(element) {
        $("#pictures").empty();
        var element = $(this).attr("data-name");

        console.log(`You picked the element ${element}.`);
        
        var url;
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=XJPHCKsGgocOUIzcJHm4p5ImTpelqCgY&q=" + element + "&limit=10&offset=0&rating=PG&lang=en";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < 10; i++) {

                
                
                var newCard = $("<div>");
                newCard.addClass("card");
                var img = $("<img>");

                var stillSrc = response.data[i].images.fixed_height_still.url;
                var animateSrc = response.data[i].images.fixed_height.url;
                console.log(animateSrc);
                
                //Give the desired attributes to each image
                img.attr("src", stillSrc).addClass("card-img-top gif");
                img.attr("data-state", "still");
                img.attr("data-animate", animateSrc);
                img.attr("data-still", stillSrc);

                newCard.append(img);
                var newCardBody = $("<div>");
                newCardBody.addClass("card-body");
                var newH5 = $("<h5>");
                newH5.addClass("card-title").text("Rating:");
                var newP = $("<p>");
                newP.addClass("card-text").text(response.data[i].rating);
                var newA = $("<a>");
                newA.attr("href", "http://www.periodictable.com").text(`Learn more about ${element}`);
                newCardBody.append(newH5, newP, newA);
                newCard.append(newCardBody);
                $("#pictures").append(newCard);
                $(".card").show();

            }
        });

    }

    $(document).on("click", ".gif", function() {

        var state = $(this).attr("data-state");
        var animateSrc = $(this).attr("data-animate");
        var stillSrc = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", animateSrc);
            $(this).attr("data-state", "animate");
          } else if (state === "animate") {
            $(this).attr("src", stillSrc);
            $(this).attr("data-state", "still");
    
          }

    });


    // Function for displaying initial Element buttons
    function renderButtons() {
        // Deletes the movies prior to adding new movies (to avoid repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < elements.length; i++) {
            // Then dynamicaly generates buttons for each movie in the array
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("element");
            // Added a data-attribute
            a.attr("data-name", elements[i]);
            // Provided the initial button text
            a.text(elements[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    renderButtons();


    // Event handler for user clicking the GO button
    $("#select-element").on("click", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        //Empty the current Gifs displayed
        $("#pictures").empty();
        // Storing the artist name
        element = $("#element-input").val().trim();
        //Add the new element to the Elements array
        elements.push(element);
        //Show the buttons for the new element
        renderButtons();
        //Empty the input box;
        $("#element-input").val("");
    });

    // Adding click event listeners to all elements with a class of "movie" (THE BUTTONS)
    $(document).on("click", ".element", searchForElementGifs);
});