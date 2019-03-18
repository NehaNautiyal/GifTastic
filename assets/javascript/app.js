$(document).ready(function () {

    $(".card").hide();
    $("#favorite-box").hide();

    var elements = ["potassium", "neon", "gold", "silver", "copper", "uranium", "krypton", "nitrogen", "carbon"];
    var imageNumber;
    var faveCard;
    var favorites = [];
    var imageStill;
    var numFavorites = 0;
    var favoritesExist = false;
    var element;


    function searchForElementGifs(element) {
        $("#pictures").empty();
        element = $(this).attr("data-name");

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

                //Give the desired attributes to each image
                img.attr("src", stillSrc).addClass("card-img-top gif");
                img.attr("data-state", "still");
                img.attr("data-animate", animateSrc);
                img.attr("data-still", stillSrc);

                newCard.append(img);
                var newCardBody = $("<div>");
                newCardBody.addClass("card-body");
                var newH5 = $("<h5>");
                newH5.addClass("card-title").text(`Rating: ${response.data[i].rating}`);
                var newA = $("<a>");
                newA.attr("href", "http://www.periodictable.com").html(`Learn more about ${element} `);
                var newDiv = $("<p>");

                var newA2 = $("<a>");

                newA2.attr("href", response.data[i].images.fixed_height.url);
                newA2.html('<br>');
                newA2.addClass("download").append("Click to Download");

                var newI = $("<i>");
                newI.addClass("fa fa-star");

                newI.attr("data-number", i);
                newI.attr("data-name", element);
                // newI.attr("id", "card-" +element +"-"+ i);

                newDiv.addClass("notFavorite").text(" Favorite").prepend(newI);
                newCardBody.append(newH5, newA, newA2);
                newCardBody.append(newDiv);
                newCard.append(newCardBody).attr({id: "card-" + element + "-" + i, "data-name": element});
                $("#pictures").append(newCard);
                $(".card").show();

            }
        });
    }



    //To download the image
    $('.download').click(function (e) {
        e.preventDefault();  //stop the browser from following

        window.location.href = $(".download").attr("href");
    });

    //To add to favorites
    $(document).on("click", ".fa-star", function () {
        $("#favorite-box").show();
        imageNumber = $(this).attr("data-number");
        imageStillUrl = $(this).parent().parent().siblings("img").attr("data-still");
        imageAnimateUrl = $(this).parent().parent().siblings("img").attr("data-animate");
        element = $(this).attr("data-name");
        console.log(element);
        console.log(`Number: ${imageNumber} and Url: ${imageStillUrl}`);
        if (!$(this).hasClass("favorite")) {
            $(this).addClass("favorite");
            $(".card-" + imageNumber).attr("id", "favorite-box");
            $("#card-" + element + "-" + imageNumber).find("img").attr("data-still", imageStillUrl);
            var whatIsTheSrc = $("#card-" + element + "-" + imageNumber).find("img").attr("data-still");
            console.log(whatIsTheSrc);
            $("#card-" + element + "-" + imageNumber).find("img").attr("data-animate", imageAnimateUrl);
            faveCard = $("#card-" + element + "-" + imageNumber).clone(true).off();
            var stillImgForClone = faveCard.find("img").attr("data-still");
            $("#card-" + element + "-" + imageNumber).find("img").attr("data-still", imageStillUrl);
            console.log(stillImgForClone);
            console.log(faveCard);
            // favorites.push(faveCard);
            console.log(favorites);
            numFavorites++;
            $("#favorite-box").append(faveCard);
        } else if ($(this).hasClass("favorite")) {
            $(this).removeClass("favorite");
            $(".card-" + imageNumber).removeAttr("id", "favorite-box");
            $("#card-" + imageNumber).remove();
            numFavorites--;
        }
        if (numFavorites === 0) {
                $("#favorite-box").hide();
        }
    });


    $(document).on("click", ".gif", function () {

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
        if (!$(".card").hasClass("favorite")) {

            //Empty the current Gifs displayed
            $("#pictures").empty();
        } else {
            //remove all cards without the favorite class
        }
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