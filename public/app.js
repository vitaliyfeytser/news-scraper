// Let's make sure everything is ready!
$(document).ready(() => {
  $(".headline").on("click", function() {
    $(".extended").hide("fast");
    $(this).nextUntil(".headline").show("slow");

    // $(".article").children().css("display", "none") ? $(this).nextUntil(".headline").show("slow") :  $(this).nextUntil(".headline").hide("fast")

    // $(".extended").css({display: "table-row"}) ? $(this).nextUntil(".headline").hide("fast") : $(this).nextUntil(".headline").show("slow")

    // $(this).nextUntil(".headline").show("slow") ? $(this).nextUntil(".headline").hide("fast") : $(this).nextUntil(".headline").show("slow") 

  });

  //scrape the site
  $("#scrape").on("click", function(event) {
    event.preventDefault();
    // change button text while scraping
    $("#scrape").text("Scraping... Please be patient.")
    console.log("Scraping... Please be patient.");
    $.ajax({
      method: "GET",
      url: "/scrape",
    }).then(() => location.reload(true));

  })

  // add a note
  $(".add-note").on("click", function() {
    let id = $(this).attr("class").split(" ")[1];
    let note = {
      body: $(`.body.${id}`).val(),
      author: $(`.userName.${id}`).val()
    };
    // make sure the user has typed a note
    if (!note.body) {
      $(`.body.${id}`).attr("placeholder", "You have to tell us what you think to submit!");
    }
    else {
      $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: note
      }).then(() => location.reload(true));
    };
  });

  // delete a note
  $(".delete-note").on("click", function(event) {
    event.preventDefault();

    let id = $(this).attr("id");
    $.ajax({
      method: "DELETE",
      url: "/notes/" + id,
    }).then(() => location.reload(true));
  });

  // delete all
  $("#empty-db").on("click", function(event) {
    event.preventDefault();

    $.ajax({
      method: "DELETE",
      url: "/emptydb",
    }).then(() => location.reload(true));
  });

});
