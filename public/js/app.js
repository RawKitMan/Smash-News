$(function () {

    //Pull up any saved articles when the page

    $("#scrape").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        })
            .then(function (data) {
                if (data) {
                    console.log("Scrape Complete");
                }
                else {
                    console.log("No articles found");
                }
            });
    });

    $(document).on("click", "#remove-unsaved", function () {

        console.log($(this).attr("data-id"));
        $.ajax({
            method: "DELETE",
            url: "/articles/" + $(this).attr("data-id"),
        }).then(function () {
            console.log("Delete complete");
        })

    });

    //
    $(document).on("click", "#save-btn", function () {
        $.ajax({
            method: "PUT",
            url: "/articles/" + $(this).attr("data-id"),
            data: {
                saved: true
            }
        }).then(function () {
            console.log("Update Complete")
        })
    });

    $(document).on("click", "#unsave-btn", function () {
        $.ajax({
            method: "PUT",
            url: "/articles/" + $(this).attr("data-id"),
            data: {
                saved: false
            }
        }).then(function () {
            console.log("Update Complete")
        });
    });

    //When the button is clicked on a article to Add a Note, an area will appear where a note can be applied to the specific article
    $(document).on("click", "#note-btn", function () {

        let thisId = $(this).attr("data-id");
        $("#notes").empty();
        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId,
            success: function (data) {
                console.log(data);
                $("#notes").append("<h2>" + data.title + "</h2>");
                // An input to enter a new title
                $("#notes").append("<input id='title' name='title' >");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='body' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it

                // If there's a note in the article
                if (data.note) {
                    //If a note exists already, we want to update, not post a new note
                    $("#notes").append("<button data-id='" + data.note._id + "' id='update-note'>Update</button>");
                    // Place the title of the note in the title input
                    $("#title").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#body").val(data.note.body);
                }
                else {
                    $("#notes").append("<button data-id='" + data._id + "' id='enter-note'>Submit Note</button>");
                }
            }
        });
    });

    $(document).on("click", "#enter-note", function () {

        $.ajax({
            method: "POST",
            url: "/articles/" + $(this).attr("data-id"),
            data: {
                title: $("#title").val().trim(),
                body: $("#body").val().trim()
            }
        })
            .then(function (data) {
                console.log(data);
                $("#notes").empty();
            })

        $("#title").val("");
        $("#body").val("");
    });

    //Updating the note that's already stored
    $(document).on("click", "#update-note", function () {

        $.ajax({
            method: "PUT",
            url: "/note/" + $(this).attr("data-id"),
            data: {
                title: $("#title").val().trim(),
                body: $("#body").val().trim()
            }
        })
            .then(function (data) {
                console.log(data);
                $("#notes").empty();
            })

        $("#title").val("");
        $("#body").val("");
    });

});