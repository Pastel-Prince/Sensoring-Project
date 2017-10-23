var last = '#212121'

$('.material-icons').click(function(){
  $('.material-icons').addClass('md-inactive')
  $(this).removeClass('md-inactive')
  $('h1').text($(this).attr('id'))
})

$('.room').click(function(){
  $(last).css('background-color', '#212121')
  $(last).css('color', 'white')

  $(this).css('color', 'black')
  $(this).css('background-color', '#F8F8F8')
  last = $(this)
})
