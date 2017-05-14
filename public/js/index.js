
/* Hey! We have Javascript installed! 
Let's us it! */
$('.drawer').hide();
$('.more').show();

/* Open and Close the drawer */
$('.drawer').prev('tr').on('click', function(){
  var tr = $(this);
  tr.toggleClass('shadow');
  tr.next('.drawer').toggle();
});