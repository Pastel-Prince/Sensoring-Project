$(document).ready(function(){
    $(".selectable").click(function(){
        $(".innerBox").css("background-color", "grey");
        if ( $(this).is("#B1") || $(this).is("#B2") || $(this).is("#B3") || $(this).is("#B4")) {
          $(this).css("background-color", "#BA68C8");
          $("#rightside").css("background-color", "#BA68C8");
        }
        if ( $(this).is("#L1") || $(this).is("#L3") || $(this).is("#L5")) {
          $(this).css("background-color", "#81D4FA");
          $("#rightside").css("background-color", "#81D4FA");
        }
        if ( $(this).is("#T1") || $(this).is("#T2") || $(this).is("#T3") || $(this).is("#T4")) {
          $(this).css("background-color", "#F06292");
          $("#rightside").css("background-color", "#F06292");
        }
        if ( $(this).is("#C")) {
          $(this).css("background-color", "#81C784");
          $("#rightside").css("background-color", "#81C784");
        }
    });

    $("#BC").click(function(){
      $("h2").toggle();
      $("h3").toggle();
    });
});
