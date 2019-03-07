$(function () {

    $("#scrape").on("click", function(){
        $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .then(function(data){
            console.log("Scrape Complete");
            window.location = "/";
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
                $("#notes").append("<button data-id='" + data._id + "' id='enter-note'>Submit Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#title").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#body").val(data.note.body);
                }
            }
        });
    });

    $(document).on("click", "#enter-note", function(){
        
        $.ajax({
            method: "POST",
            url: "/articles/" + $(this).attr("data-id"),
            data: {
                title: $("#title").val().trim(),
                body: $("#body").val().trim()
            }
        })
        .then(function(data){
            console.log(data);
            $("#notes").empty();
        })

        $("#title").val("");
        $("#body").val();
    });
});