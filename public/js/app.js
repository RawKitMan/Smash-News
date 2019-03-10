$(function () {
    //Scrape for news articles
    $("#scrape").on("click", function (e) {
        e.preventDefault()
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

                location.reload();
            });
    });

    $(document).on("click", "#remove-unsaved", function () {

        $.ajax({
            method: "DELETE",
            url: "/articles/" + $(this).attr("data-id"),
        }).then(function () {
            // console.log("Delete complete");
            location.reload();
        });

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
            location.reload();
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
            location.reload();
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
                $("#notes").addClass("shadow mt-5 mb-5 bg-white rounded h-50 form-group")
                $("#notes").append("<h2>" + data.title + "</h2>");
                // An input to enter a new title
                $("#notes").append("<input id='title' class = 'form-control' name='title' placeholder='Enter Note Title>");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='body' class = 'form-control mt-3' name='body' rows = '7' placeholder = 'Enter Note'></textarea>");
                // A button to submit a new note, with the id of the article saved to it

                // If there's a note in the article
                if (data.note) {
                    //If a note exists already, we want to update, not post a new note
                    $("#notes").append("<button data-id='" + data.note._id + "' id='update-note' class='mt-2 btn btn-success mb-2'>Update</button>");
                    // Place the title of the note in the title input
                    $("#title").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#body").val(data.note.body);
                }
                else {
                    $("#notes").append("<button data-id='" + data._id + "' id='enter-note' class='mt-2 btn btn-success mb-2'>Submit Note</button>");
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
                $("#notes").empty();
                location.reload();
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