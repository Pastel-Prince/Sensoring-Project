var last
$('#rightside2').hide()

$('.material-icons').click(function(){
  $('.material-icons').addClass('md-inactive')
  $(this).removeClass('md-inactive')
  $('h1').text($(this).attr('id'))
})

$('.room').click(function(){
    thisId = '#' + ($(this).text()).replace(/[\s&]/g, '')
    if($(thisId).hasClass("active")){
        $(last).removeClass('selected');
        $(this).addClass('selected');
        last = $(this);
    }
});

// Set room IDs to the room names specified in the HTML
$('.room').attr('id', function() {
    return ($(this).text()).replace(/[\s&]/g, '');
});

var upDown = true
$('#downArrow').on("click", function(){
    if (upDown) {
        $("#downArrow").animate({bottom: "2vh", "z-index": "90"})
        upDown = false
    } else {
        $("downArrow").animate({top: "2vh", "z-index": "90"})
        updown = true
    }
})
