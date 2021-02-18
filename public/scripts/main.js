$("button").on("click", function(){
  let type = $(this).attr("id");
  $.ajax({
    url: "/modifyCookie",
    type: "PUT",
    data: {type: type}
  }).done((res)=> {
    console.log(res);
  }).fail((err)=> {
    console.log(err);
  });
});
