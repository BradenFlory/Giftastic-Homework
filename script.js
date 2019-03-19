$(document).ready(function () {
    var topics = [];

    function displayGifs() {

        var LOTR = $(this).data("search");
        console.log(LOTR);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + LOTR + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var gifImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                gifImage.attr("src", staticSrc);
                gifImage.addClass("gifGiphy");
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", staticSrc);
                gifImage.attr("data-animate", defaultAnimatedSrc);
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#gifArea").prepend(gifDiv);

            }
        });
    }

    $("#addGif").on("click", function (event) {
        event.preventDefault();
        var newGif = $("#gifInput").val().trim();
        topics.push(newGif);
        console.log(topics);
        $("#gifInput").val('');
        displayButtons();
    });

    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var displayedButtons = $('<button class="btn btn-primary">');
            displayedButtons.attr("id", "gif");
            displayedButtons.attr("data-search", topics[i]);
            displayedButtons.text(topics[i]);
            $("#myButtons").append(displayedButtons);
        }
    }


    displayButtons();

    $(document).on("click", "#gif", displayGifs);

    $(document).on("click", ".gifGiphy", pausePlayGifs);

    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});