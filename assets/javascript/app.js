$(document).ready(function () {

    var elements = ["potassium", "neon"];



    function searchForElementGifs(element) {
        $("#pictures").empty();
        var element = $(this).attr("data-name");

        console.log(`You picked the element ${element}.`);
        // Add code to query the bands in town api searching for the artist received as an argument to this function
        var url;
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=XJPHCKsGgocOUIzcJHm4p5ImTpelqCgY&q=" + element + "&limit=10&offset=0&rating=PG&lang=en";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < 10; i++) {
                var img = $("<img>");
                url = response.data[i].images.fixed_height.url;
                console.log(url);
                img.attr("src", url);
                $("#pictures").append(img);
            }
        });

    }


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