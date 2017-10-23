var last

$('.material-icons').click(function(){
  $('.material-icons').addClass('md-inactive')
  $(this).removeClass('md-inactive')
  $('h1').text($(this).attr('id'))
})

$('.room').click(function(){
  $(last).removeClass('selected');
  $(this).addClass('selected');
  last = $(this);
});

// Set room IDs to the room names specified in the HTML
$('.room').attr('id', function() {
    return ($(this).text()).replace(/\s/g, '');
});
