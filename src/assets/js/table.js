$(function(){
  $(".fold-table tr.view").on("click", function(){
    $(this).toggleClass("open").next(".fold").toggleClass("open");
  });

  $("#pessoa").on("click", function(){
    $(".pessoa").show();
    $(".contatos").hide();
    $(".teste").hide();
  });

  $("#contatos").on("click", function(){
    $(".pessoa").hide();
    $(".contatos").show();
    $(".teste").hide();
  });

  $("#teste").on("click", function(){
    $(".pessoa").hide();
    $(".contatos").hide();
    $(".teste").show();
  });
});
