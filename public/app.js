// When someone clicks on article

$(document).on("click", "li", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data)
    $("#notes").append("<div class='row'>")
    $("#notes").append("<h2 class='col-md-12'>" + data.title + "</h2>");
    $("#notes").append("<input class='col-md-12' id='titleinput' name='title' >");
    $("#notes").append("<textarea class='col-md-12' id='bodyinput' name='body'></textarea>");
    $("#notes").append("<button class='button col-md-12' data-id='" + data._id + "' id='savenote'>Save Note</button>");
    $("#notes").append("</div>")

    // if theres a note
    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  })
})

// When you save the note

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  // run a post to change the note

  $.ajax({
    method: "POST",
    url: "/articles/" +thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
    $("#notes").empty();
  })

  $("#titleinput").val("");
  $("#bodyinput").val("");
})